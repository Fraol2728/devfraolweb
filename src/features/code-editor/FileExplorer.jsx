import { FileCode2, FileJson, FileText, Folder, FolderOpen, Trash2 } from "lucide-react";

const getIcon = (name) => {
  const extension = name.split(".").pop()?.toLowerCase();
  if (extension === "html") return <FileCode2 className="h-4 w-4 text-orange-400" />;
  if (extension === "css") return <FileJson className="h-4 w-4 text-blue-400" />;
  if (extension === "js") return <FileJson className="h-4 w-4 text-yellow-400" />;
  if (extension === "php") return <FileText className="h-4 w-4 text-indigo-400" />;
  if (extension === "py") return <FileText className="h-4 w-4 text-emerald-400" />;
  return <FileText className="h-4 w-4 text-zinc-400" />;
};

const TreeNode = ({ node, depth, expandedFolders, onToggleFolder, onOpenFile, activeFileId, onCreateFile, onCreateFolder, onRename, onDelete }) => {
  const isFolder = node.type === "folder";
  const isExpanded = expandedFolders.includes(node.id);

  return (
    <div>
      <div
        className={`group flex items-center justify-between rounded px-2 py-1 text-sm ${
          node.id === activeFileId ? "bg-[#FF3B30]/20 text-[#FF3B30]" : "text-zinc-300 hover:bg-zinc-800"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
          onClick={() => (isFolder ? onToggleFolder(node.id) : onOpenFile(node.id))}
        >
          {isFolder ? (isExpanded ? <FolderOpen className="h-4 w-4 text-zinc-300" /> : <Folder className="h-4 w-4 text-zinc-400" />) : getIcon(node.name)}
          <span className="truncate">{node.name}</span>
        </button>

        <div className="hidden items-center gap-1 group-hover:flex">
          {isFolder && (
            <>
              <button type="button" onClick={() => onCreateFile(node.id)} className="text-xs text-zinc-400 hover:text-zinc-200">+F</button>
              <button type="button" onClick={() => onCreateFolder(node.id)} className="text-xs text-zinc-400 hover:text-zinc-200">+D</button>
            </>
          )}
          <button type="button" onClick={() => onRename(node.id)} className="text-xs text-zinc-400 hover:text-zinc-200">Ren</button>
          <button type="button" onClick={() => onDelete(node.id)} className="text-zinc-500 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      {isFolder && isExpanded && node.children?.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          expandedFolders={expandedFolders}
          onToggleFolder={onToggleFolder}
          onOpenFile={onOpenFile}
          activeFileId={activeFileId}
          onCreateFile={onCreateFile}
          onCreateFolder={onCreateFolder}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export const FileExplorer = ({ nodes, activeFileId, expandedFolders, setExpandedFolders, onOpenFile, onCreateFile, onCreateFolder, onRename, onDelete }) => {
  const toggleFolder = (id) => {
    setExpandedFolders((prev) => (prev.includes(id) ? prev.filter((folderId) => folderId !== id) : [...prev, id]));
  };

  return (
    <div className="h-full overflow-auto bg-zinc-800 p-2 dark:bg-[#252526]">
      <div className="mb-2 flex items-center justify-between px-1 text-xs uppercase tracking-wider text-zinc-400">
        <span>Explorer</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onCreateFile(null)} className="hover:text-zinc-200">+File</button>
          <button type="button" onClick={() => onCreateFolder(null)} className="hover:text-zinc-200">+Folder</button>
        </div>
      </div>

      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          depth={0}
          expandedFolders={expandedFolders}
          onToggleFolder={toggleFolder}
          onOpenFile={onOpenFile}
          activeFileId={activeFileId}
          onCreateFile={onCreateFile}
          onCreateFolder={onCreateFolder}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
