import { Suspense, lazy, useCallback, useEffect, useMemo, useRef } from "react";
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
import { usePythonRuntimeStore } from "@/features/code-editor/stores/usePythonRuntimeStore";
import { useTerminalStore } from "@/features/code-editor/stores/useTerminalStore";
import { exportProjectAsJson, exportProjectAsZip, importProjectFromFile } from "@/features/code-editor/ProjectManager";
import "@/features/code-editor/codeEditor.css";

const MonacoEditor = lazy(() => import("@/features/code-editor/components/MonacoFromCDN"));

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

  const addCommandHistory = useEditorStore((s) => s.addCommandHistory);
  const navigateCommandHistory = useEditorStore((s) => s.navigateCommandHistory);
  const autoScrollTerminal = useEditorStore((s) => s.autoScrollTerminal);
  const toggleAutoScrollTerminal = useEditorStore((s) => s.toggleAutoScrollTerminal);

  const logs = useTerminalStore((s) => s.logs);
  const clearLogs = useTerminalStore((s) => s.clear);
  const addLog = useTerminalStore((s) => s.addLog);

  const pyodide = usePythonRuntimeStore((s) => s.pyodide);
  const runtimeLoading = usePythonRuntimeStore((s) => s.loading);
  const runtimeRunning = usePythonRuntimeStore((s) => s.running);
  const isPyodideReady = usePythonRuntimeStore((s) => s.initialized);
  const initRuntime = usePythonRuntimeStore((s) => s.init);
  const runCode = usePythonRuntimeStore((s) => s.run);

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

  const editorRef = useRef(null);
  const saveDebounceRef = useRef();
  const resizeFrameRef = useRef(0);
  const resizeStateRef = useRef(null);

  const files = useMemo(() => selectFiles(tree), [tree]);
  const activeFile = files.find((item) => item.id === activeFileId) ?? null;
  const tabs = openTabs.map((tabId) => files.find((item) => item.id === tabId)).filter(Boolean);

  const ensureBottomPanelOpen = useCallback(() => {
    if (!useIDELayoutStore.getState().isBottomPanelOpen) {
      toggleBottomPanel();
    }
  }, [toggleBottomPanel]);

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

  const runPythonCode = async () => {
    if (!activeFile) return;
    addCommandHistory(activeFile.name);
    ensureBottomPanelOpen();
    addLog("info", `Running ${activeFile.name} ...`);
    await runCode(activeFile.content ?? "");
  };

  const runSnippet = async (command) => {
    if (!command?.trim()) return;
    addCommandHistory(command);
    ensureBottomPanelOpen();
    await runCode(command);
  };

  const saveFile = () => {
    saveAllFiles();
    toast({ title: "Saved", description: "Files saved locally." });
  };

  const handleMenuAction = (action) => {
    if (action === "file-new") {
      createFile(null, `script-${Date.now()}.py`);
      addLog("info", "Created a new Python file.");
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
      initRuntime()
        .then(() => exportProjectAsZip(projects[currentProjectId], usePythonRuntimeStore.getState().pyodide))
        .catch(() => addLog("error", "Unable to initialize runtime for ZIP export."));
      return;
    }
    if (action === "file-import-project") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json,.zip";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        try {
          if (file.name.endsWith(".zip")) {
            await initRuntime();
          }
          const project = await importProjectFromFile(file, usePythonRuntimeStore.getState().pyodide);
          importProject(project);
        } catch (error) {
          addLog("error", `Project import failed: ${String(error)}`);
        }
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
    await navigator.clipboard.writeText(logs.map((line) => line.message).join("\n"));
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
        <StatusBar activeFile={activeFile} runtimeLoading={runtimeLoading || runtimeRunning} isPyodideReady={isPyodideReady || Boolean(pyodide)} />
      </div>
    </section>
  );
};
