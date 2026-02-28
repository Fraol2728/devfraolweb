import { ChevronDown } from "lucide-react";
import { LessonItem } from "@/features/learning/components/LessonItem";

export const Module = ({ module, moduleIndex, isOpen, onToggle, activeLessonId, completedLessonIds, onSelectLesson }) => {
  const completedCount = module.lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;
  const progress = module.lessons.length ? Math.round((completedCount / module.lessons.length) * 100) : 0;

  return (
    <section className="border-b border-[#232326] pb-2">
      <h2>
        <button
          id={`module-trigger-${module.id}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`module-panel-${module.id}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-3 px-2 py-3 text-left"
        >
          <span className="text-sm font-semibold text-white">{moduleIndex + 1}. {module.title}</span>
          <ChevronDown className={`h-4 w-4 text-[#A1A1AA] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </h2>

      <div className="px-2 pb-2">
        <progress
          className="h-0.5 w-full [&::-moz-progress-bar]:bg-[#E10600] [&::-webkit-progress-bar]:bg-[#232326] [&::-webkit-progress-value]:bg-[#E10600]"
          max="100"
          value={progress}
          aria-label={`${module.title} completion`}
        />
      </div>

      <div
        id={`module-panel-${module.id}`}
        role="region"
        aria-labelledby={`module-trigger-${module.id}`}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="space-y-1 pb-2">
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
    </section>
  );
};
