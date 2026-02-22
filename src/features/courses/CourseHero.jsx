import { motion } from "framer-motion";

export const CourseHero = ({ course }) => (
  <motion.header
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,59,48,0.16),rgba(11,14,24,0.7))] text-left shadow-[0_18px_50px_rgba(0,0,0,0.32)]"
  >
    {course.bannerImage ? <img src={course.bannerImage} alt={`${course.title} banner`} className="h-56 w-full object-cover opacity-75" /> : null}
    <div className="space-y-4 p-7 sm:p-10">
      <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{course.title}</h1>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-[#FF3B30]/60 bg-[#FF3B30]/20 px-3 py-1 text-xs font-semibold text-[#ffb3ad]">{course.level}</span>
        <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-semibold text-slate-200">{course.duration}</span>
        <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-semibold text-slate-200">{course.category}</span>
      </div>
      <p className="max-w-3xl text-base leading-relaxed text-slate-200">{course.description}</p>
    </div>
  </motion.header>
);
