import { Link } from "react-router-dom";
import { courses } from "@/data/courses";

export const CoursesPage = () => {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Courses</h1>
        <p className="text-muted-foreground mb-10">Explore all Web Development and Graphic Design programs.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <article key={course.id} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="text-sm text-primary mb-3">{course.level} • {course.duration}</p>
              <p className="text-muted-foreground mb-5">{course.description}</p>
              <Link to={`/courses/${course.slug}`} className="inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
                View Details
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
