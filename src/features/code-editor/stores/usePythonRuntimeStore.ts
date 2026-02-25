import { create } from "zustand";
import { useTerminalStore } from "@/features/code-editor/stores/useTerminalStore";

type PyodideApi = {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
};

type LoadPyodide = () => Promise<PyodideApi>;

const PYODIDE_SCRIPT_ID = "pyodide-cdn-script";
const PYODIDE_CDN_URL = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";

let scriptLoadingPromise: Promise<void> | null = null;
let pyodideInitPromise: Promise<PyodideApi> | null = null;

const loadScriptOnce = () => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Pyodide can only run in the browser."));
  }

  if (scriptLoadingPromise) return scriptLoadingPromise;

  const existingScript = document.getElementById(PYODIDE_SCRIPT_ID) as HTMLScriptElement | null;
  if (existingScript) {
    scriptLoadingPromise = Promise.resolve();
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = PYODIDE_SCRIPT_ID;
    script.src = PYODIDE_CDN_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Pyodide script."));
    document.body.appendChild(script);
  });

  return scriptLoadingPromise;
};

const getLoadPyodide = (): LoadPyodide => {
  const maybeLoadPyodide = (window as Window & { loadPyodide?: LoadPyodide }).loadPyodide;
  if (!maybeLoadPyodide) {
    throw new Error("Pyodide loader was not found on window.");
  }
  return maybeLoadPyodide;
};

export type PythonRuntimeState = {
  pyodide: PyodideApi | null;
  loading: boolean;
  running: boolean;
  initialized: boolean;
  init: () => Promise<void>;
  run: (code: string) => Promise<void>;
};

export const usePythonRuntimeStore = create<PythonRuntimeState>((set, get) => ({
  pyodide: null,
  loading: false,
  running: false,
  initialized: false,
  init: async () => {
    const { pyodide, initialized } = get();
    if (initialized && pyodide) return;

    set({ loading: true });
    try {
      await loadScriptOnce();
      if (!pyodideInitPromise) {
        pyodideInitPromise = getLoadPyodide()();
      }
      const runtime = await pyodideInitPromise;
      set({ pyodide: runtime, initialized: true });
    } catch (error) {
      useTerminalStore.getState().addLog("error", `Runtime initialization failed: ${String(error)}`);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  run: async (code) => {
    const normalizedCode = code.trim();
    if (!normalizedCode) return;

    if (!get().initialized || !get().pyodide) {
      await get().init();
    }

    const runtime = get().pyodide;
    if (!runtime) return;

    const terminal = useTerminalStore.getState();
    set({ running: true });

    try {
      runtime.runPython(`
import sys
from io import StringIO

_stdout = StringIO()
_stderr = StringIO()
_prev_stdout = sys.stdout
_prev_stderr = sys.stderr
sys.stdout = _stdout
sys.stderr = _stderr
`);

      await runtime.runPythonAsync(normalizedCode);
    } catch (error) {
      terminal.addLog("error", String(error));
    } finally {
      const stdout = String(runtime.runPython("_stdout.getvalue()"));
      const stderr = String(runtime.runPython("_stderr.getvalue()"));

      if (stdout.trim()) {
        terminal.addLog("info", stdout);
      }
      if (stderr.trim()) {
        terminal.addLog("error", stderr);
      }

      runtime.runPython("sys.stdout = _prev_stdout\nsys.stderr = _prev_stderr");
      set({ running: false });
    }
  },
}));
