import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Lock, Menu } from "lucide-react";

const OutlineBody = ({ modules, activeModuleId, activeLessonId, onToggleModule, onSelectLesson }) => (
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
              <h3 className="text-2xl font-bold text-white">{module.title}</h3>
              <p className="text-xs text-white/55">{module.lessons.length} lessons</p>
            </div>
            <ChevronDown className={`h-5 w-5 text-white/70 transition ${isOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2 overflow-hidden px-3 pb-3"
              >
                {module.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isLocked = lesson.unlocked === false;

                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        disabled={isLocked}
                        onClick={() => onSelectLesson(lesson, module.id)}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left transition ${
                          isActive
                            ? "border-cyan-300/60 bg-cyan-300/15"
                            : "border-white/10 bg-black/20 hover:border-cyan-300/40"
                        } disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        <div>
                          <p className="text-xl font-semibold text-white">{lesson.title}</p>
                          <p className="text-xs text-gray-400">{lesson.duration}</p>
                        </div>
                        {isLocked ? <Lock className="h-4 w-4 text-amber-300" /> : null}
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </section>
      );
    })}
  </div>
);

export const CourseOutline = (props) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
        >
          <Menu className="h-4 w-4" /> Open Course Outline
        </button>
      </div>

      <aside className="hidden rounded-3xl border border-white/15 bg-[#121826]/80 p-5 lg:block">
        <h2 className="mb-4 text-2xl font-bold text-white">Modules & Lessons</h2>
        <OutlineBody {...props} />
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[75vh] overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0b1220] p-5 lg:hidden"
            >
              <h2 className="mb-4 text-2xl font-bold text-white">Modules & Lessons</h2>
              <OutlineBody {...props} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
