import { motion } from "framer-motion";

const categories = ["All", "Web Development", "Graphic Design"];
const sortOptions = ["Latest", "Popular"];

const pillBase =
  "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const BlogFilter = ({ selectedCategory, selectedSort, onCategoryChange, onSortChange }) => {
  return (
    <div className="mt-10 flex flex-col gap-5 text-left">
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Blog categories">
        {categories.map((category) => {
          const active = selectedCategory === category;
          return (
            <motion.button
              whileTap={{ scale: 0.96 }}
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`${pillBase} ${
                active ? "border-[#FF3B30] bg-[#FF3B30] text-white" : "border-border bg-muted/30 hover:border-[#FF3B30]"
              }`}
              aria-pressed={active}
            >
              {category}
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Blog sorting">
        {sortOptions.map((sort) => {
          const active = selectedSort === sort;
          return (
            <motion.button
              whileTap={{ scale: 0.96 }}
              key={sort}
              type="button"
              onClick={() => onSortChange(sort)}
              className={`${pillBase} ${
                active ? "border-[#FF3B30] bg-[#FF3B30] text-white" : "border-border bg-muted/30 hover:border-[#FF3B30]"
              }`}
              aria-pressed={active}
            >
              {sort}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
