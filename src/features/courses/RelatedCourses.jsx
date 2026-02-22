import { Link } from "react-router-dom";

export const RelatedCourses = ({ courses = [] }) => {
  if (!courses.length) return null;

  return (
    <section className="text-left">
      <h2 className="text-2xl font-bold text-white">Related Courses</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <article key={course.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-[#ff9b94]">{course.category}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{course.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{course.description}</p>
            <Link to={`/courses/${course.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[#ff9b94] hover:text-[#FF3B30]">
              View course →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
