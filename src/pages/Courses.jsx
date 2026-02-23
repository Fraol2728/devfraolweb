import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMockApi } from "@/context/MockApiContext";
import { CourseCard } from "@/features/courses/CourseCard";
import { CourseFilter } from "@/features/courses/CourseFilter";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const levelOrder = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const CourseCardSkeleton = () => <div className="h-64 animate-pulse rounded-2xl border border-gray-200 bg-white/60 dark:border-gray-700 dark:bg-gray-900/60" />;

export const Courses = () => {
  const { courses = [], loading } = useMockApi();
  useSeoMeta({
    title: "Courses | Dev Fraol Academy",
    description: "Browse project-driven web development and graphic design courses with filtering, search, and modular backend-ready data architecture.",
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const normalizedQuery = query.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];

    const collected = new Set();
    courses.forEach((course) => {
      const searchableValues = [course.title, course.category, course.level, ...(course.tags ?? [])].filter(Boolean);
      searchableValues.forEach((value) => {
        if (value.toLowerCase().includes(normalizedQuery)) collected.add(value);
      });
    });

    return [...collected].slice(0, 6);
  }, [courses, normalizedQuery]);

  const visibleCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      const matchCategory = activeCategory === "All" || course.category === activeCategory;
      if (!matchCategory) return false;
      if (!normalizedQuery) return true;

      return [course.title, course.level, course.category, ...(course.tags ?? [])].filter(Boolean).some((field) => field.toLowerCase().includes(normalizedQuery));
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "level") return (levelOrder[a.level] ?? 99) - (levelOrder[b.level] ?? 99);
      if (sortBy === "duration") return (a.durationWeeks ?? Number.MAX_SAFE_INTEGER) - (b.durationWeeks ?? Number.MAX_SAFE_INTEGER);
      return (b.popularity ?? 0) - (a.popularity ?? 0);
    });
  }, [courses, activeCategory, normalizedQuery, sortBy]);

  const coursesToRender = visibleCourses.slice(0, visibleCount);

  const highlightTitle = (title) => {
    if (!normalizedQuery) return title;

    const matcher = new RegExp(`(${escapeRegExp(query)})`, "ig");
    const tokens = title.split(matcher);

    return tokens.map((token, index) =>
      token.toLowerCase() === normalizedQuery ? (
        <mark key={`${token}-${index}`} className="rounded bg-red-100 px-1 text-red-900 transition-colors duration-300 dark:bg-[#FF3B30]/25 dark:text-white">
          {token}
        </mark>
      ) : (
        <span key={`${token}-${index}`}>{token}</span>
      ),
    );
  };

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF3B30] transition-colors duration-300">Dev Fraol Academy</p>
          <h1 className="mt-3 text-4xl font-extrabold text-gray-900 transition-colors duration-300 dark:text-white sm:text-5xl">Explore Courses</h1>
          <p className="mt-4 max-w-3xl text-gray-700 transition-colors duration-300 dark:text-gray-300">A modern, backend-ready courses catalog with instant search, smart filtering, and clean modular components.</p>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="relative mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60 dark:shadow-none">
          <label htmlFor="course-search" className="sr-only">Search courses</label>
          <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
            <Search className="h-4 w-4 text-[#FF3B30]" />
            <input
              id="course-search"
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(6);
              }}
              placeholder="Search by title, level, category, or tag..."
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 transition-colors duration-300 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          {suggestions.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => setQuery(suggestion)} className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-700 transition-colors duration-300 hover:border-red-300 hover:bg-red-100 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-300 dark:hover:border-red-700 dark:hover:text-white">
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
        </motion.section>

        <CourseFilter
          activeCategory={activeCategory}
          onCategoryChange={(category) => {
            setActiveCategory(category);
            setVisibleCount(6);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <motion.section layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading.list ? Array.from({ length: 6 }).map((_, idx) => <CourseCardSkeleton key={`course-skeleton-${idx}`} />) : null}
          {!loading.list && coursesToRender.length === 0 ? <p className="text-sm text-gray-400">No courses match your current search and filters.</p> : null}
          {!loading.list && coursesToRender.map((course, index) => <CourseCard key={course.id} course={course} index={index} highlightedTitle={highlightTitle(course.title)} />)}
        </motion.section>

        <div className="mt-8 flex flex-col items-center gap-3">
          {visibleCount < visibleCourses.length ? (
            <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setVisibleCount((count) => count + 3)} className="rounded-full border border-red-300 bg-red-100 px-6 py-2.5 text-sm font-semibold text-red-800 transition-colors duration-300 hover:bg-red-200 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300 dark:hover:text-white dark:hover:shadow-[0_0_22px_rgba(255,59,48,0.35)]">
              Load More
            </motion.button>
          ) : (
            <p className="text-xs text-gray-500 transition-colors duration-300 dark:text-gray-500">Infinite scroll placeholder ready for backend pagination integration.</p>
          )}
        </div>
      </div>
    </main>
  );
};
