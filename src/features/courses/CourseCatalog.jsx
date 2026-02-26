import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryFilter } from "@/features/courses/CategoryFilter";
import { CourseCard } from "@/features/courses/CourseCard";
import { SearchBar } from "@/features/courses/SearchBar";
import { apiFetch } from "@/lib/api";
import { courses as fallbackCourses } from "@/data/courses";

const categoryAlias = {
  "Graphic Design": "Graphics Design",
  "Computer Fundamentals": "Operate Computer",
};

const normalizeFallbackCourse = (course, index) => ({
  id: course.id,
  title: course.title,
  slug: course.id,
  category: categoryAlias[course.category] ?? course.category,
  instructor_id: "inst-001",
  level: course.level,
  duration: course.duration,
  lessons_count: (course.syllabus ?? []).length * 3 || 12,
  thumbnail: course.thumbnail,
  short_description: course.description,
  instructor_name: "Dev Fraol",
  order: index,
});

export const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("Programming");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const [courseRows, instructorRows] = await Promise.all([
          apiFetch("/courses"),
          apiFetch("/instructors"),
        ]);

        const instructors = Array.isArray(instructorRows)
          ? instructorRows
          : instructorRows?.data ?? [];

        const instructorMap = new Map(instructors.map((instructor) => [String(instructor.id), instructor.name]));

        const normalized = (Array.isArray(courseRows) ? courseRows : courseRows?.data ?? [])
          .filter((course) => (instructorMap.get(String(course.instructor_id)) || "") === "Dev Fraol")
          .map((course, index) => ({
            ...course,
            category: categoryAlias[course.category] ?? course.category,
            instructor_name: instructorMap.get(String(course.instructor_id)) || "Dev Fraol",
            order: index,
          }));

        if (!normalized.length) {
          throw new Error("No API courses available for Dev Fraol");
        }

        setCourses(normalized);
      } catch {
        const localCourses = fallbackCourses.map(normalizeFallbackCourse);
        setCourses(localCourses);
        setError("Live API unavailable. Showing local catalog data.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const categoryCounts = useMemo(
    () =>
      courses.reduce((acc, course) => {
        acc[course.category] = (acc[course.category] ?? 0) + 1;
        return acc;
      }, {}),
    [courses],
  );

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const inCategory = course.category === activeCategory;
      const inSearch =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        (course.short_description || "").toLowerCase().includes(normalizedQuery);

      return inCategory && inSearch;
    });
  }, [activeCategory, courses, query]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-14 pt-2 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-[#1d0f12] via-[#281116] to-[#121218] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[#ff7f77]">Dev Fraol Academy</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">Explore Our Courses</h1>
        <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
          Master real-world skills with project-based courses in programming, graphics design, and computer operation fundamentals.
        </p>
        <Link
          to="/courses"
          className="mt-6 inline-flex rounded-xl bg-[#ff3b30] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff564c]"
        >
          Start Learning
        </Link>
      </section>

      <section className="space-y-4">
        <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} counts={categoryCounts} />
        <SearchBar value={query} onChange={setQuery} />
        {error ? <p className="text-xs text-amber-300">{error}</p> : null}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">{activeCategory}</h2>
          <span className="text-sm text-foreground/70">{filteredCourses.length} courses</span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/15 bg-black/20 p-8 text-center text-sm text-foreground/70">Loading courses...</div>
        ) : null}

        {!loading && filteredCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-8 text-center text-sm text-foreground/70">
            No courses found. Try another search term.
          </div>
        ) : null}

        {!loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                style={{
                  animation: "fadeSlideUp 420ms ease-out forwards",
                  animationDelay: `${Math.min(index * 70, 420)}ms`,
                  opacity: 0,
                }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
};
