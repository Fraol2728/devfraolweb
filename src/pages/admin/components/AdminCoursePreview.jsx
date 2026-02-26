import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, PlayCircle, X } from "lucide-react";
import logoDark from "@/assets/Logo dark.png";

const getLessonPreviewState = (lesson = {}) => Boolean(lesson.isFreePreview || lesson.freePreview || lesson.isPreview);

const getYoutubeEmbedUrl = (lesson = {}) => {
  if (lesson.youtubePreviewUrl) return lesson.youtubePreviewUrl;
  if (lesson.youtubeUrl) return lesson.youtubeUrl;
  if (lesson.youtubeVideoId) return `https://www.youtube.com/embed/${lesson.youtubeVideoId}`;
  return "";
};

export const AdminCoursePreview = ({ isOpen, course, onClose }) => {
  const [openModuleIds, setOpenModuleIds] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const overlayRef = useRef(null);

  const modules = useMemo(() => course?.modules || [], [course]);

  useEffect(() => {
    if (!isOpen) return;
    setOpenModuleIds(modules.map((module, index) => module.id || module.clientId || `module-${index}`));
    const firstLesson = modules.find((module) => module?.lessons?.length)?.lessons?.[0] || null;
    setActiveLesson(firstLesson);
  }, [isOpen, modules]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const toggleModule = (moduleId) => {
    setOpenModuleIds((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]));
  };

  return (
    <AnimatePresence>
      {isOpen && course ? (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Course preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/65 md:left-72"
          onMouseDown={(event) => {
            if (event.target === overlayRef.current) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.995 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex h-full w-full flex-col bg-zinc-950/95"
          >
            <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-zinc-950/95 px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <img src={logoDark} alt="Dev Fraol Academy" className="h-8 w-auto" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#ff8d85]">Course Preview</p>
                  <h2 className="text-sm font-semibold text-white md:text-base">{course.title || "Untitled course"}</h2>
                </div>
              </div>
              <button type="button" onClick={onClose} className="rounded-lg border border-white/10 p-2 text-zinc-200 hover:border-[#FF3B30]/45" aria-label="Close preview">
                <X size={16} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-5">
              <section className="grid gap-4 rounded-2xl border border-white/10 bg-zinc-900/55 p-4 md:grid-cols-[1.3fr,1fr]">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">{course.category || "Uncategorized"}</p>
                  <h3 className="text-2xl font-bold text-white">{course.title || "Untitled course"}</h3>
                  <p className="text-sm text-zinc-300">By {course.instructor || "Unknown instructor"}</p>
                  <p className="pt-2 text-sm leading-relaxed text-zinc-300">{course.description || "No description provided yet."}</p>
                </div>
                <div>
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={`${course.title} thumbnail`} className="h-56 w-full rounded-xl border border-white/10 object-cover" />
                  ) : (
                    <div className="flex h-56 w-full items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/25 text-sm text-zinc-500">No thumbnail available</div>
                  )}
                </div>
              </section>

              <section className="mt-4 grid gap-4 xl:grid-cols-[1.25fr,0.75fr]">
                <div className="space-y-3">
                  {(modules || []).map((module, moduleIndex) => {
                    const moduleId = module.id || module.clientId || `module-${moduleIndex}`;
                    const isOpen = openModuleIds.includes(moduleId);

                    return (
                      <article key={moduleId} className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/45">
                        <button type="button" onClick={() => toggleModule(moduleId)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
                          <div>
                            <h4 className="text-base font-semibold text-white">{module.title || `Module ${moduleIndex + 1}`}</h4>
                            <p className="text-xs text-zinc-400">{module.duration || "Duration not set"}</p>
                          </div>
                          {isOpen ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="space-y-2 overflow-hidden border-t border-white/10 px-3 py-3"
                            >
                              {(module.lessons || []).map((lesson, lessonIndex) => {
                                const isFreePreview = getLessonPreviewState(lesson);
                                const isActive = activeLesson === lesson;

                                return (
                                  <motion.li key={lesson.id || lesson.clientId || `${moduleId}-lesson-${lessonIndex}`} layout>
                                    <button
                                      type="button"
                                      onClick={() => setActiveLesson(lesson)}
                                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                                        isActive
                                          ? "border-[#FF7C73]/60 bg-[#FF3B30]/15 text-white"
                                          : "border-white/10 bg-black/20 text-zinc-200 hover:border-[#FF7C73]/45"
                                      }`}
                                    >
                                      <span className="inline-flex items-center gap-2">
                                        <PlayCircle className="h-4 w-4" />
                                        {lessonIndex + 1}. {lesson.title || `Lesson ${lessonIndex + 1}`}
                                      </span>
                                      <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
                                        {isFreePreview ? <span className="rounded-full border border-emerald-400/45 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">Free Preview</span> : null}
                                        {lesson.duration || "--"}
                                      </span>
                                    </button>
                                  </motion.li>
                                );
                              })}
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>
                      </article>
                    );
                  })}
                </div>

                <aside className="space-y-3 rounded-2xl border border-white/10 bg-zinc-900/50 p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-300">Lesson Preview</h4>
                  <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    {getYoutubeEmbedUrl(activeLesson) ? (
                      <iframe
                        title={activeLesson?.title || "Lesson preview"}
                        src={getYoutubeEmbedUrl(activeLesson)}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-4 text-center text-sm text-zinc-400">YouTube preview placeholder (no lesson video URL provided).</div>
                    )}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="text-xs text-zinc-400">Selected lesson</p>
                    <p className="mt-1 text-sm font-medium text-zinc-100">{activeLesson?.title || "Select a lesson to preview"}</p>
                  </div>
                </aside>
              </section>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
