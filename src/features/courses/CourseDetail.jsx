import { useMemo, useState } from "react";
import { CourseOutline } from "@/features/courses/CourseOutline";
import { LessonPanel } from "@/features/courses/LessonPanel";
import { mockCourseData } from "@/features/courses/mockCourseData";

export const CourseDetail = () => {
  const initialModuleId = mockCourseData.modules[0]?.id ?? null;
  const firstLesson = mockCourseData.modules[0]?.lessons[0] ?? null;

  const [activeModuleId, setActiveModuleId] = useState(initialModuleId);
  const [activeLessonId, setActiveLessonId] = useState(firstLesson?.id ?? null);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  const selectedLessonContent = useMemo(() => {
    return mockCourseData.modules.flatMap((module) => module.lessons).find((lesson) => lesson.id === activeLessonId) ?? null;
  }, [activeLessonId]);

  const handleLessonSelect = (lesson, moduleId) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lesson.id);
    setIsMobilePanelOpen(true);
  };

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">Course Detail</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{mockCourseData.title}</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(290px,33%)_minmax(0,67%)] lg:items-start">
        <CourseOutline
          modules={mockCourseData.modules}
          activeModuleId={activeModuleId}
          activeLessonId={activeLessonId}
          onToggleModule={setActiveModuleId}
          onSelectLesson={handleLessonSelect}
        />

        <LessonPanel lesson={selectedLessonContent} isMobileOpen={isMobilePanelOpen} onCloseMobile={() => setIsMobilePanelOpen(false)} />
      </div>
    </section>
  );
};
