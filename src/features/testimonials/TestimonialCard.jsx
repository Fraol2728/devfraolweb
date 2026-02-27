import { memo } from "react";
import { motion } from "framer-motion";

const TestimonialCardComponent = ({ testimonial, priority = false }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ duration: 0.35 }}
      className="group h-full rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-sm transition-all duration-300 hover:border-[#FF3B30]/70 hover:shadow-[0_12px_30px_rgba(255,59,48,0.16)] dark:border-gray-700 dark:bg-gray-900/70"
    >
      <header className="mb-4 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name} avatar`}
          loading={priority ? "eager" : "lazy"}
          className="h-12 w-12 rounded-full border border-gray-300 object-cover dark:border-gray-600"
        />
        <div>
          <h3 className="text-base font-semibold text-gray-900 transition-colors duration-300 dark:text-white">{testimonial.name}</h3>
          <p className="text-sm text-[#FF3B30]">{testimonial.course}</p>
        </div>
      </header>

      <p className="text-sm leading-relaxed text-gray-700 transition-colors duration-300 dark:text-gray-300">“{testimonial.review}”</p>
    </motion.article>
  );
};

export const TestimonialCard = memo(TestimonialCardComponent);
