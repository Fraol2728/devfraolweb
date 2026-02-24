import { useState } from "react";

const MENU_MAP = {
  File: [
    { id: "file-new", label: "New File", shortcut: "Ctrl+N" },
    { id: "file-new-folder", label: "New Folder" },
    { id: "file-save", label: "Save", shortcut: "Ctrl+S" },
  ],
  Edit: [
    { id: "edit-undo", label: "Undo", shortcut: "Ctrl+Z" },
    { id: "edit-redo", label: "Redo", shortcut: "Ctrl+Y" },
    { id: "edit-copy", label: "Copy", shortcut: "Ctrl+C" },
    { id: "edit-paste", label: "Paste", shortcut: "Ctrl+V" },
  ],
  View: [
    { id: "view-toggle-explorer", label: "Toggle Explorer" },
    { id: "view-toggle-terminal", label: "Toggle Terminal" },
  ],
  Run: [{ id: "run-python", label: "Run Code", shortcut: "Ctrl+Enter" }],
  Help: [{ id: "help-about", label: "IDE Help" }],
};

export const MenuBar = ({ onAction }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="py-menu-bar border-b border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-200">
      <div className="flex items-center gap-2">
        {Object.keys(MENU_MAP).map((menuName) => (
          <div key={menuName} className="relative" onMouseLeave={() => setOpenMenu(null)}>
            <button type="button" className="rounded px-2 py-1 hover:bg-zinc-700" onClick={() => setOpenMenu(openMenu === menuName ? null : menuName)}>{menuName}</button>
            {openMenu === menuName ? (
              <div className="absolute left-0 top-full z-50 mt-1 min-w-56 border border-zinc-700 bg-zinc-900 py-1 shadow-xl">
                {MENU_MAP[menuName].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-zinc-700"
                    onClick={() => {
                      onAction(item.id);
                      setOpenMenu(null);
                    }}
                  >
                    <span>{item.label}</span>
                    {item.shortcut ? <small className="text-zinc-400">{item.shortcut}</small> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </header>
  );
};
