import { Link, useParams } from "react-router-dom";
import { courses, getCourseBySlug } from "@/data/courses";
import { CTAButtons } from "@/features/courses/CTAButtons";
import { CourseCurriculum } from "@/features/courses/CourseCurriculum";
import { CourseHero } from "@/features/courses/CourseHero";
import { CourseInstructor } from "@/features/courses/CourseInstructor";
import { CourseOverview } from "@/features/courses/CourseOverview";
import { RelatedCourses } from "@/features/courses/RelatedCourses";

export const CourseDetail = () => {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);

  if (!course) {
    return (
      <section className="py-20">
        <p>Course not found.</p>
        <Link to="/courses" className="text-primary">
          Back to courses
        </Link>
      </section>
    );
  }

  const relatedCourses = courses.filter((item) => item.category === course.category && item.slug !== course.slug).slice(0, 4);

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-5xl space-y-8 text-left">
        <CourseHero course={course} />
        <CourseOverview course={course} />
        <CourseCurriculum curriculum={course.curriculum} />
        <CourseInstructor instructor={course.instructor} />
        <CTAButtons course={course} />
        <RelatedCourses courses={relatedCourses} />
      </div>
    </section>
  );
};
