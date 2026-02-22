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
      className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60 dark:shadow-none sm:flex-row sm:items-center sm:justify-between"
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
                  ? "border-red-600 bg-red-600 text-white shadow-[0_0_24px_rgba(255,59,48,0.35)] dark:border-red-500 dark:bg-red-500"
                  : "border-gray-300 bg-gray-100 text-gray-800 hover:bg-red-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-[#FF3B30]/60"
              }`}
            >
              {category}
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-sm">
        <label htmlFor="sort-courses" className="text-gray-700 transition-colors duration-300 dark:text-gray-300">
          Sort by
        </label>
        <select
          id="sort-courses"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none transition-colors duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
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
