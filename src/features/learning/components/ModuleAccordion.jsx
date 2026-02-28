import { ChevronDown, CheckCircle2 } from "lucide-react";
import { LessonItem } from "@/features/learning/components/LessonItem";

export const ModuleAccordion = ({ module, moduleIndex, isOpen, onToggle, activeLessonId, completedLessonIds, onSelectLesson }) => {
  const moduleName = `Module ${moduleIndex + 1}`;

  return (
    <section className="overflow-hidden rounded-xl border border-[#232326] bg-[#131317]">
      <h2>
        <button
          id={`module-trigger-${module.id}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`module-panel-${module.id}`}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition duration-300 ${
            isOpen
              ? "bg-gradient-to-r from-[#E10600]/30 via-[#E10600]/10 to-transparent shadow-[0_0_20px_rgba(225,6,0,0.2)]"
              : "hover:brightness-110"
          }`}
        >
          <span className="truncate text-sm font-semibold text-white">{moduleName}</span>
          <ChevronDown className={`h-4 w-4 text-[#E10600] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </h2>

      <div
        id={`module-panel-${module.id}`}
        role="region"
        aria-labelledby={`module-trigger-${module.id}`}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="space-y-1 border-t border-[#232326] p-2">
          {module.lessons.map((lesson, lessonIndex) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              index={lessonIndex}
              isActive={lesson.id === activeLessonId}
              isCompleted={completedLessonIds.has(lesson.id)}
              onSelect={() => onSelectLesson(lesson.id)}
            />
          ))}
        </ul>
      </div>

      {isOpen ? (
        <div className="flex items-center justify-end gap-2 border-t border-[#232326] px-4 py-2 text-xs text-[#A1A1AA]">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#E10600]" />
          <span>{completedLessonIds.size} lessons completed</span>
        </div>
      ) : null}
    </section>
  );
};
