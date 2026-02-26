import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { apiFetch } from "@/lib/api";
import { CourseOutline } from "@/features/course/CourseOutline";

export const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModuleId, setOpenModuleId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadCourse = async () => {
      setLoading(true);
      try {
        const payload = await apiFetch(`/api/courses/${slug}`);
        if (!cancelled) {
          setCourse(payload?.data ?? null);
        }
      } catch {
        if (!cancelled) {
          setCourse(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCourse();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!course?.modules?.length) return;
    const firstModule = course.modules[0];
    setOpenModuleId(firstModule.id);
    setSelectedLesson(firstModule.lessons?.[0] ?? null);
  }, [course]);

  useSeoMeta(course
    ? { title: `${course.title} | Dev Fraol Academy`, description: course.description }
    : { title: "Course Detail | Dev Fraol Academy", description: "Live course detail from API." });

  const lessonCount = useMemo(() => course?.modules?.reduce((sum, module) => sum + module.lessons.length, 0) ?? 0, [course]);

  if (!loading && !course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <main className="mx-auto w-full max-w-[1320px] space-y-6 px-4 pb-16 sm:px-6 lg:px-8">
      <Link to="/courses" className="inline-flex text-sm text-[#ff847b] hover:text-[#ff5d52]">← Back to courses</Link>

      {loading ? <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center text-white/75">Loading course details...</div> : null}

      {!loading && course ? (
        <>
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#11121b] via-[#171729] to-[#12121d] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#ff8f87]">{course.category}</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{course.title}</h1>
            <p className="mt-3 max-w-3xl text-sm text-white/75 sm:text-base">{course.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/75">
              <span className="rounded-full bg-white/10 px-3 py-1">Instructor: {course.instructor}</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{course.modules.length} modules</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{lessonCount} lessons</span>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-4 sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Video Preview</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50">
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  className="absolute left-0 top-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${selectedLesson?.youtube_video_id || "dQw4w9WgXcQ"}`}
                  title={selectedLesson?.title || "Course preview"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70">Now playing: {selectedLesson?.title || "Choose a lesson from the outline"}</p>
          </section>

          <CourseOutline
            modules={course.modules}
            openModuleId={openModuleId}
            onToggleModule={setOpenModuleId}
            selectedLessonId={selectedLesson?.id}
            onSelectLesson={(lesson, moduleId) => {
              setOpenModuleId(moduleId);
              setSelectedLesson(lesson);
            }}
          />
        </>
      ) : null}
    </main>
  );
};
