import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CourseCard = ({ course, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 text-left backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:shadow-[0_8px_32px_rgba(255,59,48,0.15)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-primary/4 group-hover:to-primary/10" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.15em] text-primary">{course.category}</p>
          {course.badge ? (
            <span className="rounded-full border border-primary/45 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
              {course.badge}
            </span>
          ) : null}
        </div>

        <h2 className="mt-3 text-2xl font-bold leading-tight">{course.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{course.shortDescription}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="rounded-xl border border-border/60 bg-background/35 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide">Level</p>
            <p className="mt-0.5 text-foreground">{course.level}</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/35 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide">Duration</p>
            <p className="mt-0.5 text-foreground">{course.duration}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border/60 bg-background/35 px-3 py-2 text-sm text-muted-foreground">
          <p className="text-[11px] uppercase tracking-wide">Modules</p>
          <p className="mt-0.5 text-foreground">{course.moduleCount} modules (placeholder)</p>
        </div>

        <Link
          to={`/courses/${course.slug}`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,59,48,0.6)]"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
};
