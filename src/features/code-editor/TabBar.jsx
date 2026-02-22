import { X } from "lucide-react";

export const TabBar = ({ tabs, activeFileId, onSelectFile, onCloseTab }) => (
  <div className="flex h-10 items-center gap-1 overflow-x-auto border-b border-zinc-700 bg-zinc-800 px-2 dark:bg-zinc-900">
    {tabs.map((file) => {
      const isActive = file.id === activeFileId;
      return (
        <button
          key={file.id}
          type="button"
          onClick={() => onSelectFile(file.id)}
          className={`group flex items-center gap-2 rounded px-3 py-1.5 text-xs ${
            isActive ? "bg-zinc-700 text-[#FF3B30]" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          <span>{file.name}</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation();
              onCloseTab(file.id);
            }}
            className="text-zinc-500 hover:text-zinc-200"
          >
            <X className="h-3 w-3" />
          </span>
        </button>
      );
    })}
  </div>
);
