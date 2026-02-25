import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { courses, courseLevels } from "@/data/courses";
import { CourseCard } from "@/components/ui/CourseCard";
import { CourseFilter } from "@/components/ui/CourseFilter";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const testimonials = [
  { name: "Aisha", quote: "The course flow felt practical, modern, and instantly applicable to my projects." },
  { name: "Ben", quote: "I landed my first freelance client after applying the portfolio lessons from week three." },
  { name: "Nina", quote: "Great pacing and visuals. The syllabus structure made learning feel effortless." },
];

export const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [activeLevel, setActiveLevel] = useState("All Levels");

  useSeoMeta({
    title: "Courses | Dev Fraol Academy",
    description: "Browse modern development courses with search and level-based filtering.",
  });

  const categories = useMemo(() => ["All Categories", ...new Set(courses.map((course) => course.category))], []);

  const filteredCourses = useMemo(() => {
    const lowerSearch = searchQuery.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !lowerSearch ||
        course.title.toLowerCase().includes(lowerSearch) ||
        course.instructor.toLowerCase().includes(lowerSearch);
      const matchesCategory = activeCategory === "All Categories" || course.category === activeCategory;
      const matchesLevel = activeLevel === "All Levels" || course.level === activeLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, activeCategory, activeLevel]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 pb-8 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass-panel relative overflow-hidden rounded-3xl border border-white/20 px-6 py-10 sm:px-10"
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ff3b30]/25 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-56 w-56 rounded-full bg-[#ff7a45]/20 blur-3xl" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="inline-flex rounded-full border border-[#ff3b30]/35 bg-[#ff3b30]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b63]">
              Course Library
            </p>
            <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">Learn in-demand skills with guided, modern courses.</h1>
            <p className="max-w-xl text-sm text-foreground/75 sm:text-base">
              Search by instructor, narrow by category and level, and jump into deeply practical modules designed for real-world outcomes.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="overflow-hidden rounded-2xl border border-white/20"
          >
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80"
              alt="Students learning online"
              className="h-full min-h-[220px] w-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      <section className="space-y-4">
        <div className="glass-panel rounded-2xl border border-white/15 p-4 shadow-[0_16px_32px_rgba(15,20,35,0.22)]">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by course name or instructor"
            className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground outline-none ring-[#FF3B30] transition focus:ring-2"
          />
        </div>

        <CourseFilter
          categories={categories}
          levels={courseLevels}
          activeCategory={activeCategory}
          activeLevel={activeLevel}
          onCategoryChange={setActiveCategory}
          onLevelChange={setActiveLevel}
        />
      </section>

      <motion.section layout className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Available courses</h2>
          <p className="text-sm text-foreground/70">{filteredCourses.length} results</p>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-dashed border-white/25 p-5 text-sm text-foreground/75">
            No courses matched your filters. Try broadening your search.
          </motion.p>
        ) : null}
      </motion.section>

      <section className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="glass-panel rounded-2xl border border-white/15 p-6"
        >
          <h3 className="text-lg font-semibold">Learner testimonials</h3>
          <div className="mt-4 space-y-3">
            {testimonials.map((item, index) => (
              <motion.blockquote
                key={item.name}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
              >
                <p className="text-foreground/80">“{item.quote}”</p>
                <footer className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">— {item.name}</footer>
              </motion.blockquote>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="glass-panel rounded-2xl border border-white/15 p-6"
        >
          <h3 className="text-lg font-semibold">Get weekly learning tips</h3>
          <p className="mt-2 text-sm text-foreground/75">Join the newsletter for curated resources, new tracks, and student-only discounts.</p>
          <form className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-xl border border-white/15 bg-background/75 px-3 py-2.5 text-sm outline-none ring-[#FF3B30] focus:ring-2"
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-xl bg-gradient-to-r from-[#ff564c] to-[#ff3b30] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};
