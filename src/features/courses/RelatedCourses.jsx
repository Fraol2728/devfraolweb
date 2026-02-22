import { Link } from "react-router-dom";

export const RelatedCourses = ({ courses = [] }) => {
  if (!courses.length) return null;

  return (
    <section className="text-left transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">Related Courses</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <article key={course.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60 dark:shadow-none">
            <p className="text-xs uppercase tracking-wide text-red-700 transition-colors duration-300 dark:text-[#ff9b94]">{course.category}</p>
            <h3 className="mt-2 text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-white">{course.title}</h3>
            <p className="mt-2 text-sm text-gray-700 transition-colors duration-300 dark:text-gray-300">{course.description}</p>
            <Link to={`/courses/${course.slug}`} className="mt-4 inline-flex text-sm font-semibold text-red-700 transition-colors duration-300 hover:text-red-600 dark:text-[#ff9b94] dark:hover:text-[#FF3B30]">
              View course →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
