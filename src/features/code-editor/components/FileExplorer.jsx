import { forwardRef, useEffect, useRef, useState } from "react";
import { useFilesStore } from "@/features/code-editor/stores/useFilesStore";

const promptName = (label, fallback) => {
  const value = window.prompt(label, fallback);
  return value?.trim() || null;
};

const FileTreeNode = ({ node, depth }) => {
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const expanded = useFilesStore((s) => s.expanded);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);
  const toggleFolder = useFilesStore((s) => s.toggleFolder);
  const createFile = useFilesStore((s) => s.createFile);
  const createFolder = useFilesStore((s) => s.createFolder);
  const renameNode = useFilesStore((s) => s.renameNode);
  const deleteNode = useFilesStore((s) => s.deleteNode);

  const [menuPos, setMenuPos] = useState(null);
  const isFolder = node.type === "folder";
  const isExpanded = expanded.includes(node.id);

  useEffect(() => {
    if (!menuPos) return;
    const close = () => setMenuPos(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuPos]);

  return (
    <div>
      <div
        className={`py-tree-row ${activeFileId === node.id ? "active" : ""}`}
        style={{ paddingLeft: `${depth * 14 + 10}px` }}
        onContextMenu={(event) => {
          event.preventDefault();
          setMenuPos({ x: event.clientX, y: event.clientY });
        }}
      >
        <button type="button" className="py-tree-node" onClick={() => (isFolder ? toggleFolder(node.id) : setActiveFile(node.id))}>
          <span>{isFolder ? (isExpanded ? "📂" : "📁") : "📄"}</span>
          <span>{node.name}</span>
        </button>
      </div>

      {menuPos ? (
        <div className="fixed z-50 min-w-40 border border-zinc-700 bg-zinc-900 text-xs shadow-xl" style={{ left: menuPos.x, top: menuPos.y }}>
          <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-zinc-700" onClick={() => {
            const name = promptName("New file name", "new_file.py");
            if (name) createFile(isFolder ? node.id : null, name);
            setMenuPos(null);
          }}>New File</button>
          <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-zinc-700" onClick={() => {
            const name = promptName("New folder name", "new_folder");
            if (name) createFolder(isFolder ? node.id : null, name);
            setMenuPos(null);
          }}>New Folder</button>
          <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-zinc-700" onClick={() => {
            const name = promptName("Rename", node.name);
            if (name) renameNode(node.id, name);
            setMenuPos(null);
          }}>Rename</button>
          <button type="button" className="block w-full px-3 py-1.5 text-left text-red-400 hover:bg-zinc-700" onClick={() => {
            deleteNode(node.id);
            setMenuPos(null);
          }}>Delete</button>
        </div>
      ) : null}

      {isFolder && isExpanded ? node.children?.map((child) => <FileTreeNode key={child.id} node={child} depth={depth + 1} />) : null}
    </div>
  );
};

export const FileExplorer = forwardRef(function FileExplorer(_, ref) {
  const tree = useFilesStore((s) => s.tree);
  const createFile = useFilesStore((s) => s.createFile);
  const createFolder = useFilesStore((s) => s.createFolder);
  const containerRef = useRef(null);

  return (
    <aside ref={(node) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }} className="py-explorer" tabIndex={-1}>
      <div className="py-explorer-actions">
        <button type="button" onClick={() => { const name = promptName("New root file", "main.py"); if (name) createFile(null, name); }}>+File</button>
        <button type="button" onClick={() => { const name = promptName("New root folder", "project"); if (name) createFolder(null, name); }}>+Folder</button>
      </div>
      <div className="py-tree-scroll">{tree.map((node) => <FileTreeNode key={node.id} node={node} depth={0} />)}</div>
    </aside>
  );
});
