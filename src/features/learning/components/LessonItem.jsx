import { CheckCircle2 } from "lucide-react";

export const LessonItem = ({ lesson, index, isActive, isCompleted, onSelect }) => (
  <li>
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex w-full items-center gap-3 border-l-2 px-3 py-3 text-left transition duration-200 ${
        isActive
          ? "border-l-[#E10600] bg-[#1B1B1F]"
          : "border-l-transparent hover:border-l-[#E10600]/80 hover:bg-[#19191d]"
      }`}
      aria-current={isActive ? "true" : undefined}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[3px] bg-[#E10600] transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm ${isActive ? "font-semibold text-white" : "font-medium text-[#D4D4D8]"}`}>
          {index + 1}. {lesson.title}
        </p>
      </div>
      {isCompleted ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E10600]" aria-label="Completed lesson" /> : null}
    </button>
  </li>
);
