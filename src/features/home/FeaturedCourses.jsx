import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMockApi } from "@/context/MockApiContext";
import { cardReveal, staggerContainer } from "@/lib/animations";

export const FeaturedCourses = () => {
  const { courses = [] } = useMockApi();
  const featuredCourses = courses.slice(0, 4);

  return (
    <section id="featured-courses" className="px-4 sm:px-6 py-16">
      <div className="container max-w-6xl mx-auto text-left">
        <h2 className="text-3xl sm:text-4xl">Featured Courses</h2>
        <p className="mt-3 text-muted-foreground">Start with our most popular programs and grow into advanced modules.</p>
        {featuredCourses.length === 0 ? <p className="mt-8 text-muted-foreground">Courses will appear here as soon as they are available.</p> : null}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-5 md:grid-cols-2"
        >
          {featuredCourses.map((course) => (
            <motion.article
              key={course.slug}
              variants={cardReveal}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card/75 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              <p className="text-xs uppercase tracking-wide text-primary">{course.category}</p>
              <h3 className="mt-2 text-2xl">{course.title}</h3>
              <p className="mt-3 text-muted-foreground">{course.shortDescription}</p>
              <div className="mt-5 flex justify-between text-sm text-muted-foreground">
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>
              <Link className="mt-5 inline-block font-semibold text-primary hover:underline" to={`/courses/${course.slug}`}>
                View Details
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
