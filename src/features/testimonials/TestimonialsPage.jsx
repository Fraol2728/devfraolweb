import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TestimonialsCarousel } from "@/features/testimonials/TestimonialsCarousel";

export const TestimonialsPage = () => {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF3B30]">Dev Fraol Academy</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 transition-colors duration-300 dark:text-white sm:text-5xl">What Our Students Say</h1>
          <p className="mx-auto mt-4 max-w-3xl text-gray-700 transition-colors duration-300 dark:text-gray-300">
            Hear from our learners and see their success stories.
          </p>
        </motion.section>

        <TestimonialsCarousel />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-14 rounded-3xl border border-gray-200 bg-white/90 p-8 text-center transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60"
        >
          <h2 className="text-2xl font-semibold text-gray-900 transition-colors duration-300 dark:text-white">Start Learning Today</h2>
          <p className="mt-2 text-sm text-gray-700 transition-colors duration-300 dark:text-gray-300">
            Join the next cohort and build career-ready skills with project-based learning.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-full bg-[#FF3B30] px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,48,0.3)] transition-all duration-300 hover:bg-[#ff4f46] hover:shadow-[0_14px_28px_rgba(255,59,48,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            >
              Start Learning Today
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
};
