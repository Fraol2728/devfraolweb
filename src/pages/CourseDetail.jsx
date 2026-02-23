import { Link, useParams } from "react-router-dom";
import { CTAButtons } from "@/features/courses/CTAButtons";
import { CourseCurriculum } from "@/features/courses/CourseCurriculum";
import { CourseHero } from "@/features/courses/CourseHero";
import { CourseInstructor } from "@/features/courses/CourseInstructor";
import { CourseOverview } from "@/features/courses/CourseOverview";
import { RelatedCourses } from "@/features/courses/RelatedCourses";
import { useMockApi } from "@/context/MockApiContext";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const CourseDetail = () => {
  const { id } = useParams();
  const { courses = [], loading } = useMockApi();
  const course = courses.find((item) => item.slug === id || item.id === id);

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

  if (loading.list) {
    return <section className="py-20 text-center text-gray-400">Loading course details...</section>;
  }

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

  const relatedCourses = courses.filter((item) => item.category === course.category && item.slug !== course.slug).slice(0, 4);

  return (
    <section className="px-4 py-16 sm:px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl space-y-8 text-left">
        <CourseHero course={course} />
        <CourseOverview course={course} />
        <CourseCurriculum curriculum={course.curriculum ?? []} courseId={course.id || course.slug} />
        <CourseInstructor instructor={course.instructor} />
        <CTAButtons course={course} />
        <RelatedCourses courses={relatedCourses} />
      </div>
    </section>
  );
};
