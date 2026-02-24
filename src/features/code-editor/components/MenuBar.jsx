import { useState } from "react";

const MENU_MAP = {
  File: [
    { id: "file-new", label: "New" },
    { id: "file-open", label: "Open" },
    { id: "file-save", label: "Save" },
    { id: "file-save-as", label: "Save As" },
  ],
  Edit: [
    { id: "edit-undo", label: "Undo" },
    { id: "edit-redo", label: "Redo" },
    { id: "edit-copy", label: "Copy" },
    { id: "edit-paste", label: "Paste" },
  ],
  View: [{ id: "view-toggle-terminal", label: "Toggle Terminal" }],
  Run: [{ id: "run-python", label: "Run Python Code" }],
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
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </header>
  );
};
