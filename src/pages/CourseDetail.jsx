import { Link, useParams } from "react-router-dom";
import { getCourseBySlug } from "@/data/courses";
import { CourseDetail as CourseDetailFeature } from "@/features/courses/CourseDetail";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const CourseDetail = () => {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);

  useSeoMeta(
    course
      ? {
          title: `${course.title} | Dev Fraol Academy Courses`,
          description: course.description,
          ogTitle: `${course.title} | Dev Fraol Academy`,
        }
      : {
          title: "Course not found | Dev Fraol Academy",
          description: "This course is currently unavailable. Explore our full course catalog for updated learning paths.",
        },
  );

  if (!course) {
    return (
      <section className="py-20 text-center transition-colors duration-300">
        <p className="text-gray-900 transition-colors duration-300 dark:text-white">Course not found.</p>
        <Link to="/courses" className="mt-3 inline-flex text-red-700 transition-colors duration-300 hover:text-red-600 dark:text-primary">
          Back to courses
        </Link>
      </section>
    );
  }

  return <CourseDetailFeature course={course} />;
};
