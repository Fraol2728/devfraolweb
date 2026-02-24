import { useFilesStore } from "@/features/code-editor/stores/useFilesStore";

const Node = ({ node, depth }) => {
  const expanded = useFilesStore((s) => s.expanded);
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const toggleFolder = useFilesStore((s) => s.toggleFolder);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);
  const createFile = useFilesStore((s) => s.createFile);
  const createFolder = useFilesStore((s) => s.createFolder);
  const renameNode = useFilesStore((s) => s.renameNode);
  const deleteNode = useFilesStore((s) => s.deleteNode);

  const isFolder = node.type === "folder";
  const isExpanded = expanded.includes(node.id);

  return (
    <div>
      <div className={`py-tree-row ${activeFileId === node.id ? "active" : ""}`} style={{ paddingLeft: `${depth * 14 + 10}px` }}>
        <button type="button" className="py-tree-node" onClick={() => (isFolder ? toggleFolder(node.id) : setActiveFile(node.id))}>
          <span>{isFolder ? (isExpanded ? "📂" : "📁") : "📄"}</span>
          <span>{node.name}</span>
        </button>
        <div className="py-tree-actions">
          {isFolder ? (
            <>
              <button type="button" onClick={() => { const next = window.prompt("New file name", "new_file.py"); if (next) createFile(node.id, next); }}>+F</button>
              <button type="button" onClick={() => { const next = window.prompt("New folder name", "new_folder"); if (next) createFolder(node.id, next); }}>+D</button>
            </>
          ) : null}
          <button type="button" onClick={() => { const next = window.prompt("Rename", node.name); if (next) renameNode(node.id, next); }}>Ren</button>
          <button type="button" onClick={() => deleteNode(node.id)}>Del</button>
        </div>
      </div>
      {isFolder && isExpanded ? node.children?.map((child) => <Node key={child.id} node={child} depth={depth + 1} />) : null}
    </div>
  );
};

export const FileExplorer = () => {
  const tree = useFilesStore((s) => s.tree);
  const createFile = useFilesStore((s) => s.createFile);
  const createFolder = useFilesStore((s) => s.createFolder);

  return (
    <aside className="py-explorer">
      <div className="py-explorer-header">
        <span>Explorer</span>
        <div>
          <button type="button" onClick={() => { const next = window.prompt("New root file", "main.py"); if (next) createFile(null, next); }}>+File</button>
          <button type="button" onClick={() => { const next = window.prompt("New root folder", "project"); if (next) createFolder(null, next); }}>+Folder</button>
        </div>
      </div>
      <div className="py-tree-scroll">{tree.map((node) => <Node key={node.id} node={node} depth={0} />)}</div>
    </aside>
  );
};
