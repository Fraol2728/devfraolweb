const CATEGORY_ORDER = ["Programming", "Graphics Design", "Operate Computer"];

export const CategoryFilter = ({ activeCategory, onChange, counts = {} }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORY_ORDER.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "border-[#ff3b30] bg-[#ff3b30] text-white shadow-[0_0_20px_rgba(255,59,48,0.35)]"
                : "border-white/20 bg-white/5 text-foreground/80 hover:border-[#ff3b30]/50"
            } ${category === "Programming" ? "ring-1 ring-[#ff3b30]/25" : ""}`}
          >
            {category}
            <span className="ml-2 text-xs opacity-80">({counts[category] ?? 0})</span>
          </button>
        );
      })}
    </div>
  );
};
