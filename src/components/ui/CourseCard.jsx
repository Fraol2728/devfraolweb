import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const CourseCard = ({ course, index = 0 }) => {
  const navigate = useNavigate();

  const goToDetail = () => {

  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      whileHover={{ y: -5 }}
      onClick={goToDetail}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-[0_12px_30px_rgba(10,10,25,0.25)] backdrop-blur-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={`${course.title} thumbnail`}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">{course.level}</div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-2 text-lg font-semibold text-foreground">{course.title}</h3>
          <p className="mt-1 text-sm text-foreground/70">by {course.instructor}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-foreground/70">
          <span className="rounded-full border border-white/20 px-2 py-1">{course.category}</span>
          <span>{course.duration}</span>
        </div>

        <motion.button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goToDetail();
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-xl bg-gradient-to-r from-[#ff564c] to-[#ff3b30] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(255,59,48,0.35)] transition-shadow hover:shadow-[0_14px_28px_rgba(255,59,48,0.45)]"
        >
          Enroll
        </motion.button>
      </div>
    </motion.article>
  );
};
