import { useState } from "react";

const ITEMS = [
  { id: "explorer", label: "Explorer", icon: "📁" },
  { id: "search", label: "Search", icon: "🔍" },
  { id: "git", label: "Source Control", icon: "⑂" },
  { id: "extensions", label: "Extensions", icon: "🧩" },
];

export const ActivityBar = ({ activeItem = "explorer", onChange }) => {
  const [active, setActive] = useState(activeItem);

  const handleSelect = (id) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <aside className="vsc-activity-bar" aria-label="VS Code activity bar">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`vsc-activity-item ${active === item.id ? "active" : ""}`}
          onClick={() => handleSelect(item.id)}
          title={item.label}
          aria-label={item.label}
        >
          <span>{item.icon}</span>
        </button>
      ))}
    </aside>
  );
};
