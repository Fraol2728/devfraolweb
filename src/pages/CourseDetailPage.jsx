import { Link, useParams } from "react-router-dom";
import { courses } from "@/data/courses";
import { courseModules } from "@/data/modules";
import { testimonials } from "@/data/testimonials";

export const CourseDetailPage = () => {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return (
      <section className="py-24 px-4 sm:px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <Link className="text-primary hover:underline" to="/courses">Back to courses</Link>
      </section>
    );
  }

  const modules = courseModules[course.slug] || [];

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="rounded-2xl border border-border bg-card p-8">
          <p className="text-primary mb-2">{course.level} • {course.duration}</p>
          <h1 className="text-4xl font-bold">{course.title}</h1>
        </header>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p className="text-muted-foreground">{course.overview}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Learning Outcomes</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {course.learningOutcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Curriculum</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {modules.map((module) => <li key={module}>{module}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Requirements</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {course.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Student Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="border border-border rounded-xl p-4 bg-card">
                <p className="text-sm text-muted-foreground mb-3">"{testimonial.content}"</p>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-xs text-primary">{testimonial.role}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-primary/10 border border-primary/30 p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Enroll?</h3>
          <Link to="/contact" className="inline-flex px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
            Enroll Now
          </Link>
        </div>
      </div>
    </section>
  );
};
