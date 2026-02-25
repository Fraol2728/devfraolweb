import { motion } from "framer-motion";

export const CourseFilter = ({ categories, levels, activeCategory, activeLevel, onCategoryChange, onLevelChange }) => {
  return (
    <div className="glass-panel rounded-2xl border border-white/15 p-4 shadow-[0_18px_40px_rgba(8,12,30,0.2)] backdrop-blur-xl sm:p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <motion.button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive ? "text-white" : "text-foreground/70 hover:text-foreground"
              }`}
              whileTap={{ scale: 0.96 }}
            >
              {isActive ? (
                <motion.span
                  layoutId="active-category-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#ff564c] to-[#ff3b30]"
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
              ) : null}
              {category}
            </motion.button>
          );
        })}
      </div>

      <label className="flex flex-col gap-2 text-sm text-foreground/75 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium">Skill level</span>
        <motion.select
          value={activeLevel}
          onChange={(event) => onLevelChange(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-background/70 px-3 py-2 text-sm text-foreground outline-none ring-[#FF3B30] transition focus:ring-2 sm:w-64"
          whileFocus={{ scale: 1.01 }}
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </motion.select>
      </label>
    </div>
  );
};
