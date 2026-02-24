import { lazy, Suspense, useState } from "react";

const MonacoEditor = lazy(() => import("@/features/code-editor/components/MonacoFromCDN"));

export const EditorPane = ({ activeFile, tabs, onTabSwitch, onTabClose, onChange, onTabReorder, onEditorReady }) => {
  const [dragIndex, setDragIndex] = useState(null);

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
      <div className="py-editor-body">
        {activeFile ? (
          <Suspense fallback={<div className="py-empty-state">Loading Monaco…</div>}>
            <MonacoEditor file={activeFile} onChange={(value) => onChange(activeFile.id, value)} onEditorReady={onEditorReady} />
          </Suspense>
        ) : (
          <div className="py-empty-state">Open a file from Explorer to start coding.</div>
        )}
      </div>
    </main>
  );
};
