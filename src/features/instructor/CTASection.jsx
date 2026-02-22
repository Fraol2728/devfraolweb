import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="mt-14 rounded-3xl border border-[#FF3B30]/45 bg-linear-to-r from-[#FF3B30]/20 via-card/70 to-[#FF3B30]/10 px-6 py-12 text-center sm:px-10">
      <h2 className="text-3xl font-black sm:text-4xl">Ready to build your next breakthrough skill?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        Join hands-on programs designed to sharpen your engineering mindset and visual design craft.
      </p>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="mt-8 inline-flex">
        <Link
          to="/courses"
          className="inline-flex items-center justify-center rounded-xl bg-[#FF3B30] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#ff5449] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View Courses
        </Link>
      </motion.div>
    </section>
  );
};
