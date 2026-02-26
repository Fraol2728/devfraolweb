import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, PlayCircle, Sparkles } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const COURSE_REFRESH_EVENT = "course:updated";

const toEmbedUrl = (videoUrl = "") => {
  const videoId = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")
    ? videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop()
    : videoUrl;

  return `https://www.youtube.com/embed/${videoId || "dQw4w9WgXcQ"}`;
};

const findFirstLesson = (modules = []) => {
  for (const module of modules) {
    const preferred = module.lessons?.find((lesson) => lesson.freePreview || lesson.isPreview) || module.lessons?.[0];
    if (preferred) return preferred;
  }
  return null;
};

const loadCourseDetail = async (routeKey) => {
  try {
    const payload = await apiFetch(`/api/courses/slug/${routeKey}`);
    return payload?.data ?? null;
  } catch {
    const payload = await apiFetch(`/api/courses/${routeKey}`);
    return payload?.data ?? null;
  }
};

export const CourseDetailPage = () => {
  const { slug, courseId } = useParams();
  const routeKey = slug || courseId;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openModuleId, setOpenModuleId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLiveBadge, setShowLiveBadge] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const syncCourse = async (showLoader = false) => {
      if (showLoader) setLoading(true);
      else setIsRefreshing(true);

      try {
        const data = await loadCourseDetail(routeKey);
        if (!cancelled) setCourse(data);
      } catch {
        if (!cancelled) setCourse(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setIsRefreshing(false);
        }
      }
    };

    syncCourse(true);
    const intervalId = setInterval(() => syncCourse(false), 5000);

    const onCourseUpdate = (event) => {
      const detail = event?.detail || {};
      const shouldRefresh = detail.courseId ? detail.courseId === course?.id || detail.courseId === routeKey : true;
      if (!shouldRefresh && detail.slug !== routeKey) return;
      setShowLiveBadge(true);
      syncCourse(false);
      setTimeout(() => setShowLiveBadge(false), 2200);
    };

    window.addEventListener(COURSE_REFRESH_EVENT, onCourseUpdate);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
      window.removeEventListener(COURSE_REFRESH_EVENT, onCourseUpdate);
    };
  }, [course?.id, routeKey]);

  useEffect(() => {
    if (!course?.modules?.length) return;

    const preferredModule = course.modules.find((module) => module.id === openModuleId) || course.modules[0];
    setOpenModuleId(preferredModule.id);

    const allLessonIds = new Set(course.modules.flatMap((module) => (module.lessons || []).map((lesson) => lesson.id)));
    if (!selectedLesson || !allLessonIds.has(selectedLesson.id)) {
      setSelectedLesson(findFirstLesson(course.modules));
    }
  }, [course, openModuleId, selectedLesson]);

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
                  {showLiveBadge ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-200"><Sparkles className="h-3.5 w-3.5" /> Module updated</span>
                  ) : null}
                </div>
              </div>
              <img src={course.thumbnail} alt={course.title} className="h-44 w-full rounded-2xl object-cover" />
            </div>
          </motion.section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
            <motion.div layout className="overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-4 sm:p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">Lesson Preview</h2>
              <AnimatePresence mode="wait">
                <motion.div key={selectedLesson?.id || "placeholder"} initial={{ opacity: 0.25, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                  <div className="relative w-full pb-[56.25%]">
                    <iframe
                      className="absolute left-0 top-0 h-full w-full"
                      src={toEmbedUrl(selectedLesson?.videoUrl || selectedLesson?.youtubeVideoId)}
                      title={selectedLesson?.title || "Course preview"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              <p className="mt-3 text-sm text-white/70">Now playing: {selectedLesson?.title || "Choose a lesson from the module list"}</p>
            </motion.div>

            <div className="space-y-3">
              {isRefreshing ? (
                <div className="space-y-2 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-full animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-white/10" />
                </div>
              ) : null}

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
                        <p className="text-xs text-white/70">{module.description || "Detailed learning outcomes added by Admin."}</p>
                      </div>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown className="h-4 w-4 text-white/70" /></motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-white/10"
                        >
                          <ul className="space-y-1 p-3">
                            {(module.lessons || []).map((lesson) => {
                              const isSelected = selectedLesson?.id === lesson.id;
                              return (
                                <motion.li key={lesson.id} layout>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedLesson(lesson)}
                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${isSelected ? "bg-[#ff3b30]/20 text-white" : "hover:bg-white/5 text-white/80"}`}
                                  >
                                    <span className="inline-flex items-center gap-2 text-sm"><PlayCircle className="h-4 w-4" />{lesson.title}</span>
                                    {lesson.freePreview || lesson.isPreview ? <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">Free Preview</span> : null}
                                  </button>
                                </motion.li>
                              );
                            })}
                          </ul>
                        </motion.div>
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

export default CourseDetailPage;
