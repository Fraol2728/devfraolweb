import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, PlayCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const toEmbedUrl = (youtubeVideoId = "") => {
  const videoId = youtubeVideoId.includes("youtube.com") || youtubeVideoId.includes("youtu.be")
    ? youtubeVideoId.split("v=")[1]?.split("&")[0] || youtubeVideoId.split("/").pop()
    : youtubeVideoId;

  return `https://www.youtube.com/embed/${videoId || "dQw4w9WgXcQ"}`;
};

export const CourseDetailPage = () => {
  const { slug, courseId } = useParams();
  const routeKey = slug || courseId;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModuleId, setOpenModuleId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadCourse = async (showLoader = false) => {
      if (showLoader) setLoading(true);
      try {
        const payload = await apiFetch(`/api/courses/${routeKey}`);
        if (!cancelled) {
          const data = payload?.data ?? null;
          setCourse(data);
        }
      } catch {
        if (!cancelled) setCourse(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCourse(true);
    const intervalId = setInterval(() => loadCourse(false), 12000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [routeKey]);

  useEffect(() => {
    if (!course?.modules?.length) return;
    const firstModule = course.modules[0];
    setOpenModuleId((prev) => prev || firstModule.id);
    const firstLesson = firstModule.lessons?.find((lesson) => lesson.isPreview) || firstModule.lessons?.[0] || null;
    setSelectedLesson((prev) => prev || firstLesson);
  }, [course]);

  useSeoMeta(course
    ? { title: `${course.title} | Dev Fraol Academy`, description: course.description }
    : { title: "Course Detail | Dev Fraol Academy", description: "Dynamic course detail from admin-powered backend." });

  const lessonCount = useMemo(() => course?.modules?.reduce((sum, module) => sum + (module.lessons?.length ?? 0), 0) ?? 0, [course]);

  if (!loading && !course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <main className="mx-auto w-full max-w-[1320px] space-y-6 px-4 pb-16 sm:px-6 lg:px-8">
      <Link to="/courses" className="inline-flex text-sm text-[#ff847b] hover:text-[#ff5d52]">← Back to courses</Link>

      {loading ? <div className="h-48 animate-pulse rounded-2xl border border-white/10 bg-black/20" /> : null}

      {!loading && course ? (
        <>
          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#11121b] via-[#171729] to-[#12121d] p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#ff8f87]">{course.category}</p>
                <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{course.title}</h1>
                <p className="mt-3 max-w-3xl text-sm text-white/75 sm:text-base">{course.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/75">
                  <span className="rounded-full bg-white/10 px-3 py-1">Instructor: Dev Fraol</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">{course.modules.length} modules</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">{lessonCount} lessons</span>
                </div>
              </div>
              <img src={course.thumbnail} alt={course.title} className="h-44 w-full rounded-2xl object-cover" />
            </div>
          </motion.section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
            <motion.div layout className="overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-4 sm:p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">Lesson Preview</h2>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                <div className="relative w-full pb-[56.25%]">
                  <motion.iframe
                    key={selectedLesson?.id}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    className="absolute left-0 top-0 h-full w-full"
                    src={toEmbedUrl(selectedLesson?.youtubeVideoId)}
                    title={selectedLesson?.title || "Course preview"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <p className="mt-3 text-sm text-white/70">Now playing: {selectedLesson?.title || "Choose a lesson from the module list"}</p>
            </motion.div>

            <div className="space-y-3">
              {course.modules.map((module) => {
                const isOpen = openModuleId === module.id;
                return (
                  <article key={module.id} className="overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                    <button
                      type="button"
                      onClick={() => setOpenModuleId(isOpen ? null : module.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-white">{module.title}</h3>
                        <p className="text-xs text-white/65">{module.description}</p>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-2 overflow-hidden px-4 pb-4"
                        >
                          {module.lessons?.map((lesson) => {
                            const active = selectedLesson?.id === lesson.id;
                            return (
                              <li key={lesson.id}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedLesson(lesson)}
                                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                                    active ? "border-[#ff6c63] bg-[#ff6c63]/20 text-white" : "border-white/10 bg-black/20 text-white/85"
                                  }`}
                                >
                                  <span className="inline-flex items-center gap-2">
                                    <PlayCircle className="h-4 w-4" /> {lesson.title}
                                  </span>
                                  <span className="text-xs text-white/70">{lesson.isPreview ? "Free preview" : "Locked"}</span>
                                </button>
                              </li>
                            );
                          })}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
};
