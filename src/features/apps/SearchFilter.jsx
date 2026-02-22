import { Search } from "lucide-react";

export const SearchFilter = ({ query, onQueryChange, activeCategory, onCategoryChange, categories }) => {
  return (
    <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search apps by name or use case"
          className="w-full rounded-xl border border-border/80 bg-background/60 py-2.5 pl-9 pr-3 text-sm text-foreground outline-none transition-colors duration-300 focus:border-[#FF3B30]/70"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-3 py-2 text-xs font-semibold transition-all duration-300 ${
              activeCategory === category
                ? "bg-[#FF3B30] text-white shadow-[0_8px_18px_rgba(255,59,48,0.35)]"
                : "border border-border text-foreground/75 hover:border-[#FF3B30]/55 hover:text-[#FF3B30]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};
