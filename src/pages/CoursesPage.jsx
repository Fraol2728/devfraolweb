import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { apiFetch } from "@/lib/api";

const CATEGORY_ORDER = ["Programming", "Graphics Design", "Operate Computer"];

export const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Programming");
  const [query, setQuery] = useState("");

  useSeoMeta({
    title: "Course Catalog | Dev Fraol Academy",
    description: "Explore programming, graphics design, and computer operation courses with category filters and search.",
  });

  useEffect(() => {
    let cancelled = false;

    const loadCourses = async () => {
      try {
        const payload = await apiFetch("/api/courses");
        if (!cancelled) {
          setCourses(payload?.data ?? []);
        }
      } catch {
        if (!cancelled) {
          setCourses([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCourses();

    return () => {
      cancelled = true;
    };
  }, []);

  const categoryCounts = useMemo(() => courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] ?? 0) + 1;
    return acc;
  }, {}), [courses]);

  const visibleCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesCategory = course.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, courses, query]);

  return (
    <main className="mx-auto w-full max-w-[1320px] space-y-7 px-4 pb-16 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#130f1b] via-[#1a1727] to-[#1e1c2e] p-6 sm:p-9">
        <p className="text-xs uppercase tracking-[0.2em] text-[#ff8f87]">Dev Fraol Academy</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">Dynamic Course Library</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">Browse live courses from the backend API and start learning with structured modules and lessons.</p>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-black/20 p-4 sm:p-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORY_ORDER.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "border-[#ff3b30] bg-[#ff3b30] text-white"
                  : "border-white/15 bg-white/5 text-white/80 hover:border-[#ff3b30]/45"
              } ${category === "Programming" ? "ring-1 ring-[#ff3b30]/30" : ""}`}
            >
              {category} <span className="text-xs opacity-80">({categoryCounts[category] ?? 0})</span>
            </button>
          ))}
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or description"
          className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[#ff3b30]/70"
        />
      </section>

      {loading ? <div className="rounded-2xl border border-white/10 bg-black/20 p-7 text-center text-sm text-white/75">Loading courses...</div> : null}

      {!loading && visibleCourses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-8 text-center text-sm text-white/70">No courses found for this filter.</div>
      ) : null}

      {!loading ? (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <article key={course.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d13]/90">
              <img src={course.thumbnail} alt={course.title} className="h-48 w-full object-cover" loading="lazy" />
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="line-clamp-2 text-lg font-semibold text-white">{course.title}</h2>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/70">{course.category}</span>
                </div>
                <p className="line-clamp-2 text-sm text-white/70">{course.description}</p>
                <p className="text-xs text-white/60">Instructor: {course.instructor}</p>
                <Link to={`/course/${course.slug}`} className="inline-flex w-full justify-center rounded-xl bg-gradient-to-r from-[#ff544a] to-[#ff3b30] px-4 py-2 text-sm font-semibold text-white">
                  View course
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
};
