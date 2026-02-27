import { useState } from "react";

const MENUS = ["File", "Edit", "View", "Run", "Terminal", "Help"];

export const MenuBar = ({ onAction }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const menuItems = {
    File: [
      { label: "New File", action: "new-file" },
      { label: "Save", action: "save" },
      { label: "Delete", action: "delete" },
    ],
    Edit: [{ label: "Find", action: "find" }],
    View: [
      { label: "Toggle Explorer", action: "toggle-left" },
      { label: "Toggle Preview", action: "toggle-right" },
    ],
    Run: [{ label: "Execute code", action: "run" }],
    Terminal: [{ label: "Toggle terminal", action: "toggle-terminal" }],
    Help: [{ label: "Keyboard shortcuts", action: "help" }],
  };

  return (
    <div className="flex h-10 items-center gap-2 border-b border-zinc-700 bg-zinc-800 px-3 text-sm dark:bg-zinc-900 dark:text-zinc-100">
      {MENUS.map((menu) => (
        <div key={menu} className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu((current) => (current === menu ? null : menu))}
            className="rounded px-2 py-1 text-zinc-200 hover:bg-zinc-700 dark:hover:bg-zinc-800"
          >
            {menu}
          </button>

          {openMenu === menu && (
            <div className="absolute left-0 top-9 z-20 w-44 rounded border border-zinc-700 bg-zinc-800 p-1 shadow-lg dark:bg-zinc-900">
              {menuItems[menu].map((item) => (
                <button
                  key={item.action}
                  type="button"
                  onClick={() => {
                    onAction(item.action);
                    setOpenMenu(null);
                  }}
                  className="block w-full rounded px-2 py-1.5 text-left text-sm text-zinc-100 hover:bg-zinc-700"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
