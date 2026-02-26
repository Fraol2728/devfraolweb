import { useNavigate } from "react-router-dom";

export const RelatedCourses = ({ courses = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-white/15 bg-background/70 p-6 shadow-[0_18px_40px_rgba(12,18,30,0.25)] backdrop-blur-xl sm:p-8">
      <h2 className="text-2xl font-semibold text-foreground">Related Courses</h2>
      <p className="mt-1 text-sm text-foreground/70">More from our Programming category.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <button
            key={course.id}
            type="button"
            onClick={() => navigate(`/course/${course.slug || course.id}`)}
            className="overflow-hidden rounded-2xl border border-white/15 bg-black/10 text-left transition hover:-translate-y-0.5 hover:border-[#ff5d52]/60"
          >
            <img src={course.thumbnail} alt={course.title} className="h-36 w-full object-cover" />
            <div className="space-y-2 p-4">
              <h3 className="line-clamp-2 text-base font-semibold text-foreground">{course.title}</h3>
              <p className="text-xs text-foreground/65">{course.level} · {course.duration}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
