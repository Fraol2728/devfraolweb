import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Menu } from "lucide-react";
import { getLearningCourse } from "@/features/learning/learningData";
import { Sidebar } from "@/features/learning/components/Sidebar";
import { LessonContent } from "@/features/learning/components/LessonContent";
import { ProgressBar } from "@/features/learning/components/ProgressBar";
import { NavigationFooter } from "@/features/learning/components/NavigationFooter";

const flattenLessons = (modules) =>
  modules.flatMap((module) => module.lessons.map((lesson) => ({ lesson, moduleId: module.id, moduleTitle: module.title })));

export const LearningInterface = () => {
  const { slug } = useParams();
  const course = useMemo(() => getLearningCourse(slug), [slug]);

  const lessonMap = useMemo(() => flattenLessons(course?.modules ?? []), [course]);
  const [activeLessonId, setActiveLessonId] = useState(lessonMap[0]?.lesson?.id ?? null);
  const [completedLessonIds, setCompletedLessonIds] = useState(() => new Set());
  const [openModuleIds, setOpenModuleIds] = useState(() => (course?.modules ?? []).map((module) => module.id));
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    setActiveLessonId(lessonMap[0]?.lesson?.id ?? null);
    setCompletedLessonIds(new Set());
    setOpenModuleIds((course?.modules ?? []).map((module) => module.id));
  }, [course, lessonMap]);

  const activeIndex = lessonMap.findIndex((entry) => entry.lesson.id === activeLessonId);
  const activeEntry = activeIndex >= 0 ? lessonMap[activeIndex] : null;

  useEffect(() => {
    const scrollNode = document.getElementById("lesson-content-scroll");
    if (!scrollNode) return;

    const updateProgress = () => {
      const max = scrollNode.scrollHeight - scrollNode.clientHeight;
      const value = max > 0 ? Math.round((scrollNode.scrollTop / max) * 100) : 0;
      setReadProgress(value);
    };

    updateProgress();
    scrollNode.addEventListener("scroll", updateProgress, { passive: true });
    return () => scrollNode.removeEventListener("scroll", updateProgress);
  }, [activeLessonId]);

  if (!course || !activeEntry) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0E0E10] px-6">
        <div className="rounded-2xl border border-[#232326] bg-[#151518] p-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Learning page not found</h1>
          <Link to="/courses" className="mt-4 inline-flex rounded-lg border border-[#E10600] px-4 py-2 text-sm font-medium text-[#E10600]">
            Back to courses
          </Link>
        </div>
      </main>
    );
  }

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < lessonMap.length - 1;

  const goToLesson = (index) => {
    if (index < 0 || index >= lessonMap.length) return;
    setActiveLessonId(lessonMap[index].lesson.id);
    const scrollNode = document.getElementById("lesson-content-scroll");
    if (scrollNode) scrollNode.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setCompletedLessonIds((prev) => {
      const next = new Set(prev);
      next.add(activeEntry.lesson.id);
      return next;
    });
    goToLesson(activeIndex + 1);
  };

  const handlePrevious = () => goToLesson(activeIndex - 1);

  return (
    <main className="h-screen overflow-hidden bg-[#0E0E10] text-white">
      <div className="flex h-full">
        <Sidebar
          modules={course.modules}
          openModuleIds={openModuleIds}
          onToggleModule={(moduleId) =>
            setOpenModuleIds((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
          }
          activeLessonId={activeLessonId}
          completedLessonIds={completedLessonIds}
          onSelectLesson={setActiveLessonId}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <section className="flex min-w-0 flex-1 flex-col bg-[#151518]">
          <header className="flex items-center justify-between border-b border-[#232326] px-4 py-3 md:px-8">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="rounded-md p-2 text-[#A1A1AA] hover:bg-[#19191d] hover:text-white md:hidden"
              aria-label="Open lessons panel"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-xs uppercase tracking-[0.14em] text-[#A1A1AA]">{course.title}</p>
            </div>
            <Link to={`/courses/${course.slug}`} className="text-sm font-medium text-[#E10600] hover:text-[#ff4b44]">Exit</Link>
          </header>

          <ProgressBar progress={readProgress} />

          <div id="lesson-content-scroll" className="min-h-0 flex-1 overflow-y-auto">
            <LessonContent lesson={activeEntry.lesson} moduleTitle={activeEntry.moduleTitle} />
          </div>

          <NavigationFooter
            lessonPosition={activeIndex + 1}
            lessonCount={lessonMap.length}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </section>
      </div>
    </main>
  );
};
