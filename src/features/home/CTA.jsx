import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container max-w-6xl mx-auto rounded-2xl border border-primary/40 bg-linear-to-r from-primary/15 via-primary/5 to-card p-8 sm:p-12"
      >
        <h2 className="text-3xl sm:text-4xl text-left">Start Your Journey Today</h2>
        <p className="mt-3 text-left text-muted-foreground">Build real projects, sharpen your creative confidence, and move toward your next professional milestone.</p>
        <Link to="/courses" className="mt-6 inline-flex cosmic-button">
          Start Learning
        </Link>
      </motion.div>
    </section>
  );
};
