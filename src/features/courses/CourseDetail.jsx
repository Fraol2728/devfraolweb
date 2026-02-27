import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CourseOutline } from "@/features/courses/CourseOutline";
import { LessonPanel } from "@/features/courses/LessonPanel";
import { mockCourses } from "@/features/courses/mockCourses";

const getFirstLesson = (course) => course?.modules?.[0]?.lessons?.[0] ?? null;

export const CourseDetail = () => {
  const { slug } = useParams();
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [isResolvingCourse, setIsResolvingCourse] = useState(true);

  const normalizedSlug = String(slug ?? "").toLowerCase();

  const course = useMemo(
    () =>
      mockCourses.find((entry) => String(entry.slug).toLowerCase() === String(slug ?? "").toLowerCase()) ?? null,
    [slug],
  );

  useEffect(() => {
    setIsResolvingCourse(true);
    const timeoutId = window.setTimeout(() => {
      setIsResolvingCourse(false);
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [normalizedSlug]);

  const allLessons = useMemo(() => {
    if (!course) return [];

    return course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        ...lesson,
        moduleId: module.id,
        moduleTitle: module.title,
      })),
    );
  }, [course]);

  useEffect(() => {
    const firstLesson = getFirstLesson(course);
    setActiveModuleId(course?.modules?.[0]?.id ?? null);
    setActiveLessonId(firstLesson?.id ?? null);
    setIsMobilePanelOpen(false);
  }, [course]);

  const activeLessonIndex = allLessons.findIndex((lesson) => lesson.id === activeLessonId);
  const selectedLessonContent = activeLessonIndex >= 0 ? allLessons[activeLessonIndex] : null;

  const handleLessonSelect = (lesson, moduleId) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lesson.id);
    setIsMobilePanelOpen(true);
  };

  const goToLessonByIndex = (targetIndex) => {
    const lesson = allLessons[targetIndex];
    if (!lesson) return;

    setActiveModuleId(lesson.moduleId);
    setActiveLessonId(lesson.id);
  };

  if (isResolvingCourse) {
    return (
      <section className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8" aria-live="polite" aria-busy="true">
        <div className="mb-6 animate-pulse">
          <div className="h-3 w-24 rounded bg-white/15" />
          <div className="mt-4 h-10 w-full max-w-xl rounded bg-white/15" />
          <div className="mt-4 h-4 w-full max-w-3xl rounded bg-white/10" />
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(290px,33%)_minmax(0,67%)]">
          <div className="h-[360px] rounded-3xl border border-white/10 bg-[#121826]/60" />
          <div className="h-[360px] rounded-3xl border border-white/10 bg-[#121826]/60" />
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl rounded-3xl border border-white/15 bg-[#121826]/75 p-8 text-center shadow-[0_20px_50px_rgba(3,8,18,0.45)]">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">Course Detail</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Course Not Found</h1>
          <p className="mt-3 text-white/70">The requested course doesn’t exist.</p>
          <Link
            to="/courses"
            className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#ff564c] to-[#ff3b30] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Back to Courses
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">Course Detail</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{course.title}</h1>
            <p className="mt-3 max-w-3xl text-sm text-white/70 sm:text-base">{course.description}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(290px,33%)_minmax(0,67%)] lg:items-start">
            <CourseOutline
              modules={course.modules}
              activeModuleId={activeModuleId}
              activeLessonId={activeLessonId}
              onToggleModule={setActiveModuleId}
              onSelectLesson={handleLessonSelect}
            />

            <LessonPanel
              lesson={selectedLessonContent}
              isMobileOpen={isMobilePanelOpen}
              onCloseMobile={() => setIsMobilePanelOpen(false)}
              onPrevious={() => goToLessonByIndex(activeLessonIndex - 1)}
              onNext={() => goToLessonByIndex(activeLessonIndex + 1)}
              hasPrevious={activeLessonIndex > 0}
              hasNext={activeLessonIndex >= 0 && activeLessonIndex < allLessons.length - 1}
              progress={{ current: Math.max(activeLessonIndex + 1, 0), total: allLessons.length }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
