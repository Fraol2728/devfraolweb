import { useNavigate } from "react-router-dom";

export const RelatedCourses = ({ courses }) => {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">Related Courses</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <button
            key={course.slug}
            type="button"
            onClick={() => navigate(`/course/${course.slug}`)}
            className="overflow-hidden rounded-xl border border-white/10 bg-black/20 text-left transition hover:-translate-y-1 hover:border-[#ff3b30]/50"
          >
            <img src={course.thumbnail} alt={course.title} className="h-32 w-full object-cover" />
            <div className="space-y-1 p-3">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="line-clamp-2 text-sm text-foreground/70">{course.tagline}</p>
              <p className="text-xs text-foreground/60">{course.level} • {course.duration}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
