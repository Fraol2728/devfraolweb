import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";

export const CourseDetailModules = ({ modules, openModuleId, onToggleModule, activeLessonId, onSelectLesson }) => (
  <section>
    <h2 className="text-2xl font-semibold text-white">Course Content</h2>
    <div className="mt-4 max-h-[640px] space-y-4 overflow-y-auto pr-1">
      {modules.map((module, index) => {
        const moduleName = `Module ${index + 1}`;
        const isOpen = module.id === openModuleId;

        return (
          <motion.article
            key={module.id}
            whileHover={{ y: -2 }}
            className={`overflow-hidden rounded-2xl border border-[#232326] bg-[#151518] transition duration-300 ${
              isOpen ? "shadow-[0_0_24px_rgba(225,6,0,0.22)]" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => onToggleModule(module.id)}
              className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition duration-300 ${
                isOpen
                  ? "bg-gradient-to-r from-[#E10600]/25 via-[#E10600]/12 to-transparent brightness-110"
                  : "hover:bg-[#1A1A1F]"
              }`}
              aria-expanded={isOpen}
              aria-controls={`course-module-panel-${module.id}`}
              id={`course-module-trigger-${module.id}`}
            >
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">{moduleName}</h3>
                <p className="text-sm text-[#A1A1AA]">{module.lessons.length} lessons</p>
              </div>
              <ChevronDown className={`h-5 w-5 text-[#E10600] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`course-module-panel-${module.id}`}
                  role="region"
                  aria-labelledby={`course-module-trigger-${module.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-[#232326]"
                >
                  <ul className="px-4 py-2">
                    {module.lessons.map((lesson) => {
                      const isActive = activeLessonId === lesson.id;

                      return (
                        <li key={lesson.id} className="border-b border-[#232326] last:border-b-0">
                          <button
                            type="button"
                            onClick={() => onSelectLesson(lesson.id)}
                            className={`group relative flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition ${
                              isActive ? "bg-[#1C1212]" : "hover:bg-[#1B1B1F]"
                            }`}
                          >
                            <span
                              className={`absolute left-0 top-2 h-[calc(100%-16px)] w-[3px] rounded-full bg-[#E10600] transition-opacity ${
                                isActive ? "opacity-100" : "opacity-0"
                              }`}
                              aria-hidden="true"
                            />
                            <p className={`truncate pl-3 text-sm ${isActive ? "font-semibold text-white" : "font-medium text-[#D4D4D8]"}`}>
                              {lesson.title}
                            </p>
                            {lesson.completed ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E10600]" aria-hidden="true" /> : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  </section>
);
