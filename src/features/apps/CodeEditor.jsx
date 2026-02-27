import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eraser, LoaderCircle, Play } from "lucide-react";
import { toast } from "@/hooks/useToastStore";
import { EditorPane } from "@/features/code-editor/EditorPane";
import { initializeJavaScriptRuntime, runJavaScript } from "@/features/apps/runtimes/javascriptRunner";
import { initializePythonRuntime, runPython } from "@/features/apps/runtimes/pythonRunner";
import { initializeCppRuntime, runCpp } from "@/features/apps/runtimes/cppRunner";
import { initializeRustRuntime, runRust } from "@/features/apps/runtimes/rustRunner";
import { initializeGoRuntime, runGo } from "@/features/apps/runtimes/goRunner";

const snippets = {
  javascript: "console.log('Hello from JavaScript');\nreturn 2 + 2;",
  python: "print('Hello from Python')\n2 + 2",
  cpp: "#include <iostream>\nint main(){\n  std::cout << \"Hello from C++\" << std::endl;\n  return 0;\n}",
  rust: "fn main() {\n  println!(\"Hello from Rust\");\n}",
  go: "package main\nimport \"fmt\"\nfunc main(){\n  fmt.Println(\"Hello from Go\")\n}",
};

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python (Pyodide)" },
  { value: "cpp", label: "C++ (Emscripten WASM)" },
  { value: "rust", label: "Rust (WASM)" },
  { value: "go", label: "Go (WASM + WASI)" },
];

const defaultRuntimeReady = {
  javascript: false,
  python: false,
  cpp: false,
  rust: false,
  go: false,
};

export const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(snippets.javascript);
  const [outputLogs, setOutputLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [runtimeReady, setRuntimeReady] = useState(defaultRuntimeReady);

  const terminalRef = useRef(null);
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
    setOutputLogs((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, message: String(message), type }]);
  }, []);

  const clearConsole = useCallback(() => {
    setOutputLogs([]);
  }, []);

  const initializeRuntimes = useCallback(
    async (targetLanguage) => {
      const initMap = {
        javascript: initializeJavaScriptRuntime,
        python: initializePythonRuntime,
        cpp: initializeCppRuntime,
        rust: initializeRustRuntime,
        go: initializeGoRuntime,
      };

      const initializer = initMap[targetLanguage];
      if (!initializer) return false;
      if (runtimeReady[targetLanguage]) return true;

      appendOutput(`Loading ${targetLanguage} runtime...`, "status");

      const runtimeResult = await initializer();
      if (!runtimeResult.success) {
        appendOutput(runtimeResult.error || "Runtime failed to initialize.", "stderr");
        return false;
      }

      setRuntimeReady((prev) => ({ ...prev, [targetLanguage]: true }));
      appendOutput(`${targetLanguage} runtime ready.`, "status");
      return true;
    },
    [appendOutput, runtimeReady],
  );

  useEffect(() => {
    initializeRuntimes(language);
  }, [initializeRuntimes, language]);

  useEffect(() => {
    if (!terminalRef.current) return;
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [outputLogs]);

  const runCode = useCallback(async () => {
    if (!code.trim()) {
      toast({ title: "Code is empty", description: "Please enter some code first.", variant: "destructive" });
      return;
    }

    if (isRunning) return;

    const isReady = await initializeRuntimes(language);
    if (!isReady) {
      appendOutput(`Runtime for ${language} is not ready.`, "stderr");
      return;
    }

    setIsRunning(true);
    runIdRef.current += 1;

    const startedAt = performance.now();
    appendOutput(`Running ${language}...`, "status");

    try {
      const runners = {
        javascript: () => runJavaScript({ code, runId: runIdRef.current }),
        python: () => runPython({ code, appendOutput }),
        cpp: () => runCpp({ code, appendOutput }),
        rust: () => runRust({ code, appendOutput }),
        go: () => runGo({ code, appendOutput }),
      };

      const runner = runners[language];
      if (!runner) {
        appendOutput(`Unsupported language: ${language}`, "stderr");
        return;
      }

      const result = await runner();
      if (result.output) appendOutput(result.output, "stdout");
      if (result.error) appendOutput(result.error, "stderr");
      if (result.success) appendOutput("Execution finished.", "status");
    } catch (error) {
      appendOutput(error?.message || String(error), "stderr");
    } finally {
      appendOutput(`Execution time: ${Math.round(performance.now() - startedAt)}ms`, "status");
      setIsRunning(false);
    }
  }, [appendOutput, code, initializeRuntimes, isRunning, language, runtimeReady]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        runCode();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
        event.preventDefault();
        clearConsole();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [clearConsole, runCode]);

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
          disabled={isRunning || !runtimeReady[language]}
          onClick={runCode}
          aria-label="Run code"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#ff5248] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isRunning ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} {isRunning ? "Running…" : "Run"}
        </motion.button>
        <button
          type="button"
          onClick={clearConsole}
          aria-label="Clear terminal output"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground/85 transition-all hover:border-[#FF3B30]/70 hover:text-foreground"
        >
          <Eraser className="h-4 w-4" /> Clear
        </button>
        <span className="text-xs text-foreground/70" role="status" aria-live="polite">
          Runtime: {runtimeReady[language] ? "Ready" : "Loading..."} · Status: {isRunning ? "Running…" : "Idle"}
        </span>
      </div>

      <section className="mt-4 rounded-xl border border-border/70 bg-black/60" aria-label="Terminal output">
        <header className="border-b border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-foreground/70">Terminal Output</header>
        <div ref={terminalRef} className="max-h-56 overflow-y-auto px-3 py-2 font-mono text-xs leading-5">
          {outputLogs.length === 0 ? <p className="text-foreground/40">No output yet. Use Ctrl+Enter to run.</p> : null}
          {outputLogs.map((line) => (
            <p key={line.id} className={line.type === "stderr" ? "text-red-400" : line.type === "status" ? "text-cyan-300" : "text-emerald-300"}>
              {line.message}
            </p>
          ))}
        </div>
      </section>
    </article>
  );
};
