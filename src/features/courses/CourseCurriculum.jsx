import { motion } from "framer-motion";

export const CourseCurriculum = ({ curriculum = [] }) => (
  <section className="text-left transition-colors duration-300">
    <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">Curriculum / Modules</h2>
    <div className="mt-5 grid gap-4">
      {curriculum.map((item, index) => (
        <motion.article
          key={item.module}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] dark:shadow-[0_12px_28px_rgba(0,0,0,0.28)]"
        >
          <p className="font-semibold text-red-700 transition-colors duration-300 dark:text-[#ff9b94]">Module {index + 1}</p>
          <h3 className="mt-1 text-lg font-bold text-gray-900 transition-colors duration-300 dark:text-white">{item.module}</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700 transition-colors duration-300 dark:text-gray-300">
            {item.lessons.map((lesson) => (
              <li key={`${item.module}-${lesson}`}>{lesson}</li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  </section>
);
