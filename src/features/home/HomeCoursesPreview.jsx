import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { courses as fallbackCourses } from "@/data/courses";
import { CourseCard } from "@/features/home/CourseCard";

const fallbackInstructor = {
  id: "dev-fraol",
  name: "Dev Fraol",
  profile_image: "/profile-logo.png",
};

const mapFallbackCourses = () =>
  fallbackCourses.slice(0, 8).map((course, index) => ({
    id: course.id,
    title: course.title,
    slug: course.slug || course.id,
    category: course.category,
    instructor_id: fallbackInstructor.id,
    level: course.level,
    duration: course.duration,
    lessons_count: course.syllabus?.reduce((acc, module) => acc + module.topics.length, 0) || 0,
    thumbnail: course.thumbnail,
    short_description: course.description,
    has_preview: index < 3,
    preview_lessons_count: index < 3 ? 1 : 0,
  }));

const mapCourse = (course, instructorsMap) => {
  const instructor = instructorsMap.get(course.instructor_id) || fallbackInstructor;
  return {
    id: course.id,
    title: course.title,
    slug: course.slug || course.id,
    category: course.category,
    instructorName: instructor.name || "Dev Fraol",
    level: course.level || "Beginner",
    duration: course.duration || "Self-paced",
    lessonsCount: course.lessons_count || 0,
    thumbnail: course.thumbnail || "/projects/project1.png",
    shortDescription: course.short_description || "Explore practical lessons and modern workflows.",
    hasPreview: Boolean(course.has_preview || (course.preview_lessons_count ?? 0) > 0),
  };
};

export const HomeCoursesPreview = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadTopCourses = async () => {
      setIsLoading(true);
      try {
        const [coursesPayload, instructorsPayload] = await Promise.all([
          apiFetch("/api/courses?limit=8"),
          apiFetch("/api/instructors"),
        ]);

        if (cancelled) return;

        const rawCourses = Array.isArray(coursesPayload?.courses)
          ? coursesPayload.courses
          : Array.isArray(coursesPayload)
            ? coursesPayload
            : [];

        const instructorsList = Array.isArray(instructorsPayload?.instructors)
          ? instructorsPayload.instructors
          : Array.isArray(instructorsPayload)
            ? instructorsPayload
            : [fallbackInstructor];

        const instructorsMap = new Map(instructorsList.map((instructor) => [instructor.id, instructor]));

        const orderedCourses = [...rawCourses].sort((a, b) => {
          if (a.category === "Programming" && b.category !== "Programming") return -1;
          if (b.category === "Programming" && a.category !== "Programming") return 1;
          return 0;
        });

        setCourses(orderedCourses.map((course) => mapCourse(course, instructorsMap)));
      } catch {
        if (!cancelled) {
          const fallbackMap = new Map([[fallbackInstructor.id, fallbackInstructor]]);
          const sortedFallback = mapFallbackCourses().sort((a, b) => {
            if (a.category === "Programming" && b.category !== "Programming") return -1;
            if (b.category === "Programming" && a.category !== "Programming") return 1;
            return 0;
          });
          setCourses(sortedFallback.map((course) => mapCourse(course, fallbackMap)));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadTopCourses();

    return () => {
      cancelled = true;
    };
  }, []);

  const hasCourses = useMemo(() => courses.length > 0, [courses.length]);

  return (
    <section className="w-full bg-gradient-to-b from-white/[0.02] to-white/[0.04] py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff8c84]">Learn with Dev Fraol</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Featured Courses</h2>
            <p className="max-w-2xl text-sm text-white/70 sm:text-base">Discover high-impact courses with practical projects, structured lessons, and preview content before you enroll.</p>
          </div>
          <Link
            to="/courses"
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#ff5a4f]/60 hover:bg-[#ff5a4f]/15"
          >
            View All Courses
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-[320px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
            ))}
          </div>
        ) : hasCourses ? (
          <>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
              {courses.map((course, index) => (
                <div key={course.id} className="snap-start">
                  <CourseCard course={course} index={index} />
                </div>
              ))}
            </div>

            <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-8 text-center text-sm text-white/70"
          >
            No featured courses are available right now.
          </motion.div>
        )}
      </div>
    </section>
  );
};
