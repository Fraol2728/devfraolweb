import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "@/hooks/useToastStore";
import { FileExplorer } from "@/features/code-editor/components/FileExplorer";
import { Terminal } from "@/features/code-editor/components/Terminal";
import { ActivityBar } from "@/features/code-editor/components/ActivityBar";
import { SidePanel } from "@/features/code-editor/components/SidePanel";
import { TabBar } from "@/features/code-editor/components/TabBar";
import { BreadcrumbBar } from "@/features/code-editor/components/BreadcrumbBar";
import { BottomPanel } from "@/features/code-editor/components/BottomPanel";
import { StatusBar } from "@/features/code-editor/components/StatusBar";
import { LayoutDivider } from "@/features/code-editor/components/LayoutDivider";
import { useFilesStore, selectFiles } from "@/features/code-editor/stores/useFilesStore";
import { useEditorStore } from "@/features/code-editor/stores/useEditorStore";
import { useIDELayoutStore } from "@/features/code-editor/stores/useIDELayoutStore";
import { exportProjectAsJson, exportProjectAsZip, importProjectFromFile } from "@/features/code-editor/ProjectManager";
import "@/features/code-editor/codeEditor.css";

const MonacoEditor = lazy(() => import("@/features/code-editor/components/MonacoFromCDN"));
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
  const importProject = useFilesStore((s) => s.importProject);
  const setCurrentProject = useFilesStore((s) => s.setCurrentProject);
  const saveAllFiles = useFilesStore((s) => s.saveAllFiles);

  const logs = useEditorStore((s) => s.logs);
  const appendOutput = useEditorStore((s) => s.appendOutput);
  const clearLogs = useEditorStore((s) => s.clearLogs);
  const addCommandHistory = useEditorStore((s) => s.addCommandHistory);
  const navigateCommandHistory = useEditorStore((s) => s.navigateCommandHistory);
  const autoScrollTerminal = useEditorStore((s) => s.autoScrollTerminal);
  const toggleAutoScrollTerminal = useEditorStore((s) => s.toggleAutoScrollTerminal);

  const isSidePanelOpen = useIDELayoutStore((s) => s.isSidePanelOpen);
  const isBottomPanelOpen = useIDELayoutStore((s) => s.isBottomPanelOpen);
  const activeActivityTab = useIDELayoutStore((s) => s.activeActivityTab);
  const sidePanelWidth = useIDELayoutStore((s) => s.sidePanelWidth);
  const bottomPanelHeight = useIDELayoutStore((s) => s.bottomPanelHeight);
  const toggleSidePanel = useIDELayoutStore((s) => s.toggleSidePanel);
  const toggleBottomPanel = useIDELayoutStore((s) => s.toggleBottomPanel);
  const setActiveActivityTab = useIDELayoutStore((s) => s.setActiveActivityTab);
  const setSidePanelWidth = useIDELayoutStore((s) => s.setSidePanelWidth);
  const setBottomPanelHeight = useIDELayoutStore((s) => s.setBottomPanelHeight);

  const [isPyodideReady, setIsPyodideReady] = useState(Boolean(window.__pyodide));
  const [runtimeLoading, setRuntimeLoading] = useState(false);
  const editorRef = useRef(null);
  const saveDebounceRef = useRef();
  const resizeFrameRef = useRef(0);
  const resizeStateRef = useRef(null);

  const files = useMemo(() => selectFiles(tree), [tree]);
  const activeFile = files.find((item) => item.id === activeFileId) ?? null;
  const tabs = openTabs.map((tabId) => files.find((item) => item.id === tabId)).filter(Boolean);

  const onResizeMove = useCallback((event) => {
    if (!resizeStateRef.current) return;
    const state = resizeStateRef.current;
    state.currentX = event.clientX;
    state.currentY = event.clientY;
    if (resizeFrameRef.current) return;
    resizeFrameRef.current = window.requestAnimationFrame(() => {
      resizeFrameRef.current = 0;
      const current = resizeStateRef.current;
      if (!current) return;
      if (current.type === "side") {
        const nextWidth = current.startSize + (current.currentX - current.startX);
        setSidePanelWidth(nextWidth);
      } else {
        const nextHeight = current.startSize + (current.startY - current.currentY);
        setBottomPanelHeight(nextHeight);
      }
    });
  }, [setBottomPanelHeight, setSidePanelWidth]);

  const stopResize = useCallback(() => {
    window.removeEventListener("mousemove", onResizeMove);
    window.removeEventListener("mouseup", stopResize);
    if (resizeFrameRef.current) {
      window.cancelAnimationFrame(resizeFrameRef.current);
      resizeFrameRef.current = 0;
    }
    resizeStateRef.current = null;
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }, [onResizeMove]);

  const startResize = useCallback((type, event) => {
    event.preventDefault();
    resizeStateRef.current = {
      type,
      startX: event.clientX,
      startY: event.clientY,
      currentX: event.clientX,
      currentY: event.clientY,
      startSize: type === "side" ? useIDELayoutStore.getState().sidePanelWidth : useIDELayoutStore.getState().bottomPanelHeight,
    };
    document.body.style.userSelect = "none";
    document.body.style.cursor = type === "side" ? "col-resize" : "row-resize";
    window.addEventListener("mousemove", onResizeMove);
    window.addEventListener("mouseup", stopResize);
  }, [onResizeMove, stopResize]);

  useEffect(() => () => stopResize(), [stopResize]);

  const handleActivityChange = (tab) => {
    if (tab === activeActivityTab) {
      toggleSidePanel();
      return;
    }
    setActiveActivityTab(tab);
    if (!useIDELayoutStore.getState().isSidePanelOpen) {
      toggleSidePanel();
    }
  };

  const initializePyodide = async () => {
    if (window.__pyodide) {
      setIsPyodideReady(true);
      return window.__pyodide;
    }
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
      setRuntimeLoading(false);
    }
  };

  const runPythonCode = async () => {
    if (!activeFile) return;
    addCommandHistory(activeFile.name);
    const pyodide = await initializePyodide();
    if (!pyodide) return;
    setRuntimeLoading(true);
    appendOutput(`Running ${activeFile.name} ...`);
    try {
      const pyFiles = files.filter((file) => file.name.endsWith(".py"));
      pyodide.FS.mkdirTree("/project");
      for (const file of pyFiles) {
        pyodide.FS.writeFile(`/project/${file.name}`, file.content ?? "", { encoding: "utf8" });
      }
      pyodide.runPython("import sys; sys.path.append('/project')");
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
    if (action === "file-export-json") {
      exportProjectAsJson(projects[currentProjectId]);
      return;
    }
    if (action === "file-export-zip") {
      initializePyodide().then((pyodide) => exportProjectAsZip(projects[currentProjectId], pyodide));
      return;
    }
    if (action === "file-import-project") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json,.zip";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        const project = await importProjectFromFile(file, window.__pyodide);
        importProject(project);
      };
      input.click();
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
    <section className="py-root" aria-label="Python code editor workspace">
      <div className="vsc-shell">
        <div className="vsc-workbench">
          <ActivityBar activeItem={activeActivityTab} onChange={handleActivityChange} />
          <div className="vsc-main-column">
            <div className="vsc-main-row">
              {isSidePanelOpen ? (
                <>
                  <div className="vsc-side-panel-wrap" style={{ width: `${sidePanelWidth}px` }}>
                    <SidePanel projectId={currentProjectId} projects={projects} onProjectChange={setCurrentProject}>
                      <FileExplorer />
                    </SidePanel>
                  </div>
                  <LayoutDivider orientation="vertical" ariaLabel="Resize side panel" onMouseDown={(event) => startResize("side", event)} />
                </>
              ) : null}
              <main className="vsc-editor-section">
                <TabBar tabs={tabs} activeFile={activeFile} onTabSwitch={setActiveFile} onTabClose={closeTab} onTabReorder={reorderTabs} />
                <BreadcrumbBar activeFile={activeFile} />
                <div className="vsc-editor-body">
                  {activeFile ? (
                    <Suspense fallback={<div className="py-empty-state">Loading Monaco…</div>}>
                      <MonacoEditor file={activeFile} onChange={(value) => handleEditorChange(activeFile.id, value)} onEditorReady={(editor) => { editorRef.current = editor; }} />
                    </Suspense>
                  ) : (
                    <div className="py-empty-state">Open a file from Explorer to start coding.</div>
                  )}
                </div>
              </main>
            </div>
            {isBottomPanelOpen ? (
              <>
                <LayoutDivider orientation="horizontal" ariaLabel="Resize bottom panel" onMouseDown={(event) => startResize("bottom", event)} />
                <div className="vsc-bottom-wrap" style={{ height: `${bottomPanelHeight}px` }}>
                  <BottomPanel onToggle={toggleBottomPanel}>
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
                  </BottomPanel>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <StatusBar activeFile={activeFile} runtimeLoading={runtimeLoading} isPyodideReady={isPyodideReady} />
      </div>
    </section>
  );
};
