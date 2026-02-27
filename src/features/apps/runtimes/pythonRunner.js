const PYODIDE_SCRIPT_ID = "pyodide-runtime-loader";
const PYODIDE_SCRIPT_URL = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";

const loadPyodideScript = () =>
  new Promise((resolve, reject) => {
    const existing = document.getElementById(PYODIDE_SCRIPT_ID);
    if (existing) {
      if (window.loadPyodide) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Pyodide script.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = PYODIDE_SCRIPT_ID;
    script.src = PYODIDE_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Pyodide script."));
    document.body.appendChild(script);
  });

export const initializePythonRuntime = async () => {
  if (window.pyodide) return { success: true, runtime: window.pyodide, error: null };

  if (!window.__pyodideLoaderPromise) {
    window.__pyodideLoaderPromise = (async () => {
      await loadPyodideScript();
      window.pyodide = await window.loadPyodide();
      return window.pyodide;
    })();
  }

  try {
    const runtime = await window.__pyodideLoaderPromise;
    return { success: true, runtime, error: null };
  } catch (error) {
    return { success: false, runtime: null, error: error?.message || String(error) };
  }
};

export const runPython = async ({ code, appendOutput }) => {
  const runtimeResult = await initializePythonRuntime();
  if (!runtimeResult.success) {
    return { success: false, output: "", error: runtimeResult.error };
  }

  const pyodide = runtimeResult.runtime;
  const buffer = [];

  try {
    pyodide.setStdout({
      batched: (message) => {
        buffer.push(message);
        appendOutput(message, "stdout");
      },
    });

    pyodide.setStderr({
      batched: (message) => {
        appendOutput(message, "stderr");
      },
    });

    const result = await pyodide.runPythonAsync(code);
    if (typeof result !== "undefined" && result !== null && String(result).trim()) {
      const asString = String(result);
      buffer.push(asString);
      appendOutput(asString, "stdout");
    }

    return { success: true, output: buffer.join("\n"), error: null };
  } catch (error) {
    return { success: false, output: buffer.join("\n"), error: error?.message || String(error) };
  }
};
