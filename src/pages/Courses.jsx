import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { cardReveal, staggerContainer } from "@/lib/animations";

export const Courses = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container max-w-6xl mx-auto text-left">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold"
        >
          Courses
        </motion.h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">Explore all Dev Fraol programs across Web Development and Graphic Design.</p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mt-10"
        >
          {courses.map((course) => (
            <motion.article
              key={course.slug}
              variants={cardReveal}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-border bg-card/70 p-6"
            >
              <p className="text-xs uppercase text-primary">{course.category}</p>
              <h2 className="text-2xl font-bold mt-2">{course.title}</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">{course.shortDescription}</p>
              <div className="flex justify-between text-sm mt-4 text-muted-foreground">
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>
              <Link to={`/courses/${course.slug}`} className="inline-block mt-5 text-primary font-semibold hover:underline">View Details</Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
