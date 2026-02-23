import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

export const FeaturedCourses = ({ courses = [], loading = false }) => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8" aria-labelledby="featured-courses">
      <h2 id="featured-courses" className="text-3xl font-bold text-white md:text-4xl">
        Featured Courses
      </h2>
      <p className="mt-3 text-slate-300">Explore practical courses crafted to move you from learner to builder.</p>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(loading ? Array.from({ length: 3 }) : courses).map((course, idx) => (
          <motion.article key={course?.id ?? idx} variants={item} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-lg backdrop-blur">
            {loading ? (
              <div className="h-[280px] animate-pulse bg-slate-800" />
            ) : (
              <>
                <img src={course.image} alt={`${course.title} course cover`} className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{course.description}</p>
                  <button className="mt-6 inline-flex rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 outline-none transition hover:bg-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-300">
                    View Course
                  </button>
                </div>
              </>
            )}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};
