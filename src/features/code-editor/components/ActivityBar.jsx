const ITEMS = [
  { id: "explorer", label: "Explorer", icon: "📁" },
  { id: "search", label: "Search", icon: "🔍" },
  { id: "git", label: "Source Control", icon: "⑂" },
  { id: "extensions", label: "Extensions", icon: "🧩" },
];

export const ActivityBar = ({ activeItem = "explorer", onChange }) => (
  <aside className="vsc-activity-bar" aria-label="VS Code activity bar">
    {ITEMS.map((item) => (
      <button
        key={item.id}
        type="button"
        className={`vsc-activity-item ${activeItem === item.id ? "active" : ""}`}
        onClick={() => onChange?.(item.id)}
        title={item.label}
        aria-label={item.label}
      >
        <span>{item.icon}</span>
      </button>
    ))}
  </aside>
);
