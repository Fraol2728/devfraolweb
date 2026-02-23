import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { CourseCard } from "@/features/courses/CourseCard";
import { CourseFilter } from "@/features/courses/CourseFilter";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Section } from "@/shared/ui/Section";

const levelOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const CourseCardSkeleton = () => <div className="h-64 animate-pulse rounded-2xl border border-gray-200 bg-white/60 dark:border-gray-700 dark:bg-gray-900/60" />;

export const Courses = () => {
  const { courses = [], loading } = useCourses();
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
      [course.title, course.category, course.level, ...(course.tags ?? [])].filter(Boolean).forEach((value) => {
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

  const coursesToRender = useMemo(() => visibleCourses.slice(0, visibleCount), [visibleCourses, visibleCount]);

  const highlightTitle = (title) => {
    if (!normalizedQuery) return title;
    const matcher = new RegExp(`(${escapeRegExp(query)})`, "ig");
    return title.split(matcher).map((token, index) => (
      token.toLowerCase() === normalizedQuery
        ? <mark key={`${token}-${index}`} className="rounded bg-red-100 px-1 text-red-900 dark:bg-[#FF3B30]/25 dark:text-white">{token}</mark>
        : <span key={`${token}-${index}`}>{token}</span>
    ));
  };

  return (
    <Container className="py-14">
      <PageHeader title="Explore Courses" description="A modern, backend-ready courses catalog with instant search, smart filtering, and clean modular components." />
      <Section>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/60">
          <label htmlFor="course-search" className="sr-only">Search courses</label>
          <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
            <Search className="h-4 w-4 text-[#FF3B30]" />
            <input id="course-search" type="text" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(6); }} placeholder="Search by title, level, category, or tag..." className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white" />
          </div>
          {suggestions.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">{suggestions.map((suggestion) => <Button key={suggestion} variant="outline" className="rounded-full px-3 py-1.5 text-xs" onClick={() => setQuery(suggestion)} aria-label={`Use suggestion ${suggestion}`}>{suggestion}</Button>)}</div>
          ) : null}
        </motion.div>

        <CourseFilter activeCategory={activeCategory} onCategoryChange={(category) => { setActiveCategory(category); setVisibleCount(6); }} sortBy={sortBy} onSortChange={setSortBy} />

        <motion.section layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Courses list">
          {loading.list ? Array.from({ length: 6 }).map((_, idx) => <CourseCardSkeleton key={`course-skeleton-${idx}`} />) : null}
          {!loading.list && coursesToRender.length === 0 ? <EmptyState text="No courses match your current search and filters." /> : null}
          {!loading.list && coursesToRender.map((course, index) => <CourseCard key={course.id} course={course} index={index} highlightedTitle={highlightTitle(course.title)} />)}
        </motion.section>

        <div className="mt-8 flex flex-col items-center gap-3">
          {visibleCount < visibleCourses.length ? <Button onClick={() => setVisibleCount((count) => count + 3)} aria-label="Load more courses">Load More</Button> : <p className="text-xs text-gray-500">Infinite scroll placeholder ready for backend pagination integration.</p>}
        </div>
      </Section>
    </Container>
  );
};
