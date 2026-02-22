import { motion } from "framer-motion";

export const CourseOverview = ({ course }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm"
  >
    <h2 className="text-2xl font-bold text-white">Course Overview</h2>
    <p className="mt-3 text-slate-300">{course.overview}</p>

    <h3 className="mt-6 text-lg font-semibold text-white">Key Skills Gained</h3>
    <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
      {course.keySkills?.map((skill) => (
        <li key={skill} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
          {skill}
        </li>
      ))}
    </ul>
  </motion.section>
);
