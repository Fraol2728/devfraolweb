import { motion } from "framer-motion";
import { ChevronDown, Lock, PlayCircle } from "lucide-react";

export const CurriculumSidebar = ({
  course,
  modules,
  openModuleId,
  onToggleModule,
  activeLessonId,
  onSelectLesson,
  showEnroll,
}) => {
  return (
    <aside className="rounded-3xl border border-white/15 bg-background/70 p-4 shadow-[0_18px_45px_rgba(15,20,35,0.3)] backdrop-blur-xl lg:sticky lg:top-20 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <div className="mb-4 border-b border-white/10 pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[#ff8078]">Course Player</p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{course.title}</h3>
      </div>

      <div className="space-y-3">
        {modules.map((module) => {
          const isOpen = module.id === openModuleId;
          return (
            <div key={module.id} className="rounded-2xl border border-white/10 bg-black/10">
              <button
                type="button"
                onClick={() => onToggleModule(module.id)}
                className="flex w-full items-center justify-between px-3 py-3 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{module.title}</p>
                  <p className="text-xs text-foreground/60">{module.lessons.length} lessons</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-foreground/70 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0 }} className="overflow-hidden">
                <div className="space-y-2 px-2 pb-3">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => onSelectLesson(lesson)}
                        className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                          isActive
                            ? "border-[#ff4d43] bg-[#ff4d43]/15"
                            : "border-white/10 bg-white/5 hover:border-[#ff4d43]/50"
                        }`}
                      >
                        <p className="line-clamp-2 text-sm font-medium text-foreground">{lesson.title}</p>
                        <div className="mt-1 flex items-center justify-between text-xs">
                          <span className="text-foreground/60">{lesson.duration}</span>
                          {lesson.is_preview ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
                              <PlayCircle className="h-3 w-3" /> Preview
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-amber-300">
                              <Lock className="h-3 w-3" /> Locked
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {showEnroll ? (
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#ff5d52] to-[#ff3b30] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,59,48,0.35)]"
        >
          Enroll Now to unlock all lessons
        </button>
      ) : null}
    </aside>
  );
};
