import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const TabBar = ({ files, activeFileId, onSelectFile, onAddFile, onRemoveFile }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/25 p-2">
      {files.map((file) => {
        const isActive = file.id === activeFileId;

        return (
          <motion.button
            key={file.id}
            type="button"
            whileHover={{ y: -1 }}
            onClick={() => onSelectFile(file.id)}
            className={cn(
              "group flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-colors",
              isActive ? "border-[#FF3B30] bg-[#FF3B30]/15 text-white" : "border-white/10 bg-white/5 text-white/70 hover:text-white"
            )}
          >
            <span>{file.name}</span>
            {files.length > 1 && (
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  onRemoveFile(file.id);
                }}
                className="rounded p-0.5 text-white/60 hover:bg-[#FF3B30]/25 hover:text-white"
                aria-label={`Remove ${file.name}`}
                role="button"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
          </motion.button>
        );
      })}

      <button
        type="button"
        onClick={onAddFile}
        className="inline-flex items-center gap-1 rounded-lg border border-dashed border-white/20 px-2 py-1.5 text-xs text-white/70 transition-colors hover:border-[#FF3B30]/55 hover:text-white"
      >
        <Plus className="h-3.5 w-3.5" /> Add File
      </button>
    </div>
  );
};
