import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { getCourseBySlug } from "@/data/courses";
import { courseModules } from "@/data/modules";
import { testimonials } from "@/data/testimonials";
import { ProgressTracker } from "@/features/progress/ProgressTracker";

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
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card/70 p-8">
          <p className="text-primary uppercase text-sm">{course.category}</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-3">{course.title}</h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{course.overview}</p>
          <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="cosmic-button mt-6">Enroll Now</motion.button>
        </motion.div>

        <ProgressTracker completed={Math.ceil(modules.length / 2)} total={modules.length} label="Curriculum Completion" />

        <div>
          <h2 className="text-2xl font-bold">Outcomes</h2>
          <ul className="list-disc ml-6 mt-3 text-muted-foreground space-y-2 leading-relaxed">
            {course.outcomes.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Curriculum</h2>
          <ol className="mt-3 space-y-3">
            {modules.map((module, index) => (
              <motion.li
                key={module}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="rounded-xl border border-border bg-card/60 p-4"
              >
                <span className="text-primary mr-3 font-semibold">Module {index + 1}</span>
                {module}
              </motion.li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Requirements</h2>
          <ul className="list-disc ml-6 mt-3 text-muted-foreground space-y-2 leading-relaxed">
            {course.requirements.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Student Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {relatedTestimonials.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.07 }}
                className="rounded-xl border border-border bg-card/60 p-4"
              >
                <p className="text-muted-foreground leading-relaxed">“{item.content}”</p>
                <p className="mt-3 font-semibold">{item.name}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
