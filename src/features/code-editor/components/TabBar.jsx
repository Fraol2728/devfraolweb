import { useState } from "react";

export const TabBar = ({ tabs, activeFile, onTabSwitch, onTabClose, onTabReorder }) => {
  const [dragIndex, setDragIndex] = useState(null);

  return (
    <div className="vsc-tab-bar">
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={`vsc-tab ${activeFile?.id === tab.id ? "active" : ""}`}
          draggable
          onDragStart={() => setDragIndex(index)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => {
            if (dragIndex !== null) onTabReorder?.(dragIndex, index);
            setDragIndex(null);
          }}
        >
          <button type="button" className="vsc-tab-name" onClick={() => onTabSwitch(tab.id)}>
            {tab.name}
          </button>
          <button type="button" className="vsc-tab-close" onClick={() => onTabClose(tab.id)} aria-label={`Close ${tab.name}`}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
