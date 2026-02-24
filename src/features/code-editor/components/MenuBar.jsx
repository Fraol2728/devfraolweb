import { useState } from "react";

const MENU_MAP = {
  File: [
    { id: "file-new", label: "New", shortcut: "Ctrl+N" },
    { id: "file-save", label: "Save", shortcut: "Ctrl+S" },
    { id: "file-save-as", label: "Save As", shortcut: "Ctrl+Shift+S" },
    { id: "file-save-all", label: "Save All" },
    { id: "file-new-project", label: "New Project" },
  ],
  Edit: [
    { id: "edit-undo", label: "Undo", shortcut: "Ctrl+Z" },
    { id: "edit-redo", label: "Redo", shortcut: "Ctrl+Y" },
    { id: "edit-find", label: "Find", shortcut: "Ctrl+F" },
  ],
  View: [
    { id: "view-toggle-terminal", label: "Toggle Terminal" },
    { id: "view-toggle-explorer", label: "Toggle Explorer" },
  ],
  Run: [{ id: "run-python", label: "Run Python Code", shortcut: "Ctrl+Enter" }],
};

export const MenuBar = ({ onAction }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="py-menu-bar">
      {Object.keys(MENU_MAP).map((menuName) => (
        <div key={menuName} className="py-menu-item" onMouseLeave={() => setOpenMenu(null)}>
          <button type="button" onClick={() => setOpenMenu(openMenu === menuName ? null : menuName)}>
            {menuName}
          </button>
          {openMenu === menuName && (
            <div className="py-menu-dropdown">
              {MENU_MAP[menuName].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onAction(item.id);
                    setOpenMenu(null);
                  }}
                >
                  <span>{item.label}</span>
                  {item.shortcut ? <small>{item.shortcut}</small> : null}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </header>
  );
};
