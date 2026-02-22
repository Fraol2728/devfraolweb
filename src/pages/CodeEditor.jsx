import { useEffect, useMemo, useState } from "react";
import { MenuBar } from "@/features/code-editor/MenuBar";
import { FileExplorer } from "@/features/code-editor/FileExplorer";
import { EditorPane } from "@/features/code-editor/EditorPane";
import { TabBar } from "@/features/code-editor/TabBar";
import { PreviewPane, buildPreviewDocument } from "@/features/code-editor/PreviewPane";
import { Terminal } from "@/features/code-editor/Terminal";
import { useFileSystem } from "@/hooks/useFileSystem";

const appendLog = (setter, type, value) => {
  setter((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, type, value }]);
};

export const CodeEditor = () => {
  const { nodes, files, activeFile, activeFileId, tabFiles, setActiveFile, closeTab, createFile, createFolder, renameNode, deleteNode, updateFileContent } = useFileSystem();

  const [leftVisible, setLeftVisible] = useState(true);
  const [rightVisible, setRightVisible] = useState(true);
  const [terminalVisible, setTerminalVisible] = useState(true);
  const [leftWidth, setLeftWidth] = useState(260);
  const [rightWidth, setRightWidth] = useState(360);
  const [terminalHeight, setTerminalHeight] = useState(180);
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [logs, setLogs] = useState([{ id: "boot", type: "log", value: "Terminal ready." }]);

  const previewDoc = useMemo(() => buildPreviewDocument(files), [files]);

  useEffect(() => {
    const listener = (event) => {
      if (event.data?.source !== "devfraol-preview") return;
      appendLog(setLogs, event.data.type === "error" ? "error" : "log", event.data.value);
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.ctrlKey) return;

      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        appendLog(setLogs, "log", "Save action triggered (placeholder).");
      }

      if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        const query = window.prompt("Find file:");
        if (!query) return;
        const found = files.find((file) => file.name.toLowerCase().includes(query.toLowerCase()));
        if (found) {
          setActiveFile(found.id);
        }
      }

      if (event.key === "`") {
        event.preventDefault();
        setTerminalVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [files, setActiveFile]);

  const handleCreateFile = (parentId) => {
    const name = window.prompt("File name", "new-file.js");
    if (!name) return;
    createFile(parentId, name);
  };

  const handleCreateFolder = (parentId) => {
    const name = window.prompt("Folder name", "new-folder");
    if (!name) return;
    const folder = createFolder(parentId, name);
    setExpandedFolders((prev) => [...prev, folder.id]);
  };

  const handleMenuAction = (action) => {
    if (action === "new-file") handleCreateFile(null);
    if (action === "save") appendLog(setLogs, "log", "Saved (placeholder).");
    if (action === "delete" && activeFileId) deleteNode(activeFileId);
    if (action === "toggle-terminal") setTerminalVisible((prev) => !prev);
    if (action === "toggle-left") setLeftVisible((prev) => !prev);
    if (action === "toggle-right") setRightVisible((prev) => !prev);
    if (action === "run") appendLog(setLogs, "log", "Code executed.");
    if (action === "help") appendLog(setLogs, "log", "Shortcuts: Ctrl+S, Ctrl+P, Ctrl+`.");
    if (action === "find") document.dispatchEvent(new KeyboardEvent("keydown", { key: "f", ctrlKey: true }));
  };

  return (
    <section className={`${theme === "dark" ? "dark" : ""} h-screen w-screen overflow-hidden bg-[#1E1E1E] text-zinc-100`}>
      <div className="flex h-full flex-col">
        <MenuBar onAction={handleMenuAction} />

        <div className="flex min-h-0 flex-1">
          {leftVisible && (
            <div className="relative border-r border-zinc-700" style={{ width: leftWidth }}>
              <FileExplorer
                nodes={nodes}
                activeFileId={activeFileId}
                expandedFolders={expandedFolders}
                setExpandedFolders={setExpandedFolders}
                onOpenFile={setActiveFile}
                onCreateFile={handleCreateFile}
                onCreateFolder={handleCreateFolder}
                onRename={(id) => {
                  const value = window.prompt("Rename to:");
                  if (value) renameNode(id, value);
                }}
                onDelete={deleteNode}
              />
              <div
                role="separator"
                onPointerDown={(event) => {
                  const startX = event.clientX;
                  const initial = leftWidth;
                  const onMove = (moveEvent) => setLeftWidth(Math.max(180, Math.min(420, initial + moveEvent.clientX - startX)));
                  const onUp = () => {
                    window.removeEventListener("pointermove", onMove);
                    window.removeEventListener("pointerup", onUp);
                  };
                  window.addEventListener("pointermove", onMove);
                  window.addEventListener("pointerup", onUp);
                }}
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-zinc-700"
              />
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <TabBar tabs={tabFiles} activeFileId={activeFileId} onSelectFile={setActiveFile} onCloseTab={closeTab} />
            <div className="relative flex min-h-0 flex-1">
              <div className="min-w-0 flex-1 bg-zinc-900">
                {activeFile ? <EditorPane activeFile={activeFile} onChange={(value) => updateFileContent(activeFile.id, value)} theme={theme} /> : null}
              </div>

              {rightVisible && (
                <div className="relative border-l border-zinc-700" style={{ width: rightWidth }}>
                  <div className="flex h-9 items-center justify-end gap-1 border-b border-zinc-700 bg-zinc-900 px-2">
                    {[
                      { key: "desktop", label: "Desktop" },
                      { key: "tablet", label: "Tablet" },
                      { key: "mobile", label: "Mobile" },
                    ].map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setPreviewDevice(option.key)}
                        className={`rounded px-2 py-1 text-xs ${previewDevice === option.key ? "bg-[#FF3B30]/20 text-[#FF3B30]" : "text-zinc-300"}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="h-[calc(100%-2.25rem)]">
                    <PreviewPane srcDoc={previewDoc} device={previewDevice} />
                  </div>
                  <div
                    role="separator"
                    onPointerDown={(event) => {
                      const startX = event.clientX;
                      const initial = rightWidth;
                      const onMove = (moveEvent) => setRightWidth(Math.max(260, Math.min(620, initial - (moveEvent.clientX - startX))));
                      const onUp = () => {
                        window.removeEventListener("pointermove", onMove);
                        window.removeEventListener("pointerup", onUp);
                      };
                      window.addEventListener("pointermove", onMove);
                      window.addEventListener("pointerup", onUp);
                    }}
                    className="absolute left-0 top-0 h-full w-1 cursor-col-resize bg-zinc-700"
                  />
                </div>
              )}
            </div>

            {terminalVisible && (
              <div className="relative border-t border-zinc-700" style={{ height: terminalHeight }}>
                <div
                  role="separator"
                  className="absolute left-0 top-0 h-1 w-full cursor-row-resize bg-zinc-700"
                  onPointerDown={(event) => {
                    const startY = event.clientY;
                    const initial = terminalHeight;
                    const onMove = (moveEvent) => setTerminalHeight(Math.max(120, Math.min(360, initial - (moveEvent.clientY - startY))));
                    const onUp = () => {
                      window.removeEventListener("pointermove", onMove);
                      window.removeEventListener("pointerup", onUp);
                    };
                    window.addEventListener("pointermove", onMove);
                    window.addEventListener("pointerup", onUp);
                  }}
                />
                <Terminal logs={logs} onClear={() => setLogs([])} />
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          className="absolute bottom-3 right-3 rounded bg-[#FF3B30] px-3 py-1 text-xs text-white"
        >
          Toggle Theme
        </button>
      </div>
    </section>
  );
};
