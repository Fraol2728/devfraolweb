import { motion } from "framer-motion";

export const CourseOverview = ({ course }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    className="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60 dark:shadow-none"
  >
    <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">Course Overview</h2>
    <p className="mt-3 text-gray-700 transition-colors duration-300 dark:text-gray-300">{course.overview}</p>

    <h3 className="mt-6 text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-white">Key Skills Gained</h3>
    <ul className="mt-3 grid gap-2 text-sm text-gray-700 transition-colors duration-300 dark:text-gray-300 sm:grid-cols-2">
      {course.keySkills?.map((skill) => (
        <li key={skill} className="rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800/70">
          {skill}
        </li>
      ))}
    </ul>
  </motion.section>
);
