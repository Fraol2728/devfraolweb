import { Suspense, lazy, useCallback, useEffect, useMemo, useRef } from "react";
import { FileExplorer } from "@/features/code-editor/components/FileExplorer";
import { Terminal } from "@/features/code-editor/components/Terminal";
import { ActivityBar } from "@/features/code-editor/components/ActivityBar";
import { SidePanel } from "@/features/code-editor/components/SidePanel";
import { TabBar } from "@/features/code-editor/components/TabBar";
import { BreadcrumbBar } from "@/features/code-editor/components/BreadcrumbBar";
import { BottomPanel } from "@/features/code-editor/components/BottomPanel";
import { StatusBar } from "@/features/code-editor/components/StatusBar";
import { LayoutDivider } from "@/features/code-editor/components/LayoutDivider";
import { MenuBar } from "@/features/code-editor/components/MenuBar";
import { ContextMenu } from "@/features/code-editor/components/ContextMenu";
import { useFilesStore, selectFiles } from "@/features/code-editor/stores/useFilesStore";
import { useIDELayoutStore } from "@/features/code-editor/stores/useIDELayoutStore";
import { useLayoutStore } from "@/features/code-editor/stores/useLayoutStore";
import { useContextMenuStore } from "@/features/code-editor/stores/useContextMenuStore";
import { useTerminalStore } from "@/features/code-editor/stores/useTerminalStore";
import "@/features/code-editor/codeEditor.css";

const MonacoEditor = lazy(() => import("@/features/code-editor/components/MonacoFromCDN"));

const findNode = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const next = findNode(node.children, id);
      if (next) return next;
    }
  }
  return null;
};

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
  const createFolder = useFilesStore((s) => s.createFolder);
  const renameNode = useFilesStore((s) => s.renameNode);
  const deleteNode = useFilesStore((s) => s.deleteNode);
  const setCurrentProject = useFilesStore((s) => s.setCurrentProject);

  const activeActivityTab = useIDELayoutStore((s) => s.activeActivityTab);
  const setActiveActivityTab = useIDELayoutStore((s) => s.setActiveActivityTab);

  const sidebarOpen = useLayoutStore((s) => s.sidebarOpen);
  const bottomPanelOpen = useLayoutStore((s) => s.bottomPanelOpen);
  const sidebarWidth = useLayoutStore((s) => s.sidebarWidth);
  const bottomPanelHeight = useLayoutStore((s) => s.bottomPanelHeight);
  const toggleSidebar = useLayoutStore((s) => s.toggleSidebar);
  const toggleBottomPanel = useLayoutStore((s) => s.toggleBottomPanel);
  const setSidebarWidth = useLayoutStore((s) => s.setSidebarWidth);
  const setBottomPanelHeight = useLayoutStore((s) => s.setBottomPanelHeight);

  const openContext = useContextMenuStore((s) => s.open);
  const closeContext = useContextMenuStore((s) => s.close);
  const contextType = useContextMenuStore((s) => s.type);
  const contextTargetId = useContextMenuStore((s) => s.targetId);

  const logs = useTerminalStore((s) => s.logs);
  const runCode = useTerminalStore((s) => s.runCode);
  const clearLogs = useTerminalStore((s) => s.clearLogs);
  const appendLog = useTerminalStore((s) => s.appendLog);

  const editorRef = useRef(null);
  const resizeRef = useRef(null);

  const files = useMemo(() => selectFiles(tree), [tree]);
  const activeFile = files.find((item) => item.id === activeFileId) ?? null;
  const tabs = openTabs.map((tabId) => files.find((item) => item.id === tabId)).filter(Boolean);

  const runCodeAction = useCallback(() => {
    if (!bottomPanelOpen) toggleBottomPanel();
    runCode();
  }, [bottomPanelOpen, runCode, toggleBottomPanel]);

  const handleEditorContextMenu = (event) => {
    event.preventDefault();
    openContext(event.clientX, event.clientY, "editor", activeFile?.id ?? null);
  };

  const handleExplorerContextMenu = (event, targetId) => {
    event.preventDefault();
    openContext(event.clientX, event.clientY, "explorer", targetId ?? undefined);
  };

  const handleContextAction = (action) => {
    if (action === "editor-run") {
      runCodeAction();
      return;
    }
    if (action === "editor-format") {
      if (!activeFile) return;
      const formatted = (activeFile.content ?? "").split("\n").map((line) => line.replace(/\s+$/u, "")).join("\n");
      updateContent(activeFile.id, formatted);
      appendLog({ type: "info", message: "Document formatted." });
      return;
    }

    const target = contextTargetId ? findNode(tree, contextTargetId) : null;

    if (action === "explorer-open") {
      if (target?.type === "file") setActiveFile(target.id);
      return;
    }
    if (action === "explorer-rename") {
      if (!target) return;
      const next = window.prompt("Rename", target.name);
      if (next) renameNode(target.id, next);
      return;
    }
    if (action === "explorer-delete") {
      if (!target) return;
      deleteNode(target.id);
      return;
    }
    if (action === "explorer-new-file") {
      const parentId = target?.type === "folder" ? target.id : null;
      const next = window.prompt("New file", "new_file.py");
      if (next) createFile(parentId, next);
      return;
    }
    if (action === "explorer-new-folder") {
      const parentId = target?.type === "folder" ? target.id : null;
      const next = window.prompt("New folder", "new_folder");
      if (next) createFolder(parentId, next);
    }
  };

  const handleMenuAction = (action) => {
    if (action === "file-new") {
      const next = window.prompt("New file", "main.py");
      if (next) createFile(null, next);
      return;
    }
    if (action === "file-new-folder") {
      const next = window.prompt("New folder", "folder");
      if (next) createFolder(null, next);
      return;
    }
    if (action === "file-close-tab" && activeFileId) {
      closeTab(activeFileId);
      return;
    }
    if (action === "view-toggle-sidebar") {
      toggleSidebar();
      return;
    }
    if (action === "view-toggle-terminal") {
      toggleBottomPanel();
      return;
    }
    if (action === "run-code") {
      runCodeAction();
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!resizeRef.current) return;
      if (resizeRef.current.type === "sidebar") {
        const next = resizeRef.current.startSize + (event.clientX - resizeRef.current.start);
        setSidebarWidth(next);
      } else {
        const next = resizeRef.current.startSize + (resizeRef.current.start - event.clientY);
        setBottomPanelHeight(next);
      }
    };

    const stopResize = () => {
      resizeRef.current = null;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResize);
    };

    if (resizeRef.current) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopResize);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResize);
    };
  }, [setBottomPanelHeight, setSidebarWidth]);

  const startResize = (type, event) => {
    event.preventDefault();
    resizeRef.current = {
      type,
      start: type === "sidebar" ? event.clientX : event.clientY,
      startSize: type === "sidebar" ? sidebarWidth : bottomPanelHeight,
    };
    document.body.style.userSelect = "none";
    document.body.style.cursor = type === "sidebar" ? "col-resize" : "row-resize";
  };

  const handleActivityChange = (activityId) => {
    setActiveActivityTab(activityId);
    if (!sidebarOpen) toggleSidebar();
  };

  return (
    <section className="py-root" aria-label="Python code editor workspace">
      <div className="vsc-shell" onClick={() => closeContext()}>
        <div className="vsc-workbench">
          <ActivityBar activeItem={activeActivityTab} onChange={handleActivityChange} />
          <div className="vsc-main-column">
            <MenuBar onAction={handleMenuAction} />
            <div className="vsc-main-row">
              {sidebarOpen ? (
                <>
                  <div className="vsc-side-panel-wrap" style={{ width: `${sidebarWidth}px` }}>
                    <SidePanel projectId={currentProjectId} projects={projects} onProjectChange={setCurrentProject}>
                      <FileExplorer onOpenContextMenu={handleExplorerContextMenu} />
                    </SidePanel>
                  </div>
                  <LayoutDivider orientation="vertical" ariaLabel="Resize side panel" onMouseDown={(event) => startResize("sidebar", event)} />
                </>
              ) : null}
              <main className="vsc-editor-section" onContextMenu={handleEditorContextMenu}>
                <TabBar tabs={tabs} activeFile={activeFile} onTabSwitch={setActiveFile} onTabClose={closeTab} onTabReorder={reorderTabs} />
                <BreadcrumbBar activeFile={activeFile} />
                <div className="vsc-editor-body">
                  {activeFile ? (
                    <Suspense fallback={<div className="py-empty-state">Loading Monaco…</div>}>
                      <MonacoEditor file={activeFile} onChange={(value) => updateContent(activeFile.id, value)} onEditorReady={(editor) => { editorRef.current = editor; }} />
                    </Suspense>
                  ) : (
                    <div className="py-empty-state">Open a file from Explorer to start coding.</div>
                  )}
                </div>
              </main>
            </div>
            {bottomPanelOpen ? (
              <>
                <LayoutDivider orientation="horizontal" ariaLabel="Resize bottom panel" onMouseDown={(event) => startResize("bottom", event)} />
                <div className="vsc-bottom-wrap" style={{ height: `${bottomPanelHeight}px` }}>
                  <BottomPanel onToggle={toggleBottomPanel}>
                    <Terminal logs={logs} onClear={clearLogs} />
                  </BottomPanel>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <StatusBar activeFile={activeFile} runtimeLoading={false} isPyodideReady />
        <ContextMenu onAction={handleContextAction} />
      </div>
    </section>
  );
};
