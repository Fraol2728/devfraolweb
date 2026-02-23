import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eraser, LoaderCircle, Play } from "lucide-react";
import { toast } from "@/hooks/useToastStore";
import { EditorPane } from "@/features/code-editor/EditorPane";

const snippets = {
  javascript: "console.log('Hello from JavaScript');\n2 + 2;",
  python: "print('Hello from Python')\n2 + 2",
};

const PYODIDE_SCRIPT_ID = "pyodide-runtime-loader";

const loadPyodideRuntime = async () => {
  if (window.pyodide) return window.pyodide;

  if (!window.__pyodideLoaderPromise) {
    window.__pyodideLoaderPromise = new Promise((resolve, reject) => {
      const existingScript = document.getElementById(PYODIDE_SCRIPT_ID);

      const handleLoad = async () => {
        try {
          const pyodideInstance = await window.loadPyodide();
          window.pyodide = pyodideInstance;
          resolve(pyodideInstance);
        } catch (error) {
          reject(error);
        }
      };

      if (existingScript) {
        if (window.loadPyodide) {
          handleLoad();
          return;
        }
        existingScript.addEventListener("load", handleLoad, { once: true });
        existingScript.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.id = PYODIDE_SCRIPT_ID;
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
      script.async = true;
      script.onload = handleLoad;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  return window.__pyodideLoaderPromise;
};

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
];

export const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(snippets.javascript);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef(null);
  const iframeRef = useRef(null);
  const runIdRef = useRef(0);

  const activeFile = useMemo(
    () => ({
      id: language,
      language,
      content: code,
    }),
    [code, language],
  );

  const appendOutput = useCallback((message, type = "stdout") => {
    setOutput((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, message, type }]);
  }, []);

  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  useEffect(() => {
    if (language !== "python") return;

    loadPyodideRuntime().catch(() => {
      toast({
        title: "Pyodide failed to load",
        description: "Python runtime could not be initialized. Please try again.",
        variant: "destructive",
      });
    });
  }, [language]);

  useEffect(() => {
    if (!terminalRef.current) return;
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        document.getElementById("run-code-btn")?.click();
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
        event.preventDefault();
        clearOutput();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [clearOutput]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.source !== "code-editor-sandbox" || event.data?.runId !== runIdRef.current) return;

      if (event.data.type === "log") appendOutput(event.data.payload, "stdout");
      if (event.data.type === "error") appendOutput(event.data.payload, "stderr");
      if (event.data.type === "done") {
        appendOutput("Execution finished.", "status");
        setIsRunning(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [appendOutput]);

  const runJavaScript = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    runIdRef.current += 1;
    const runId = runIdRef.current;

    const escapedCode = JSON.stringify(code);

    const doc = iframe.contentDocument;
    doc.open();
    doc.write(`
      <!doctype html>
      <html>
        <body>
          <script>
            const runId = ${runId};
            const send = (type, payload) => parent.postMessage({ source: 'code-editor-sandbox', runId, type, payload }, '*');
            const originalLog = console.log;
            console.log = (...args) => {
              send('log', args.map((arg) => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
              originalLog(...args);
            };
            (async () => {
              try {
                const result = eval(${escapedCode});
                const awaited = result instanceof Promise ? await result : result;
                if (awaited !== undefined) send('log', String(awaited));
              } catch (error) {
                send('error', error?.stack || error?.message || String(error));
              } finally {
                send('done', 'done');
              }
            })();
          </script>
        </body>
      </html>
    `);
    doc.close();
  }, [code]);

  const runPython = useCallback(async () => {
    const pyodide = await loadPyodideRuntime();

    try {
      pyodide.setStdout({
        batched: (message) => appendOutput(message, "stdout"),
      });

      pyodide.setStderr({
        batched: (message) => appendOutput(message, "stderr"),
      });

      const result = await pyodide.runPythonAsync(code);
      if (result !== undefined && result !== null && String(result).trim()) {
        appendOutput(String(result), "stdout");
      }
      appendOutput("Execution finished.", "status");
    } catch (error) {
      appendOutput(error?.message || String(error), "stderr");
    } finally {
      setIsRunning(false);
    }
  }, [appendOutput, code]);

  const handleRun = async () => {
    if (!code.trim()) {
      toast({ title: "Code is empty", description: "Please enter some code first.", variant: "destructive" });
      return;
    }

    appendOutput(`Running ${language === "python" ? "Python" : "JavaScript"}...`, "status");
    setIsRunning(true);

    if (language === "python") {
      await runPython();
      return;
    }

    runJavaScript();
  };

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    setCode(snippets[nextLanguage]);
  };

  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-foreground">Online Code Editor</h3>
        <div className="flex items-center gap-2">
          <label htmlFor="language-picker" className="text-sm font-medium text-foreground/80">
            Language
          </label>
          <select
            id="language-picker"
            aria-label="Language selector"
            value={language}
            onChange={(event) => handleLanguageChange(event.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none transition hover:border-[#FF3B30]/80 focus:border-[#FF3B30]"
          >
            {languageOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 h-72 overflow-hidden rounded-xl border border-border/70 bg-[#0F1117]">
        <EditorPane activeFile={activeFile} onChange={setCode} theme="dark" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <motion.button
          id="run-code-btn"
          whileHover={{ y: -1 }}
          type="button"
          disabled={isRunning}
          onClick={handleRun}
          aria-label="Run code"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#ff5248] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isRunning ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} {isRunning ? "Running…" : "Run"}
        </motion.button>
        <button
          type="button"
          onClick={clearOutput}
          aria-label="Clear terminal output"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground/85 transition-all hover:border-[#FF3B30]/70 hover:text-foreground"
        >
          <Eraser className="h-4 w-4" /> Clear
        </button>
        <span className="text-xs text-foreground/70" role="status" aria-live="polite">
          Status: {isRunning ? "Running…" : "Done"}
        </span>
      </div>

      <section className="mt-4 rounded-xl border border-border/70 bg-black/60" aria-label="Terminal output">
        <header className="border-b border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-foreground/70">Terminal Output</header>
        <div ref={terminalRef} className="max-h-56 overflow-y-auto px-3 py-2 font-mono text-xs leading-5">
          {output.length === 0 ? <p className="text-foreground/40">No output yet. Use Ctrl+Enter to run.</p> : null}
          {output.map((line) => (
            <p key={line.id} className={line.type === "stderr" ? "text-red-400" : line.type === "status" ? "text-cyan-300" : "text-emerald-300"}>
              {line.message}
            </p>
          ))}
        </div>
      </section>

      <iframe ref={iframeRef} title="javascript-sandbox" sandbox="allow-scripts" className="hidden" />
    </article>
  );
};
