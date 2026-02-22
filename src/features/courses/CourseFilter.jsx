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
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <motion.button
              key={category}
              type="button"
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -2 }}
              onClick={() => onCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "border-[#FF3B30] bg-[#FF3B30] text-white shadow-[0_0_24px_rgba(255,59,48,0.35)]"
                  : "border-white/10 bg-[#1E1E1E] text-slate-200 hover:border-[#FF3B30]/60 hover:text-white"
              }`}
            >
              {category}
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-sm">
        <label htmlFor="sort-courses" className="text-slate-400">
          Sort by
        </label>
        <select
          id="sort-courses"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-full border border-white/15 bg-[#1E1E1E] px-4 py-2 text-slate-100 outline-none transition focus:border-[#FF3B30]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};
