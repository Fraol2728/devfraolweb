const SANDBOX_ID = "code-editor-js-runtime";

const ensureSandbox = () => {
  let iframe = document.getElementById(SANDBOX_ID);
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = SANDBOX_ID;
    iframe.title = "javascript-runtime-sandbox";
    iframe.sandbox = "allow-scripts";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }
  return iframe;
};

export const initializeJavaScriptRuntime = async () => ({ success: true, runtime: ensureSandbox(), error: null });

export const runJavaScript = async ({ code, runId, timeoutMs = 5000 }) => {
  const iframe = ensureSandbox();

  return new Promise((resolve) => {
    const start = performance.now();

    const cleanup = () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
    };

    const onMessage = (event) => {
      const data = event.data;
      if (data?.source !== "code-editor-js-sandbox" || data?.runId !== runId) return;
      if (data?.type !== "result") return;

      cleanup();
      resolve({
        success: data.success,
        output: Array.isArray(data.logs) ? data.logs.join("\n") : "",
        error: data.error || null,
        durationMs: Math.round(performance.now() - start),
      });
    };

    const timer = window.setTimeout(() => {
      cleanup();
      resolve({
        success: false,
        output: "",
        error: "JavaScript execution timed out.",
        durationMs: Math.round(performance.now() - start),
      });
    }, timeoutMs);

    window.addEventListener("message", onMessage);

    const scriptCode = `
      (async () => {
        const runId = ${JSON.stringify(runId)};
        const logs = [];
        const userCode = ${JSON.stringify(code)};
        const send = (payload) => parent.postMessage({ source: 'code-editor-js-sandbox', runId, ...payload }, '*');

        const stringify = (value) => {
          if (typeof value === 'string') return value;
          try { return JSON.stringify(value); } catch (_) { return String(value); }
        };

        const safeConsole = {
          log: (...args) => logs.push(args.map(stringify).join(' ')),
          error: (...args) => logs.push(args.map(stringify).join(' ')),
          warn: (...args) => logs.push(args.map(stringify).join(' ')),
        };

        try {
          const fn = new Function('console', "'use strict';\\n" + userCode);
          const value = await fn(safeConsole);
          if (typeof value !== 'undefined') logs.push(stringify(value));
          send({ type: 'result', success: true, logs, error: null });
        } catch (error) {
          send({ type: 'result', success: false, logs, error: error?.stack || error?.message || String(error) });
        }
      })();
    `;

    const doc = iframe.contentDocument;
    doc.open();
    doc.write(`<!doctype html><html><body><script>${scriptCode}</script></body></html>`);
    doc.close();
  });
};
