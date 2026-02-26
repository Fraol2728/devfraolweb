import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock3, PlayCircle } from "lucide-react";

export const CourseOutline = ({ modules = [], openModuleId, onToggleModule, selectedLessonId, onSelectLesson }) => {
  if (!modules.length) {
    return (
      <section className="rounded-3xl border border-white/10 bg-black/20 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Course Outline</h2>
        <p className="mt-3 text-sm text-white/70">No modules are available for this course yet.</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-black/25 p-4 shadow-[0_20px_45px_rgba(10,10,20,0.35)] sm:p-6">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#ff8b82]">Course Outline</p>
          <h2 className="mt-1 text-2xl font-bold text-white">Modules & Lessons</h2>
        </div>
        <p className="text-xs text-white/60 sm:text-sm">{modules.length} modules</p>
      </div>

      <div className="space-y-3">
        {modules.map((module) => {
          const isOpen = openModuleId === module.id;

          return (
            <article
              key={module.id}
              className={`overflow-hidden rounded-2xl border transition ${
                isOpen ? "border-[#ff6c63] bg-[#ff6c63]/10" : "border-white/10 bg-white/5"
              }`}
            >
              <button
                type="button"
                onClick={() => onToggleModule(isOpen ? null : module.id)}
                className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
              >
                <div>
                  <h3 className="text-base font-semibold text-white sm:text-lg">{module.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{module.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/75">
                    <Clock3 className="h-3.5 w-3.5" /> {module.duration}
                  </span>
                </div>

                <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-2 overflow-hidden px-4 pb-4"
                  >
                    {module.lessons.map((lesson, index) => {
                      const isSelected = selectedLessonId === lesson.id;

                      return (
                        <li key={lesson.id}>
                          <button
                            type="button"
                            onClick={() => onSelectLesson(lesson, module.id)}
                            className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                              isSelected
                                ? "border-[#ff6c63] bg-[#ff6c63]/20 text-white"
                                : "border-white/10 bg-black/20 text-white/85 hover:border-[#ff6c63]/50"
                            }`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <PlayCircle className="h-4 w-4" />
                              {index + 1}. {lesson.title}
                            </span>
                            <span className="text-xs text-white/65">{lesson.duration}</span>
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
  );
};
