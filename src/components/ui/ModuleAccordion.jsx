import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock3 } from "lucide-react";
import { LessonItem } from "@/components/ui/LessonItem";

export const ModuleAccordion = ({ module, isOpen, onToggle, activeLessonId, onLessonSelect }) => (
  <article
    className={`rounded-2xl border transition ${
      isOpen ? "border-[#ff6c63]/70 bg-[#ff6c63]/10" : "border-white/10 bg-black/10"
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:px-5"
    >
      <div>
        <h3 className="text-base font-semibold text-foreground sm:text-lg">{module.title}</h3>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs text-foreground/80">
          <Clock3 className="h-3.5 w-3.5" /> {module.lessons.length} lessons
        </div>
      </div>
      <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-foreground/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>

    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.div
          key="module-content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <ul className="space-y-2 px-4 pb-4 sm:px-5">
            {module.lessons.map((lesson, index) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                index={index}
                isActive={lesson.id === activeLessonId}
                onClick={() => onLessonSelect(lesson, module.id)}
              />
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  </article>
);
