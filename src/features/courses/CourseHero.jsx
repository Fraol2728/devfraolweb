import { motion } from "framer-motion";

export const CourseHero = ({ course }) => (
  <motion.header
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-red-100 to-white text-left shadow-md transition-colors duration-300 dark:border-gray-700 dark:bg-[linear-gradient(145deg,rgba(255,59,48,0.16),rgba(11,14,24,0.7))] dark:shadow-[0_18px_50px_rgba(0,0,0,0.32)]"
  >
    {course.bannerImage ? <img src={course.bannerImage} alt={`${course.title} banner`} className="h-56 w-full object-cover opacity-75" /> : null}
    <div className="space-y-4 p-7 sm:p-10">
      <h1 className="text-4xl font-extrabold text-gray-900 transition-colors duration-300 dark:text-white sm:text-5xl">{course.title}</h1>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-red-200 bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 transition-colors duration-300 dark:border-[#FF3B30]/60 dark:bg-[#FF3B30]/20 dark:text-[#ffb3ad]">{course.level}</span>
        <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 transition-colors duration-300 dark:border-white/20 dark:bg-black/20 dark:text-slate-200">{course.duration}</span>
        <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 transition-colors duration-300 dark:border-white/20 dark:bg-black/20 dark:text-slate-200">{course.category}</span>
      </div>
      <p className="max-w-3xl text-base leading-relaxed text-gray-700 transition-colors duration-300 dark:text-slate-200">{course.description}</p>
    </div>
  </motion.header>
);
