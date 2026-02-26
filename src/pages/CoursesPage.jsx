import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/ui/CourseCard";
import { courseCategories, courseLevels, courses } from "@/data/courses";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export const CoursesPage = () => {
  const [activeCategory, setActiveCategory] = useState("Programming");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("All");

  useSeoMeta({
    title: "Courses | Dev Fraol Academy",
    description: "Browse programming, design, and fundamentals courses with quick filters and modern animations.",
  });

  const filteredCourses = useMemo(() => {
    const searchValue = searchQuery.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesCategory = course.category === activeCategory;
      const matchesLevel = activeLevel === "All" || course.level === activeLevel;
      const matchesSearch = !searchValue || course.title.toLowerCase().includes(searchValue);

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [activeCategory, activeLevel, searchQuery]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 pb-10 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="glass-panel rounded-3xl border border-white/15 p-5 shadow-[0_18px_40px_rgba(15,20,35,0.2)] sm:p-7"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b63]">Academy Courses</p>
        <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Build career-ready skills through structured learning tracks.</h1>
        <p className="mt-3 max-w-2xl text-sm text-foreground/70 sm:text-base">
          Programming is highlighted as our primary learning path, with additional courses in graphic design and computer fundamentals.
        </p>
      </motion.section>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {courseCategories.map((category) => {
            const active = category === activeCategory;

            return (
              <motion.button
                key={category}
                type="button"
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -1 }}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition sm:text-base ${
                  active
                    ? "border-[#ff3b30] bg-gradient-to-r from-[#ff564c] to-[#ff3b30] text-white shadow-[0_8px_20px_rgba(255,59,48,0.35)]"
                    : "border-white/20 bg-background/60 text-foreground/75 hover:border-[#ff3b30]/50"
                }`}
              >
                {category}
              </motion.button>
            );
          })}
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="group relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45 transition group-focus-within:text-[#ff3b30]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search courses by title"
              className="w-full rounded-xl border border-white/20 bg-background/70 py-3 pl-10 pr-4 text-sm text-foreground outline-none ring-[#ff3b30] transition focus:border-[#ff3b30]/60 focus:ring-2"
            />
          </label>

          <select
            value={activeLevel}
            onChange={(event) => setActiveLevel(event.target.value)}
            className="w-full rounded-xl border border-white/20 bg-background/70 px-3 py-3 text-sm text-foreground outline-none ring-[#ff3b30] transition focus:border-[#ff3b30]/60 focus:ring-2"
          >
            {courseLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">{activeCategory}</h2>
          <p className="text-sm text-foreground/65">{filteredCourses.length} course(s)</p>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                layout
                key={course.id}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
                transition={{ delay: index * 0.05 }}
              >
                <CourseCard course={course} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-dashed border-white/25 bg-background/40 p-6 text-center text-sm text-foreground/70"
          >
            No courses match your current search and level filters.
          </motion.div>
        ) : null}
      </section>
    </div>
  );
};
