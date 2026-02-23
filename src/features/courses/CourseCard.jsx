import { motion } from "framer-motion";
import { Clock3, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMockApi } from "@/context/MockApiContext";

const badgeStyles = {
  Popular: "border-red-200 bg-red-100 text-red-800 dark:border-red-900/70 dark:bg-red-900/35 dark:text-red-300",
  New: "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-900/30 dark:text-emerald-300",
  Beginner: "border-sky-200 bg-sky-100 text-sky-800 dark:border-sky-800/70 dark:bg-sky-900/30 dark:text-sky-300",
};

export const CourseCard = ({ course, index = 0, highlightedTitle }) => {
  const { openCourse, actionLoading } = useMockApi();
  const viewActionKey = `open-course:${course.id}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ scale: 1.01, y: -4 }}
      className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-colors duration-300 hover:border-red-300 dark:border-gray-700 dark:bg-gray-900 dark:shadow-[0_14px_40px_rgba(0,0,0,0.26)] dark:hover:border-[#FF3B30]/55"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs text-gray-700 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">{course.level}</span>
        {course.badge ? <span className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeStyles[course.badge] ?? "border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"}`}>{course.badge}</span> : null}
      </div>

      <h3 className="text-xl font-semibold leading-snug text-gray-900 transition-colors duration-300 dark:text-white">{highlightedTitle ?? course.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-700 transition-colors duration-300 dark:text-gray-300">{course.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-700 transition-colors duration-300 dark:text-gray-300">
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
        onClick={() => openCourse(course.id)}
        className="mt-6 inline-flex items-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:shadow-[0_0_22px_rgba(255,59,48,0.45)]"
      >
        {actionLoading[viewActionKey] ? "Loading..." : "View Details"}
      </Link>
    </motion.article>
  );
};
