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

export const MenuBar = ({ onAction, projects, currentProjectId, onProjectChange, runtimeLabel }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="py-menu-bar">
      <div className="py-menu-left">
        {Object.keys(MENU_MAP).map((menuName) => (
          <div key={menuName} className="py-menu-item" onMouseLeave={() => setOpenMenu(null)}>
            <button type="button" className={openMenu === menuName ? "is-active" : ""} onClick={() => setOpenMenu(openMenu === menuName ? null : menuName)}>
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
      </div>
      <div className="py-menu-right">
        <label>
          Project:
          <select value={currentProjectId} onChange={(event) => onProjectChange(event.target.value)}>
            {Object.values(projects).map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
          </select>
        </label>
        <span>{runtimeLabel}</span>
      </div>
    </header>
  );
};
