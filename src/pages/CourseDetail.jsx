import { Link, useParams } from "react-router-dom";
import { getCourseBySlug } from "@/data/courses";
import { courseModules } from "@/data/modules";
import { testimonials } from "@/data/testimonials";

export const CourseDetail = () => {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);

  if (!course) {
    return (
      <section className="py-20">
        <p>Course not found.</p>
        <Link to="/courses" className="text-primary">Back to courses</Link>
      </section>
    );
  }

  const modules = courseModules[course.slug] ?? [];
  const relatedTestimonials = testimonials.filter((item) => item.courseSlug === course.slug);

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container max-w-5xl mx-auto text-left space-y-10">
        <div className="rounded-2xl border border-border bg-card/70 p-8">
          <p className="text-primary uppercase text-sm">{course.category}</p>
          <h1 className="text-4xl sm:text-5xl font-bold mt-3">{course.title}</h1>
          <p className="text-muted-foreground mt-4">{course.overview}</p>
          <button className="cosmic-button mt-6">Enroll Now</button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Outcomes</h2>
          <ul className="list-disc ml-6 mt-3 text-muted-foreground space-y-2">
            {course.outcomes.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Curriculum</h2>
          <ol className="mt-3 space-y-3">
            {modules.map((module, index) => (
              <li key={module} className="rounded-xl border border-border bg-card/60 p-4">
                <span className="text-primary mr-3">Module {index + 1}</span>
                {module}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Requirements</h2>
          <ul className="list-disc ml-6 mt-3 text-muted-foreground space-y-2">
            {course.requirements.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Student Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {relatedTestimonials.map((item) => (
              <article key={item.id} className="rounded-xl border border-border bg-card/60 p-4">
                <p className="text-muted-foreground">“{item.content}”</p>
                <p className="mt-3 font-semibold">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
