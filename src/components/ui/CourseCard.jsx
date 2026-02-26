import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const levelStyles = {
  Beginner:
    "bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/30 dark:bg-emerald-400/15 dark:text-emerald-300 dark:ring-emerald-400/30",
  Intermediate:
    "bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/30 dark:bg-amber-400/15 dark:text-amber-300 dark:ring-amber-400/30",
  Advanced:
    "bg-rose-500/15 text-rose-700 ring-1 ring-rose-500/30 dark:bg-rose-400/15 dark:text-rose-300 dark:ring-rose-400/30",
};

export const CourseCard = ({ id, title, description, thumbnail, duration, level }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/courses/${id}`);
  };

  return (
    <motion.article
      onClick={handleNavigate}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/75 shadow-[0_12px_30px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_12px_32px_rgba(2,6,23,0.45)] dark:hover:shadow-[0_24px_50px_rgba(2,6,23,0.65)]"
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={`${title} thumbnail`}
          loading="lazy"
          className="h-48 w-full object-cover"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[level] ?? levelStyles.Beginner}`}
        >
          {level}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>

        <div className="mt-auto space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <p>
            <span className="font-semibold">Instructor:</span> Dev Fraol
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {duration}
          </p>
        </div>

        <motion.button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleNavigate();
          }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(59,130,246,0.35)] transition-all duration-300 hover:brightness-105"
        >
          Enroll Now
        </motion.button>
      </div>
    </motion.article>
  );
};
