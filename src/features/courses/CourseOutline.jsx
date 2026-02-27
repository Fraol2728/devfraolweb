import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, PlayCircle } from "lucide-react";

export const CourseOutline = ({ modules, activeModuleId, activeLessonId, onToggleModule, onSelectLesson }) => {
  return (
    <aside className="rounded-3xl border border-white/15 bg-[#121826]/80 p-4 shadow-[0_20px_50px_rgba(3,8,18,0.45)] backdrop-blur-xl sm:p-6">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">Course Outline</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Modules & Lessons</h2>
      </header>

      <div className="space-y-3">
        {modules.map((module) => {
          const isOpen = module.id === activeModuleId;
          return (
            <section key={module.id} className="rounded-2xl border border-white/10 bg-white/[0.03]">
              <button
                type="button"
                onClick={() => onToggleModule(isOpen ? null : module.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-white sm:text-base">{module.title}</p>
                  <p className="mt-1 text-xs text-white/60">{module.lessons.length} lessons</p>
                </div>
                <ChevronDown className={`h-5 w-5 text-white/65 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-2 overflow-hidden px-3 pb-3"
                  >
                    {module.lessons.map((lesson, index) => {
                      const isActive = lesson.id === activeLessonId;
                      return (
                        <li key={lesson.id}>
                          <button
                            type="button"
                            onClick={() => onSelectLesson(lesson, module.id)}
                            className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                              isActive
                                ? "border-cyan-300/70 bg-cyan-300/15"
                                : "border-white/10 bg-black/20 hover:border-cyan-300/40"
                            }`}
                          >
                            <span
                              className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                                isActive ? "bg-cyan-300 text-slate-950" : "bg-white/10 text-white/70"
                              }`}
                            >
                              {index + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-white">{lesson.title}</p>
                              <p className="text-xs text-white/55">{lesson.duration}</p>
                            </div>
                            <PlayCircle className={`h-4 w-4 shrink-0 ${isActive ? "text-cyan-200" : "text-white/40 group-hover:text-cyan-200"}`} />
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </aside>
  );
};
