import { useEffect, useMemo, useRef, useState } from "react";
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

const PYODIDE_SCRIPT_ID = "pyodide-cdn-script";

export const PythonCodeEditor = () => {
  const tree = useFilesStore((s) => s.tree);
  const projects = useFilesStore((s) => s.projects);
  const currentProjectId = useFilesStore((s) => s.currentProjectId);
  const openTabs = useFilesStore((s) => s.openTabs);
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);
  const closeTab = useFilesStore((s) => s.closeTab);
  const reorderTabs = useFilesStore((s) => s.reorderTabs);
  const updateContent = useFilesStore((s) => s.updateContent);
  const createFile = useFilesStore((s) => s.createFile);
  const createProject = useFilesStore((s) => s.createProject);
  const setCurrentProject = useFilesStore((s) => s.setCurrentProject);
  const saveAllFiles = useFilesStore((s) => s.saveAllFiles);

  const logs = useEditorStore((s) => s.logs);
  const appendOutput = useEditorStore((s) => s.appendOutput);
  const clearLogs = useEditorStore((s) => s.clearLogs);
  const addCommandHistory = useEditorStore((s) => s.addCommandHistory);
  const autoScrollTerminal = useEditorStore((s) => s.autoScrollTerminal);
  const toggleAutoScrollTerminal = useEditorStore((s) => s.toggleAutoScrollTerminal);

  const terminalOpen = useLayoutStore((s) => s.terminalOpen);
  const explorerOpen = useLayoutStore((s) => s.explorerOpen);
  const toggleTerminal = useLayoutStore((s) => s.toggleTerminal);
  const toggleExplorer = useLayoutStore((s) => s.toggleExplorer);

  const [isPyodideReady, setIsPyodideReady] = useState(Boolean(window.__pyodide));
  const [runtimeLoading, setRuntimeLoading] = useState(false);
  const editorRef = useRef(null);
  const saveDebounceRef = useRef();
  const pyodideInitPromiseRef = useRef(null);

  const files = useMemo(() => selectFiles(tree), [tree]);
  const activeFile = files.find((item) => item.id === activeFileId) ?? null;
  const tabs = openTabs.map((tabId) => files.find((item) => item.id === tabId)).filter(Boolean);

  const initializePyodide = async () => {
    if (window.__pyodide) {
      setIsPyodideReady(true);
      return window.__pyodide;
    }
    if (pyodideInitPromiseRef.current) {
      return pyodideInitPromiseRef.current;
    }

    const initPromise = (async () => {
    setRuntimeLoading(true);
    try {
      if (!window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const existing = document.getElementById(PYODIDE_SCRIPT_ID);
          if (existing) {
            existing.addEventListener("load", resolve, { once: true });
            existing.addEventListener("error", reject, { once: true });
            return;
          }
          const script = document.createElement("script");
          script.id = PYODIDE_SCRIPT_ID;
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }
      window.__pyodide = await window.loadPyodide();
      setIsPyodideReady(true);
      appendOutput("Pyodide runtime initialized.");
      return window.__pyodide;
    } catch {
      appendOutput("Failed to load Pyodide runtime.", "error");
      return null;
    } finally {
      pyodideInitPromiseRef.current = null;
      setRuntimeLoading(false);
    }
    })();

    pyodideInitPromiseRef.current = initPromise;
    return initPromise;
  };

  const runPythonCode = async () => {
    if (!activeFile) return;
    addCommandHistory(activeFile.name);
    const pyodide = isPyodideReady ? window.__pyodide : await initializePyodide();
    if (!pyodide) return;
    setRuntimeLoading(true);
    appendOutput(`Running ${activeFile.name} ...`);
    try {
      pyodide.setStdout({ batched: (text) => appendOutput(text, "log") });
      pyodide.setStderr({ batched: (text) => appendOutput(text, "error") });
      await pyodide.runPythonAsync(activeFile.content ?? "");
      appendOutput("Execution completed.");
    } catch (error) {
      appendOutput(String(error), "error");
    } finally {
      setRuntimeLoading(false);
    }
  };

  const saveFile = () => {
    saveAllFiles();
    toast({ title: "Saved", description: "Files saved locally." });
  };

  const handleMenuAction = (action) => {
    if (action === "file-new") {
      createFile(null, `script-${Date.now()}.py`);
      appendOutput("Created a new Python file.");
      return;
    }
    if (action === "file-save" || action === "file-save-as" || action === "file-save-all") {
      saveFile();
      return;
    }
    if (action === "file-new-project") {
      const name = window.prompt("Project name", "project");
      if (name) createProject(name);
      return;
    }
    if (action === "view-toggle-terminal") {
      toggleTerminal();
      return;
    }
    if (action === "view-toggle-explorer") {
      toggleExplorer();
      return;
    }
    if (action === "run-python") {
      runPythonCode();
      return;
    }
    if (action === "edit-undo") editorRef.current?.trigger("keyboard", "undo", null);
    if (action === "edit-redo") editorRef.current?.trigger("keyboard", "redo", null);
    if (action === "edit-find") editorRef.current?.getAction("actions.find")?.run();
  };

  const handleEditorChange = (fileId, value) => {
    updateContent(fileId, value);
    window.clearTimeout(saveDebounceRef.current);
    saveDebounceRef.current = window.setTimeout(() => saveAllFiles(), 450);
  };

  useEffect(() => {
    useFilesStore.getState().loadProjectFromLocalStorage();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.ctrlKey) return;
      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (event.shiftKey) handleMenuAction("file-save-as");
        else handleMenuAction("file-save");
      }
      if (event.key.toLowerCase() === "n") {
        event.preventDefault();
        handleMenuAction("file-new");
      }
      if (event.key === "Enter") {
        event.preventDefault();
        handleMenuAction("run-python");
      }
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        handleMenuAction("edit-find");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeFile]);

  const copyOutput = async () => {
    await navigator.clipboard.writeText(logs.map((line) => line.text).join("\n"));
    toast({ title: "Copied", description: "Terminal output copied." });
  };

  return (
    <section className="py-root">
      <MenuBar
        onAction={handleMenuAction}
        projects={projects}
        currentProjectId={currentProjectId}
        onProjectChange={setCurrentProject}
        runtimeLabel={runtimeLoading ? "Runtime busy..." : isPyodideReady ? "Pyodide ready" : "Pyodide not loaded"}
      />
      <ResizablePanels
        explorer={<FileExplorer />}
        editor={<EditorPane activeFile={activeFile} tabs={tabs} onTabSwitch={setActiveFile} onTabClose={closeTab} onTabReorder={reorderTabs} onChange={handleEditorChange} onEditorReady={(editor) => { editorRef.current = editor; }} />}
        terminal={<Terminal logs={logs} onClear={clearLogs} onCopy={copyOutput} autoScroll={autoScrollTerminal} onToggleAutoScroll={toggleAutoScrollTerminal} />}
        terminalVisible={terminalOpen}
        explorerVisible={explorerOpen}
      />
    </section>
  );
};
