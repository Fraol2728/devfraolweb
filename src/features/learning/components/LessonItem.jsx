import { CheckCircle2 } from "lucide-react";

export const LessonItem = ({ lesson, index, isActive, isCompleted, onSelect }) => (
  <li>
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex w-full items-center gap-3 rounded-md border-l-2 px-3 py-3 text-left transition duration-200 ${
        isActive
          ? "border-l-[#E10600] bg-[#211414]"
          : "border-l-transparent hover:border-l-[#E10600]/70 hover:bg-[#1A1A1F]"
      }`}
      aria-current={isActive ? "true" : undefined}
    >
      <span
        className={`absolute left-0 top-1.5 h-[calc(100%-12px)] w-[3px] rounded-full bg-[#E10600] transition-opacity ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
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
