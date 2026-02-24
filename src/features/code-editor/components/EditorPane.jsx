import { lazy, Suspense } from "react";

const MonacoEditor = lazy(() => import("@/features/code-editor/components/MonacoFromCDN"));

export const EditorPane = ({ activeFile, tabs, onTabSwitch, onTabClose, onChange }) => (
  <main className="py-editor-pane">
    <div className="py-tabs">
      {tabs.map((tab) => (
        <div key={tab.id} className={`py-tab ${activeFile?.id === tab.id ? "active" : ""}`}>
          <button type="button" onClick={() => onTabSwitch(tab.id)}>{tab.name}</button>
          <button type="button" onClick={() => onTabClose(tab.id)}>×</button>
        </div>
      ))}
    </div>
    <div className="py-editor-body">
      {activeFile ? (
        <Suspense fallback={<div className="py-empty-state">Loading Monaco…</div>}>
          <MonacoEditor file={activeFile} onChange={(value) => onChange(activeFile.id, value)} />
        </Suspense>
      ) : (
        <div className="py-empty-state">Open a file from Explorer to start coding.</div>
      )}
    </div>
  </main>
);
