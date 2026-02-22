import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { courses } from "@/data/courses";

export const HomeCoursesSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Featured Courses</h2>
        <p className="text-muted-foreground mb-8">Build practical skills with Dev Fraol's most popular learning paths.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {courses.slice(0, 4).map((course, index) => (
            <motion.article
              key={course.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card/70 p-6 card-hover text-left"
            >
              <p className="text-xs uppercase tracking-wide text-primary">{course.category}</p>
              <h3 className="text-xl font-semibold mt-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mt-3">{course.shortDescription}</p>
              <div className="flex items-center justify-between mt-5 text-sm text-muted-foreground">
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>
              <Link to={`/courses/${course.slug}`} className="inline-block mt-6 text-primary font-medium hover:underline">
                View Details
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
