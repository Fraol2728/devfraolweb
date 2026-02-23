import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useMockApi } from "@/context/MockApiContext";

const getFallbackCourse = (courseId) => ({
  id: courseId,
  title: "Course Learning",
  modules: [
    {
      id: 1,
      title: "Getting Started",
      lessons: [{ id: 1, title: "Course Overview", duration: "10 min", description: "This is a placeholder lesson. Replace mock data with fetch(`/api/courses/:id`) when backend is ready." }],
    },
  ],
});

export const CourseLearning = () => {
  const { courseId, id } = useParams();
  const resolvedId = courseId || id;
  const { courses = [], loading } = useMockApi();

  const selectedCourse = courses.find((course) => course.id === resolvedId || course.slug === resolvedId);
  const course = selectedCourse
    ? {
        id: selectedCourse.id,
        title: selectedCourse.title,
        modules: (selectedCourse.curriculum ?? []).map((module, moduleIndex) => ({
          id: moduleIndex + 1,
          title: module.module,
          lessons: (module.lessons ?? []).map((lesson, lessonIndex) => ({
            id: Number(`${moduleIndex + 1}${lessonIndex + 1}`),
            title: lesson,
            duration: "10 min",
            description: `Practical lesson from ${module.module}.`,
          })),
        })),
      }
    : getFallbackCourse(resolvedId);

  const allLessons = useMemo(
    () =>
      course.modules.flatMap((module) =>
        module.lessons.map((lesson) => ({
          ...lesson,
          moduleId: module.id,
          moduleTitle: module.title,
        })),
      ),
    [course],
  );

  const [activeLessonId, setActiveLessonId] = useState(allLessons[0]?.id ?? null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedModules, setExpandedModules] = useState(course.modules.map((module) => module.id));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeLessonIndex = allLessons.findIndex((lesson) => lesson.id === activeLessonId);
  const activeLesson = allLessons[activeLessonIndex] ?? allLessons[0];
  const totalLessons = allLessons.length;
  const progress = totalLessons ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((entryId) => entryId !== moduleId) : [...prev, moduleId]));
  };

  const setActiveLesson = (lessonId) => {
    setActiveLessonId(lessonId);
    setIsSidebarOpen(false);
  };

  const goToNextLesson = () => {
    if (activeLessonIndex < totalLessons - 1) setActiveLesson(allLessons[activeLessonIndex + 1].id);
  };

  const goToPreviousLesson = () => {
    if (activeLessonIndex > 0) setActiveLesson(allLessons[activeLessonIndex - 1].id);
  };

  const markComplete = () => {
    if (!activeLesson || completedLessons.includes(activeLesson.id)) return;
    setCompletedLessons((prev) => [...prev, activeLesson.id]);
  };

  if (loading.list) {
    return <section className="min-h-screen grid place-items-center text-gray-300">Loading learning workspace...</section>;
  }

  return (
    <section className="min-h-screen bg-[#0b0b10] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between text-sm text-gray-300">
            <span>{course.title}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-[#FF3B30]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.35, ease: "easeOut" }} />
          </div>
        </div>

        <button onClick={() => setIsSidebarOpen((prev) => !prev)} className="mb-4 inline-flex rounded-lg border border-[#FF3B30]/60 bg-[#1a1a23] px-4 py-2 text-sm font-semibold text-[#ff9c95] lg:hidden">
          {isSidebarOpen ? "Hide lessons" : "Show lessons"}
        </button>

        <div className="grid gap-4 lg:grid-cols-[30%_70%]">
          <motion.aside initial={false} animate={{ x: isSidebarOpen ? 0 : -16, opacity: 1 }} className={`max-h-[75vh] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
            <div className="border-b border-white/10 px-4 py-3">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-xs text-gray-400">{totalLessons} lessons</p>
            </div>
            <div className="max-h-[65vh] overflow-y-auto px-3 py-2">
              {course.modules.map((module) => {
                const isOpen = expandedModules.includes(module.id);
                return (
                  <div key={module.id} className="mb-2 rounded-xl border border-white/10 bg-black/20">
                    <button onClick={() => toggleModule(module.id)} className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold text-gray-200 transition hover:bg-white/5">
                      <span>{module.title}</span>
                      <span className="text-[#FF3B30]">{isOpen ? "−" : "+"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                          <ul className="space-y-1 px-2 pb-2">
                            {module.lessons.map((lesson) => {
                              const isActive = activeLesson?.id === lesson.id;
                              const isComplete = completedLessons.includes(lesson.id);
                              return (
                                <li key={lesson.id}>
                                  <button onClick={() => setActiveLesson(lesson.id)} className={`group w-full rounded-lg border px-3 py-2 text-left transition ${isActive ? "border-[#FF3B30]/70 bg-[#FF3B30]/15 shadow-[0_0_15px_rgba(255,59,48,0.35)]" : "border-transparent bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.07]"}`}>
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-sm text-gray-100">{lesson.title}</span>
                                      <span className={`text-xs ${isComplete ? "text-emerald-300" : "text-gray-500"}`}>{isComplete ? "✓" : "○"}</span>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-400">{lesson.duration}</p>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.aside>

          <main className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div key={activeLesson?.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.25 }}>
                <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
                  <div className="absolute inset-0 grid place-items-center text-sm font-medium tracking-wide text-gray-300">Video Player Placeholder</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#FF3B30]">{activeLesson?.moduleTitle}</p>
                  <h1 className="mt-2 text-2xl font-bold">{activeLesson?.title}</h1>
                  <p className="mt-3 text-sm text-gray-300">{activeLesson?.description}</p>
                  <p className="mt-3 text-sm text-gray-400">Duration: {activeLesson?.duration}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button onClick={goToPreviousLesson} disabled={activeLessonIndex <= 0} className="rounded-lg border border-white/15 bg-[#16161e] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:border-[#FF3B30]/60 hover:text-[#ffb8b3] disabled:cursor-not-allowed disabled:opacity-40">Previous Lesson</button>
              <button onClick={goToNextLesson} disabled={activeLessonIndex >= totalLessons - 1} className="rounded-lg border border-[#FF3B30]/50 bg-[#FF3B30]/15 px-4 py-2 text-sm font-semibold text-[#ffd3cf] transition hover:scale-[1.02] hover:bg-[#FF3B30]/25 disabled:cursor-not-allowed disabled:opacity-40">Next Lesson</button>
              <button onClick={markComplete} className="rounded-lg border border-[#FF3B30]/60 bg-[#0f0f15] px-4 py-2 text-sm font-semibold text-[#ff938b] transition hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,59,48,0.35)]">Mark as Complete</button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};
