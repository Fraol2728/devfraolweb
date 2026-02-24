import { lazy, Suspense, useEffect, useState } from "react";

const MonacoEditor = lazy(() => import("@/features/code-editor/components/MonacoFromCDN"));

export const EditorPane = ({ activeFile, tabs, onTabSwitch, onTabClose, onChange, onTabReorder, onEditorReady, onRunCode, onCopyAll, onClearEditor }) => {
  const [dragIndex, setDragIndex] = useState(null);
  const [menuPos, setMenuPos] = useState(null);

  useEffect(() => {
    if (!menuPos) return;
    const close = () => setMenuPos(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuPos]);

  return (
    <main className="py-editor-pane">
      <div className="py-tabs">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null) onTabReorder?.(dragIndex, index);
              setDragIndex(null);
            }}
            className={`py-tab ${activeFile?.id === tab.id ? "active" : ""}`}
          >
            <button type="button" onClick={() => onTabSwitch(tab.id)}>{tab.name}</button>
            <button type="button" onClick={() => onTabClose(tab.id)}>×</button>
          </div>
        ))}
      </div>
      <div
        className="py-editor-body"
        onContextMenu={(event) => {
          if ((event.target).closest?.("textarea, .monaco-editor")) return;
          event.preventDefault();
          setMenuPos({ x: event.clientX, y: event.clientY });
        }}
      >
        {activeFile ? (
          <Suspense fallback={<div className="py-empty-state">Loading Monaco…</div>}>
            <MonacoEditor file={activeFile} onChange={(value) => onChange(activeFile.id, value)} onEditorReady={onEditorReady} />
          </Suspense>
        ) : (
          <div className="py-empty-state">Open a file from Explorer to start coding.</div>
        )}
      </div>
      {menuPos ? (
        <div className="fixed z-50 min-w-40 border border-zinc-700 bg-zinc-900 text-xs shadow-xl" style={{ left: menuPos.x, top: menuPos.y }}>
          <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-zinc-700" onClick={() => { onRunCode?.(); setMenuPos(null); }}>Run Code</button>
          <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-zinc-700" onClick={() => { onCopyAll?.(); setMenuPos(null); }}>Copy All</button>
          <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-zinc-700" onClick={() => { onClearEditor?.(); setMenuPos(null); }}>Clear Editor</button>
        </div>
      ) : null}
    </main>
  );
};
