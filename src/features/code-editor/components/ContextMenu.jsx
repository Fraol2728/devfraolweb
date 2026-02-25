import { useEffect, useMemo, useRef } from "react";
import { useContextMenuStore } from "@/features/code-editor/stores/useContextMenuStore";

export const ContextMenu = ({ onAction }) => {
  const { visible, x, y, type, close } = useContextMenuStore();
  const menuRef = useRef(null);

  const items = useMemo(() => {
    if (type === "explorer") {
      return [
        { id: "explorer-open", label: "Open" },
        { id: "explorer-rename", label: "Rename" },
        { id: "explorer-delete", label: "Delete" },
        { id: "explorer-new-file", label: "New File" },
        { id: "explorer-new-folder", label: "New Folder" },
      ];
    }
    if (type === "editor") {
      return [
        { id: "editor-run", label: "Run Code" },
        { id: "editor-format", label: "Format Document" },
      ];
    }
    return [];
  }, [type]);

  useEffect(() => {
    if (!visible) return undefined;

    const onDocumentMouseDown = (event) => {
      if (menuRef.current?.contains(event.target)) return;
      close();
    };

    const onEscape = (event) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("mousedown", onDocumentMouseDown);
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("mousedown", onDocumentMouseDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, [close, visible]);

  if (!visible || !type) return null;

  return (
    <div
      ref={menuRef}
      className="vsc-context-menu"
      style={{ left: `${x}px`, top: `${y}px` }}
      role="menu"
      aria-label={`${type} context menu`}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="vsc-context-menu-item"
          onClick={() => {
            onAction(item.id);
            close();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
