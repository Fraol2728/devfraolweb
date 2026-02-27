import { Clock3, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const levelStyles = {
  Beginner: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40",
  Intermediate: "bg-amber-500/15 text-amber-200 border-amber-400/40",
};

export const CourseCard = ({ course, index = 0 }) => {
  const navigate = useNavigate();

  const levelClass = levelStyles[course.level] || "bg-slate-500/15 text-slate-200 border-slate-400/40";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={() => navigate(`/course/${course.slug}`)}
      className="group min-w-[280px] cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#1c2131] to-[#141926] shadow-[0_10px_24px_rgba(5,10,22,0.35)] transition-shadow hover:shadow-[0_18px_38px_rgba(4,8,22,0.5)] sm:min-w-[320px]"
    >
      <div className="relative">
        <img src={course.thumbnail} alt={course.title} className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-xs font-semibold ${levelClass}`}>{course.level}</span>
        {course.hasPreview ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#ff8d84]/60 bg-[#ff564c]/25 px-2.5 py-1 text-xs font-semibold text-[#ffd9d6]">
            <PlayCircle className="h-3.5 w-3.5" /> Preview
          </span>
        ) : null}
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div>
          <h3 className="line-clamp-2 text-lg font-semibold text-white">{course.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/70">{course.shortDescription}</p>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs text-white/75">
          <p className="truncate">Instructor: {course.instructorName}</p>
          <span className="rounded-full border border-white/20 px-2 py-1">{course.category}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-white/70">
          <span>{course.lessonsCount} lessons</span>
          <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{course.duration}</span>
        </div>
      </div>
    </motion.article>
  );
};
