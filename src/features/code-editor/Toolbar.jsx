import { Copy, Download, Moon, Redo2, RefreshCw, Sun, Undo2 } from "lucide-react";

const toolbarButton =
  "inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 transition-all hover:-translate-y-0.5 hover:border-[#FF3B30]/55 hover:text-white";

export const Toolbar = ({
  isDarkMode,
  onToggleTheme,
  onRun,
  onUndo,
  onRedo,
  onCopy,
  onDownload,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={onRun} className={toolbarButton}>
        <RefreshCw className="h-3.5 w-3.5" /> Run / Refresh
      </button>
      <button type="button" onClick={onUndo} className={toolbarButton}>
        <Undo2 className="h-3.5 w-3.5" /> Undo
      </button>
      <button type="button" onClick={onRedo} className={toolbarButton}>
        <Redo2 className="h-3.5 w-3.5" /> Redo
      </button>
      <button type="button" onClick={onCopy} className={toolbarButton}>
        <Copy className="h-3.5 w-3.5" /> Copy
      </button>
      <button type="button" onClick={onDownload} className={toolbarButton}>
        <Download className="h-3.5 w-3.5" /> Download
      </button>
      <button type="button" onClick={onToggleTheme} className={toolbarButton}>
        {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />} Theme: {isDarkMode ? "Dark" : "Light"}
      </button>
    </div>
  );
};
