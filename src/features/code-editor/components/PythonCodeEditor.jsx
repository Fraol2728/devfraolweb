import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "@/hooks/useToastStore";
import { FileExplorer } from "@/features/code-editor/components/FileExplorer";
import { Terminal } from "@/features/code-editor/components/Terminal";
import { StatusBar } from "@/features/code-editor/components/StatusBar";
import { MenuBar } from "@/features/code-editor/components/MenuBar";
import { ResizablePanels } from "@/features/code-editor/components/ResizablePanels";
import { useFilesStore, selectFiles } from "@/features/code-editor/stores/useFilesStore";
import { useEditorStore } from "@/features/code-editor/stores/useEditorStore";
import { useLayoutStore } from "@/features/code-editor/stores/useLayoutStore";
import "@/features/code-editor/codeEditor.css";

const MonacoEditor = lazy(() => import("@/features/code-editor/components/MonacoFromCDN"));
const PYODIDE_SCRIPT_ID = "pyodide-cdn-script";

export const PythonCodeEditor = () => {
  const tree = useFilesStore((s) => s.tree);
  const openTabs = useFilesStore((s) => s.openTabs);
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);
  const closeTab = useFilesStore((s) => s.closeTab);
  const reorderTabs = useFilesStore((s) => s.reorderTabs);
  const updateContent = useFilesStore((s) => s.updateContent);
  const createFile = useFilesStore((s) => s.createFile);
  const createFolder = useFilesStore((s) => s.createFolder);
  const saveAllFiles = useFilesStore((s) => s.saveAllFiles);

  const logs = useEditorStore((s) => s.logs);
  const appendOutput = useEditorStore((s) => s.appendOutput);
  const clearLogs = useEditorStore((s) => s.clearLogs);
  const addCommandHistory = useEditorStore((s) => s.addCommandHistory);
  const navigateCommandHistory = useEditorStore((s) => s.navigateCommandHistory);
  const autoScrollTerminal = useEditorStore((s) => s.autoScrollTerminal);
  const toggleAutoScrollTerminal = useEditorStore((s) => s.toggleAutoScrollTerminal);

  const toggleExplorer = useLayoutStore((s) => s.toggleExplorer);
  const toggleTerminal = useLayoutStore((s) => s.toggleTerminal);

  const [isPyodideReady, setIsPyodideReady] = useState(Boolean(window.__pyodide));
  const [runtimeLoading, setRuntimeLoading] = useState(false);
  const [editorContextMenu, setEditorContextMenu] = useState(null);
  const editorRef = useRef(null);
  const explorerRef = useRef(null);

  const files = useMemo(() => selectFiles(tree), [tree]);
  const activeFile = files.find((item) => item.id === activeFileId) ?? null;
  const tabs = openTabs.map((tabId) => files.find((item) => item.id === tabId)).filter(Boolean);

  useEffect(() => {
    if (!editorContextMenu) return;
    const close = () => setEditorContextMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [editorContextMenu]);

  const initializePyodide = async () => {
    if (window.__pyodide) return window.__pyodide;
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
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    const pyodide = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/" });
    window.__pyodide = pyodide;
    setIsPyodideReady(true);
    return pyodide;
  };

  const runPythonCode = async () => {
    if (!activeFile) return;
    addCommandHistory(activeFile.name);
    const pyodide = await initializePyodide();
    setRuntimeLoading(true);
    appendOutput(`Running ${activeFile.name} ...`);
    try {
      pyodide.FS.mkdirTree("/project");
      for (const file of files.filter((item) => item.name.endsWith(".py"))) {
        pyodide.FS.writeFile(`/project/${file.name}`, file.content ?? "", { encoding: "utf8" });
      }
      pyodide.runPython("import sys; sys.path.append('/project')");
      pyodide.setStdout({ batched: (text) => appendOutput(text, "log") });
      pyodide.setStderr({ batched: (text) => appendOutput(text, "error") });
      await pyodide.runPythonAsync(activeFile.content ?? "");
    } catch (error) {
      appendOutput(String(error), "error");
    } finally {
      setRuntimeLoading(false);
    }
  };

  const runSnippet = async (command) => {
    if (!command?.trim()) return;
    addCommandHistory(command);
    const pyodide = await initializePyodide();
    try {
      pyodide.setStdout({ batched: (text) => appendOutput(text, "log") });
      pyodide.setStderr({ batched: (text) => appendOutput(text, "error") });
      await pyodide.runPythonAsync(command);
    } catch (error) {
      appendOutput(String(error), "error");
    }
  };

  const copyAllEditor = async () => {
    await navigator.clipboard.writeText(activeFile?.content ?? "");
    toast({ title: "Copied", description: "Editor content copied." });
  };

  const handleMenuAction = async (action) => {
    if (action === "file-new") createFile(null, `script-${Date.now()}.py`);
    if (action === "file-new-folder") createFolder(null, `folder-${Date.now()}`);
    if (action === "file-save") {
      saveAllFiles();
      toast({ title: "Saved", description: "Session workspace saved." });
    }
    if (action === "edit-undo") editorRef.current?.trigger("keyboard", "undo", null);
    if (action === "edit-redo") editorRef.current?.trigger("keyboard", "redo", null);
    if (action === "edit-copy") await copyAllEditor();
    if (action === "edit-paste") {
      const text = await navigator.clipboard.readText();
      if (activeFile) updateContent(activeFile.id, `${activeFile.content ?? ""}${text}`);
    }
    if (action === "view-toggle-explorer") toggleExplorer();
    if (action === "view-toggle-terminal") toggleTerminal();
    if (action === "run-python") runPythonCode();
    if (action === "help-about") toast({ title: "Python IDE", description: "Frontend-only session workspace." });
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.ctrlKey) return;
      const key = event.key.toLowerCase();
      if (key === "s") {
        event.preventDefault();
        handleMenuAction("file-save");
      }
      if (event.shiftKey && key === "f") {
        event.preventDefault();
        explorerRef.current?.focus();
      }
      if (event.key === "Enter") {
        event.preventDefault();
        handleMenuAction("run-python");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeFile]);

  const copyOutput = async () => navigator.clipboard.writeText(logs.map((line) => line.text).join("\n"));

  return (
    <section className="py-root" aria-label="Python code editor workspace">
      <div className="vsc-shell">
        <MenuBar onAction={handleMenuAction} />
        <div className="vsc-workbench">
          <ResizablePanels
            explorer={<FileExplorer ref={explorerRef} />}
            editor={(
              <main className="vsc-editor-section" onContextMenu={(event) => {
                if ((event.target).closest?.(".monaco-editor")) return;
                event.preventDefault();
                setEditorContextMenu({ x: event.clientX, y: event.clientY });
              }}>
                <div className="vsc-tab-bar">
                  {tabs.map((tab, index) => (
                    <div
                      key={tab.id}
                      className={`vsc-tab ${activeFile?.id === tab.id ? "active" : ""}`}
                      draggable
                      onDragStart={(event) => event.dataTransfer.setData("text/tab-index", String(index))}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => reorderTabs(Number(event.dataTransfer.getData("text/tab-index")), index)}
                    >
                      <button type="button" className="vsc-tab-name" onClick={() => setActiveFile(tab.id)}>{tab.name}</button>
                      <button type="button" className="vsc-tab-close" onClick={() => closeTab(tab.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="vsc-breadcrumb-bar">{activeFile ? `project / ${activeFile.name}` : "No file selected"}</div>
                <div className="vsc-editor-body">
                  {activeFile ? (
                    <Suspense fallback={<div className="py-empty-state">Loading Monaco…</div>}>
                      <MonacoEditor file={activeFile} onChange={(value) => updateContent(activeFile.id, value)} onEditorReady={(editor) => { editorRef.current = editor; }} />
                    </Suspense>
                  ) : <div className="py-empty-state">Open a file from Explorer to start coding.</div>}
                </div>
              </main>
            )}
            terminal={(
              <Terminal
                hideHeader
                logs={logs}
                onClear={clearLogs}
                onCopy={copyOutput}
                autoScroll={autoScrollTerminal}
                onToggleAutoScroll={toggleAutoScrollTerminal}
                onCommand={runSnippet}
                onHistory={navigateCommandHistory}
              />
            )}
          />
        </div>
        <StatusBar activeFile={activeFile} runtimeLoading={runtimeLoading} isPyodideReady={isPyodideReady} />
      </div>
      {editorContextMenu ? (
        <div className="fixed z-50 min-w-40 border border-zinc-700 bg-zinc-900 text-xs shadow-xl" style={{ left: editorContextMenu.x, top: editorContextMenu.y }}>
          <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-zinc-700" onClick={() => { runPythonCode(); setEditorContextMenu(null); }}>Run Code</button>
          <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-zinc-700" onClick={() => { copyAllEditor(); setEditorContextMenu(null); }}>Copy All</button>
          <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-zinc-700" onClick={() => { if (activeFile) updateContent(activeFile.id, ""); setEditorContextMenu(null); }}>Clear Editor</button>
        </div>
      ) : null}
    </section>
  );
};
