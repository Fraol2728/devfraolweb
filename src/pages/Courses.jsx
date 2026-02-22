import { Link } from "react-router-dom";
import { courses } from "@/data/courses";

export const Courses = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container max-w-6xl mx-auto text-left">
        <h1 className="text-4xl sm:text-5xl font-bold">Courses</h1>
        <p className="text-muted-foreground mt-4">Explore all Dev Fraol programs across Web Development and Graphic Design.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {courses.map((course) => (
            <article key={course.slug} className="rounded-2xl border border-border bg-card/70 p-6">
              <p className="text-xs uppercase text-primary">{course.category}</p>
              <h2 className="text-2xl font-semibold mt-2">{course.title}</h2>
              <p className="text-muted-foreground mt-3">{course.shortDescription}</p>
              <div className="flex justify-between text-sm mt-4 text-muted-foreground">
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>
              <Link to={`/courses/${course.slug}`} className="inline-block mt-5 text-primary font-medium hover:underline">View Details</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
