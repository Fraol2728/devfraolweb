import { motion } from "framer-motion";

const categories = ["All", "Web Development", "Graphic Design"];
const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "level", label: "Level" },
  { value: "duration", label: "Duration" },
];

export const CourseFilter = ({ activeCategory, onCategoryChange, sortBy, onSortChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = category === activeCategory;
          return (
            <motion.button
              key={category}
              type="button"
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -1 }}
              onClick={() => onCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_0_18px_rgba(255,59,48,0.45)]"
                  : "border-border bg-background/40 text-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              <motion.span
                key={`${category}-${active}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {category}
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <label htmlFor="sort-courses" className="text-muted-foreground">
          Sort by
        </label>
        <motion.select
          id="sort-courses"
          whileFocus={{ scale: 1.01 }}
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-full border border-border bg-background/40 px-4 py-2 text-foreground outline-none transition focus:border-primary"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
      </div>
    </motion.div>
  );
};
