import { useState } from "react";

const MENU_MAP = {
  File: [
    { id: "file-new", label: "New File" },
    { id: "file-new-folder", label: "New Folder" },
    { id: "file-close-tab", label: "Close Tab" },
  ],
  View: [
    { id: "view-toggle-sidebar", label: "Toggle Sidebar" },
    { id: "view-toggle-terminal", label: "Toggle Terminal" },
  ],
  Run: [{ id: "run-code", label: "Run Code" }],
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
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </header>
  );
};
