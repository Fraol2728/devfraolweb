import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "@/hooks/useToastStore";
import { MenuBar } from "@/features/code-editor/components/MenuBar";
import { FileExplorer } from "@/features/code-editor/components/FileExplorer";
import { EditorPane } from "@/features/code-editor/components/EditorPane";
import { Terminal } from "@/features/code-editor/components/Terminal";
import { ResizablePanels } from "@/features/code-editor/components/ResizablePanels";
import { useFilesStore, selectFiles } from "@/features/code-editor/stores/useFilesStore";
import { useLayoutStore } from "@/features/code-editor/stores/useLayoutStore";
import { useEditorStore } from "@/features/code-editor/stores/useEditorStore";
import "@/features/code-editor/codeEditor.css";

const PYODIDE_SCRIPT_URL = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
const PYODIDE_SCRIPT_ID = "pyodide-runtime-loader";

const loadPyodideScript = () => new Promise((resolve, reject) => {
  if (window.loadPyodide) {
    resolve(window.loadPyodide);
    return;
  }

  const existing = document.getElementById(PYODIDE_SCRIPT_ID);
  if (existing) {
    existing.addEventListener("load", () => resolve(window.loadPyodide));
    existing.addEventListener("error", () => reject(new Error("Failed to load Pyodide script.")));
    return;
  }

  const script = document.createElement("script");
  script.id = PYODIDE_SCRIPT_ID;
  script.src = PYODIDE_SCRIPT_URL;
  script.async = true;
  script.onload = () => resolve(window.loadPyodide);
  script.onerror = () => reject(new Error("Failed to load Pyodide script."));
  document.body.appendChild(script);
});

export const PythonCodeEditor = () => {
  const tree = useFilesStore((s) => s.tree);
  const openTabs = useFilesStore((s) => s.openTabs);
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);
  const openFileByPath = useFilesStore((s) => s.openFile);
  const closeTab = useFilesStore((s) => s.closeTab);
  const updateContent = useFilesStore((s) => s.updateContent);
  const createFile = useFilesStore((s) => s.createFile);
  const createFileByPath = useFilesStore((s) => s.createFileByPath);
  const renameFileByPath = useFilesStore((s) => s.renameFileByPath);
  const deleteFileByPath = useFilesStore((s) => s.deleteFileByPath);

  const logs = useEditorStore((s) => s.logs);
  const appendOutput = useEditorStore((s) => s.appendOutput);
  const clearTerminal = useEditorStore((s) => s.clearLogs);

  const terminalOpen = useLayoutStore((s) => s.terminalOpen);
  const toggleTerminal = useLayoutStore((s) => s.toggleTerminal);

  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const pyodideRef = useRef(null);
  const pyodideInitPromiseRef = useRef(null);
  const editorCommandRef = useRef({ undo: () => {}, redo: () => {} });

  const files = useMemo(() => selectFiles(tree), [tree]);
  const activeFile = files.find((item) => item.id === activeFileId) ?? null;
  const tabs = openTabs.map((tabId) => files.find((item) => item.id === tabId)).filter(Boolean);

  const initializePyodide = useCallback(async () => {
    if (pyodideRef.current) {
      setIsPyodideReady(true);
      return pyodideRef.current;
    }

    if (pyodideInitPromiseRef.current) return pyodideInitPromiseRef.current;

    setIsPyodideLoading(true);
    pyodideInitPromiseRef.current = (async () => {
      try {
        await loadPyodideScript();
        if (!window.loadPyodide) throw new Error("Pyodide loader was not found on window.");
        const runtime = await window.loadPyodide();
        pyodideRef.current = runtime;
        setIsPyodideReady(true);
        appendOutput("Pyodide runtime loaded.");
        return runtime;
      } catch (error) {
        appendOutput(error?.message || "Unable to initialize Python runtime.", "error");
        throw error;
      } finally {
        setIsPyodideLoading(false);
      }
    })();

    return pyodideInitPromiseRef.current;
  }, [appendOutput]);

  useEffect(() => {
    initializePyodide().catch(() => null);
  }, [initializePyodide]);

  const runPythonCode = useCallback(async () => {
    if (!activeFile) {
      appendOutput("No active file selected.", "error");
      return;
    }

    if (isRunning) {
      appendOutput("Execution already in progress. Please wait.", "error");
      return;
    }

    setIsRunning(true);
    try {
      const pyodide = await initializePyodide();
      const capture = (text, type = "log") => {
        const value = typeof text === "string" ? text : String(text ?? "");
        appendOutput(value, type);
      };

      pyodide.setStdout({ batched: (line) => capture(line, "log") });
      pyodide.setStderr({ batched: (line) => capture(line, "error") });

      await pyodide.runPythonAsync(activeFile.content ?? "");
    } catch (error) {
      appendOutput(error?.message || "Python execution failed.", "error");
    } finally {
      setIsRunning(false);
    }
  }, [activeFile, appendOutput, initializePyodide, isRunning]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        if (isPyodideReady && !isRunning) runPythonCode();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPyodideReady, isRunning, runPythonCode]);

  const handleMenuAction = (action) => {
    if (action === "file-new") {
      createFile(null, `script-${Date.now()}.py`);
      appendOutput("Created a new Python file.");
      return;
    }

    if (action === "file-open") {
      const path = window.prompt("Open file path", "project/src/main.py");
      if (path) openFileByPath(path);
      return;
    }

    if (action === "file-save") {
      appendOutput(activeFile ? `Saved ${activeFile.name}.` : "No active file to save.");
      return;
    }

    if (action === "file-save-as") {
      if (!activeFile) {
        appendOutput("No active file to save as.", "error");
        return;
      }
      const newName = window.prompt("Save as", activeFile.name);
      if (!newName) return;
      createFileByPath(newName, "project/src", activeFile.content ?? "");
      appendOutput(`Saved as ${newName}.`);
      return;
    }

    if (action === "view-toggle-terminal") {
      toggleTerminal();
      return;
    }

    if (action === "edit-undo") {
      editorCommandRef.current.undo();
      return;
    }

    if (action === "edit-redo") {
      editorCommandRef.current.redo();
      return;
    }

    if (action === "run-python") {
      if (!isPyodideReady || isRunning) return;
      runPythonCode();
      return;
    }

    if (action === "file-rename-by-path") {
      const oldPath = window.prompt("Current path", "project/src/main.py");
      const newName = window.prompt("New file name", "main.py");
      if (oldPath && newName) renameFileByPath(oldPath, newName);
      return;
    }

    if (action === "file-delete-by-path") {
      const filePath = window.prompt("Delete file path", "project/src/utils.py");
      if (filePath) deleteFileByPath(filePath);
      return;
    }

    toast({ title: action, description: "Action is not available." });
  };

  return (
    <section className="py-root">
      <MenuBar
        onAction={handleMenuAction}
        disabledActions={!isPyodideReady || isRunning ? ["run-python"] : []}
        runLabel={isPyodideLoading ? "Loading Python runtime…" : "Run Python Code"}
      />
      <ResizablePanels
        explorer={<FileExplorer />}
        editor={<EditorPane activeFile={activeFile} tabs={tabs} onTabSwitch={setActiveFile} onTabClose={closeTab} onChange={updateContent} onEditorReady={(api) => { editorCommandRef.current = api; }} />}
        terminal={<Terminal logs={logs} onClear={clearTerminal} />}
        terminalVisible={terminalOpen}
      />
    </section>
  );
};
