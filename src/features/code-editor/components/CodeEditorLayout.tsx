import { lazy, memo, Suspense, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFilesStore, selectFiles } from "@/features/code-editor/stores/useFilesStore";
import { useEditorStore } from "@/features/code-editor/stores/useEditorStore";
import { useLayoutStore } from "@/features/code-editor/stores/useLayoutStore";
import type { FileNode } from "@/features/code-editor/types";
import "@/features/code-editor/codeEditor.css";

const MonacoEditor = lazy(() => import("@/features/code-editor/components/MonacoFromCDN"));
const menus = ["File", "Edit", "View", "Run", "Terminal", "Settings"];

const TreeNode = memo(function TreeNode({ node, depth }: { node: FileNode; depth: number }) {
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const expanded = useFilesStore((s) => s.expanded);
  const toggleFolder = useFilesStore((s) => s.toggleFolder);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);
  const createFile = useFilesStore((s) => s.createFile);
  const createFolder = useFilesStore((s) => s.createFolder);
  const renameNode = useFilesStore((s) => s.renameNode);
  const deleteNode = useFilesStore((s) => s.deleteNode);
  const isFolder = node.type === "folder";
  const isOpen = expanded.includes(node.id);

  return (
    <div>
      <div className={`ce-tree-row ${activeFileId === node.id ? "active" : ""}`} style={{ paddingLeft: `${depth * 12 + 8}px` }}>
        <button className="ce-tree-name" onClick={() => (isFolder ? toggleFolder(node.id) : setActiveFile(node.id))}>
          {isFolder ? (isOpen ? "▾" : "▸") : "•"} {node.name}
        </button>
        <div className="ce-tree-actions">
          {isFolder && <button onClick={() => { const name = window.prompt("File name", "new-file.ts"); if (name) createFile(node.id, name); }}>+F</button>}
          {isFolder && <button onClick={() => { const name = window.prompt("Folder name", "new-folder"); if (name) createFolder(node.id, name); }}>+D</button>}
          <button onClick={() => { const name = window.prompt("Rename", node.name); if (name) renameNode(node.id, name); }}>Ren</button>
          <button onClick={() => deleteNode(node.id)}>Del</button>
        </div>
      </div>
      {isFolder && isOpen && node.children?.map((child) => <TreeNode key={child.id} node={child} depth={depth + 1} />)}
    </div>
  );
});

const PreviewPane = memo(({ srcDoc }: { srcDoc: string }) => (
  <iframe className="ce-preview" title="preview" srcDoc={srcDoc} />
));

export const CodeEditorLayout = () => {
  const tree = useFilesStore((s) => s.tree);
  const openTabs = useFilesStore((s) => s.openTabs);
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);
  const closeTab = useFilesStore((s) => s.closeTab);
  const updateContent = useFilesStore((s) => s.updateContent);

  const dirty = useEditorStore((s) => s.dirty);
  const markDirty = useEditorStore((s) => s.markDirty);
  const logs = useEditorStore((s) => s.logs);
  const clearLogs = useEditorStore((s) => s.clearLogs);
  const pushLog = useEditorStore((s) => s.pushLog);
  const commandPaletteOpen = useEditorStore((s) => s.commandPaletteOpen);
  const toggleCommandPalette = useEditorStore((s) => s.toggleCommandPalette);
  const closeCommandPalette = useEditorStore((s) => s.closeCommandPalette);

  const { leftOpen, rightOpen, terminalOpen, leftWidth, rightWidth, terminalHeight, toggleLeft, toggleRight, toggleTerminal, setLeftWidth, setRightWidth, setTerminalHeight } = useLayoutStore();

  const files = useMemo(() => selectFiles(tree), [tree]);
  const treeNodes = useMemo(() => tree.map((node) => <TreeNode key={node.id} node={node} depth={0} />), [tree]);
  const activeFile = files.find((f) => f.id === activeFileId) ?? null;
  const tabs = openTabs.map((id) => files.find((f) => f.id === id)).filter(Boolean) as FileNode[];
  const previewDoc = useMemo(() => `<html><body style='background:#111;color:#eee;font-family:sans-serif'>${activeFile?.content ?? ""}</body></html>`, [activeFile?.content]);
  const saveTimer = useRef<number | null>(null);

  const handleChange = (value: string) => {
    if (!activeFile) return;
    updateContent(activeFile.id, value);
    markDirty(activeFile.id, true);
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      markDirty(activeFile.id, false);
      pushLog(`Auto-saved: ${activeFile.name}`);
    }, 800);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.ctrlKey) return;
      const key = e.key.toLowerCase();
      if (key === "s") { e.preventDefault(); if (activeFile) { markDirty(activeFile.id, false); pushLog(`Saved: ${activeFile.name}`); } }
      if (key === "b") { e.preventDefault(); toggleLeft(); }
      if (e.key === "`") { e.preventDefault(); toggleTerminal(); }
      if (key === "p") { e.preventDefault(); toggleCommandPalette(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeFile, markDirty, pushLog, toggleLeft, toggleTerminal, toggleCommandPalette]);

  return (
    <section className="ce-root">
      <header className="ce-menu" role="navigation" aria-label="Code editor menu">{menus.map((m) => <button key={m}>{m}</button>)}</header>
      <div className="ce-main" style={{ gridTemplateColumns: `${leftOpen ? `${leftWidth}px` : "0px"} minmax(0,1fr) ${rightOpen ? `${rightWidth}px` : "0px"}` }}>
        <aside className="ce-left">{leftOpen && <><div className="ce-pane-header">Explorer<button onClick={() => useFilesStore.getState().createFile(null, `file-${Date.now()}.ts`)}>New File</button></div><div className="ce-tree">{treeNodes}</div><div className="ce-resizer-x" onPointerDown={(e) => { const start = e.clientX; const width = leftWidth; const move = (ev: PointerEvent) => setLeftWidth(Math.max(180, Math.min(420, width + ev.clientX - start))); const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); }; window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); }} /></>}</aside>
        <main className="ce-center">
          <div className="ce-tabs">
            {tabs.map((tab) => (
              <motion.div key={tab.id} layout className={`ce-tab ${tab.id === activeFileId ? "active" : ""}`} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <button onClick={() => setActiveFile(tab.id)}>{tab.name}{dirty[tab.id] ? " •" : ""}</button>
                <button onClick={() => closeTab(tab.id)} aria-label={`Close ${tab.name}`}>x</button>
              </motion.div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeFile?.id ?? "empty"} className="ce-editor-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {activeFile ? <Suspense fallback={<div className="ce-loading">Loading Monaco...</div>}><MonacoEditor file={activeFile} onChange={handleChange} /></Suspense> : <div className="ce-loading">No file selected.</div>}
            </motion.div>
          </AnimatePresence>
        </main>
        <aside className="ce-right">{rightOpen && <><div className="ce-pane-header">Preview</div><PreviewPane srcDoc={previewDoc} /><div className="ce-resizer-x left" onPointerDown={(e) => { const start = e.clientX; const width = rightWidth; const move = (ev: PointerEvent) => setRightWidth(Math.max(240, Math.min(620, width - (ev.clientX - start)))); const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); }; window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); }} /></>}</aside>
      </div>
      <section className="ce-terminal" style={{ height: terminalOpen ? `${terminalHeight}px` : "0px" }}>
        {terminalOpen && <><div className="ce-resizer-y" onPointerDown={(e) => { const start = e.clientY; const height = terminalHeight; const move = (ev: PointerEvent) => setTerminalHeight(Math.max(120, Math.min(360, height - (ev.clientY - start)))); const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); }; window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); }} /><div className="ce-pane-header">Terminal<div><button onClick={clearLogs}>Clear</button><button onClick={toggleTerminal}>Hide</button><button onClick={toggleRight}>Toggle Preview</button></div></div><div className="ce-logs">{logs.map((log) => <div key={log.id}>{log.text}</div>)}</div></>}
      </section>
      {commandPaletteOpen && <div className="ce-modal-backdrop" onClick={closeCommandPalette}><div className="ce-modal" onClick={(e) => e.stopPropagation()}>Command Palette (placeholder)</div></div>}
    </section>
  );
};
