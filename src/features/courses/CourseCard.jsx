import { motion } from "framer-motion";
import { Clock3, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";

const badgeStyles = {
  Popular: "border-[#FF3B30]/50 bg-[#FF3B30]/15 text-[#ff8a83]",
  New: "border-emerald-400/45 bg-emerald-400/10 text-emerald-300",
  Beginner: "border-sky-400/45 bg-sky-400/10 text-sky-300",
};

export const CourseCard = ({ course, index = 0, highlightedTitle }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ scale: 1.01, y: -4 }}
      className="group rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.26)] backdrop-blur-sm transition-colors duration-300 hover:border-[#FF3B30]/55"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-slate-200">{course.level}</span>
        {course.badge ? (
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeStyles[course.badge] ?? "border-white/20 text-slate-200"}`}>
            {course.badge}
          </span>
        ) : null}
      </div>

      <h3 className="text-xl font-semibold leading-snug text-white">{highlightedTitle ?? course.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{course.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-300">
        <span className="inline-flex items-center gap-1.5">
          <Layers3 className="h-4 w-4 text-[#FF3B30]" />
          {course.category}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-4 w-4 text-[#FF3B30]" />
          {course.duration}
        </span>
      </div>

      <Link
        to={`/courses/${course.slug}`}
        className="mt-6 inline-flex items-center rounded-lg bg-[#FF3B30] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#ff5449] hover:shadow-[0_0_22px_rgba(255,59,48,0.45)]"
      >
        View Details
      </Link>
    </motion.article>
  );
};
