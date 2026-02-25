import { useFilesStore } from "@/features/code-editor/stores/useFilesStore";

const Node = ({ node, depth, onOpenContextMenu }) => {
  const expanded = useFilesStore((s) => s.expanded);
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const toggleFolder = useFilesStore((s) => s.toggleFolder);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);

  const isFolder = node.type === "folder";
  const isExpanded = expanded.includes(node.id);

  return (
    <div>
      <div
        className={`py-tree-row ${activeFileId === node.id ? "active" : ""}`}
        style={{ paddingLeft: `${depth * 14 + 10}px` }}
        onContextMenu={(event) => onOpenContextMenu(event, node.id)}
      >
        <button type="button" className="py-tree-node" onClick={() => (isFolder ? toggleFolder(node.id) : setActiveFile(node.id))}>
          <span>{isFolder ? (isExpanded ? "📂" : "📁") : "📄"}</span>
          <span>{node.name}</span>
        </button>
      </div>
      {isFolder && isExpanded ? node.children?.map((child) => <Node key={child.id} node={child} depth={depth + 1} onOpenContextMenu={onOpenContextMenu} />) : null}
    </div>
  );
};

export const FileExplorer = ({ onOpenContextMenu }) => {
  const tree = useFilesStore((s) => s.tree);
  const createFile = useFilesStore((s) => s.createFile);
  const createFolder = useFilesStore((s) => s.createFolder);

  return (
    <aside className="py-explorer" onContextMenu={(event) => onOpenContextMenu(event, null)}>
      <div className="py-explorer-actions">
        <button type="button" onClick={() => { const next = window.prompt("New root file", "main.py"); if (next) createFile(null, next); }}>+File</button>
        <button type="button" onClick={() => { const next = window.prompt("New root folder", "project"); if (next) createFolder(null, next); }}>+Folder</button>
      </div>
      <div className="py-tree-scroll">{tree.map((node) => <Node key={node.id} node={node} depth={0} onOpenContextMenu={onOpenContextMenu} />)}</div>
    </aside>
  );
};
