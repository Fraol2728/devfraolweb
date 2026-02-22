import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { courses } from "@/data/courses";
import { CourseCard } from "@/features/courses/CourseCard";
import { CourseFilter } from "@/features/courses/CourseFilter";

const levelOrder = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");

  const visibleCourses = useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? courses
        : courses.filter((course) => course.category === activeCategory);

    return [...filtered].sort((a, b) => {
      if (sortBy === "level") {
        return (levelOrder[a.level] ?? 99) - (levelOrder[b.level] ?? 99);
      }

      if (sortBy === "duration") {
        return (a.durationWeeks ?? Number.MAX_SAFE_INTEGER) - (b.durationWeeks ?? Number.MAX_SAFE_INTEGER);
      }

      return (b.popularity ?? 0) - (a.popularity ?? 0);
    });
  }, [activeCategory, sortBy]);

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-left">
          <h1 className="text-4xl font-extrabold sm:text-5xl">All Courses</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Discover structured paths in Web Development and Graphic Design with production-ready projects.
          </p>
        </motion.div>

        <CourseFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {visibleCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-primary/60 bg-primary/10 px-6 py-3 font-semibold text-primary transition-all duration-300 hover:shadow-[0_0_22px_rgba(255,59,48,0.45)]"
          >
            Load More Courses
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
