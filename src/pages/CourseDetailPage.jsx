import { Link } from "react-router-dom";
import { CourseDetail } from "@/features/courses/CourseDetail";

export const CourseDetailPage = () => {
  return (
    <div className="pb-14">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-4 sm:px-6 lg:px-8">
        <Link to="/courses" className="inline-flex text-sm font-medium text-[#7dd3fc] transition hover:text-[#38bdf8]">
          ← Back to courses
        </Link>
      </div>
      <CourseDetail />
    </div>
  );
};
