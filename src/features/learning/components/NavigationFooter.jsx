import { Link } from "react-router-dom";

export const NavigationFooter = ({ lessonPosition, lessonCount, hasPrevious, hasNext, onPrevious, onNext, courseSlug }) => (
  <>
    <div className="hidden border-t border-[#232326] px-6 py-4 md:flex md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="rounded-lg border border-[#E10600] px-4 py-2 text-sm font-semibold text-[#E10600] transition hover:bg-[#E10600]/10 disabled:cursor-not-allowed disabled:border-[#3F3F46] disabled:text-[#71717A]"
        >
          Previous Lesson
        </button>
        <Link
          to={`/courses/${courseSlug}`}
          className="rounded-lg border border-[#3F3F46] px-4 py-2 text-sm font-semibold text-[#D4D4D8] transition hover:border-[#E10600] hover:text-white"
        >
          Course Details
        </Link>
      </div>
      <p className="text-sm text-[#A1A1AA]">Lesson {lessonPosition} of {lessonCount}</p>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className="rounded-lg bg-[#E10600] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c00500] disabled:cursor-not-allowed disabled:bg-[#3F3F46]"
      >
        Next Lesson
      </button>
    </div>

    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#232326] bg-[#151518] px-4 py-3 md:hidden">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="rounded-lg border border-[#E10600] px-3 py-2 text-sm font-semibold text-[#E10600] disabled:cursor-not-allowed disabled:border-[#3F3F46] disabled:text-[#71717A]"
        >
          Previous
        </button>
        <p className="text-center text-xs text-[#A1A1AA]">{lessonPosition}/{lessonCount}</p>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="rounded-lg bg-[#E10600] px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#3F3F46]"
        >
          Next
        </button>
      </div>
      <Link
        to={`/courses/${courseSlug}`}
        className="mt-2 block rounded-lg border border-[#3F3F46] px-3 py-2 text-center text-sm font-semibold text-[#D4D4D8] transition hover:border-[#E10600] hover:text-white"
      >
        Back to Course Details
      </Link>
    </div>
  </>
);
