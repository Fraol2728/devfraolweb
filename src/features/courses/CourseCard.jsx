import { Link } from "react-router-dom";

export const CourseCard = ({ course }) => {
  const isProgramming = course.category === "Programming";

  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        isProgramming
          ? "border-[#ff3b30]/45 shadow-[0_0_24px_rgba(255,59,48,0.2)]"
          : "border-white/15 shadow-[0_10px_24px_rgba(0,0,0,0.24)]"
      }`}
    >
      <img src={course.thumbnail} alt={course.title} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-2 text-lg font-semibold text-foreground">{course.title}</h3>
          <span className="shrink-0 rounded-full bg-white/10 px-2 py-1 text-xs text-foreground/80">{course.level}</span>
        </div>

        <p className="line-clamp-2 text-sm text-foreground/70">{course.short_description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs text-foreground/70">
          <p>Instructor: {course.instructor_name}</p>
          <p>{course.lessons_count} lessons</p>
          <p className="col-span-2">Duration: {course.duration}</p>
        </div>

        <Link
          to={`/course/${course.slug}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#ff564c] to-[#ff3b30] px-3 py-2 text-sm font-semibold text-white transition hover:shadow-[0_10px_20px_rgba(255,59,48,0.4)]"
        >
          View Course
        </Link>
      </div>
    </article>
  );
};
