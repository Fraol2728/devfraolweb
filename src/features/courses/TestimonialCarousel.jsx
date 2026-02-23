import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export const TestimonialCarousel = ({ testimonials = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => testimonials.filter((item) => item?.quote && item?.name), [testimonials]);

  if (!items.length) return null;

  const activeItem = items[activeIndex];

  return (
    <section aria-label="Student testimonials" className="space-y-4 rounded-2xl border border-gray-200 bg-white/70 p-5 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">Student Testimonials</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveIndex((index) => (index - 1 + items.length) % items.length)}
            className="rounded-full border border-gray-300 p-2 text-gray-700 transition-colors duration-300 hover:border-[#FF3B30] hover:text-[#FF3B30] dark:border-gray-700 dark:text-gray-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((index) => (index + 1) % items.length)}
            className="rounded-full border border-gray-300 p-2 text-gray-700 transition-colors duration-300 hover:border-[#FF3B30] hover:text-[#FF3B30] dark:border-gray-700 dark:text-gray-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative min-h-44 overflow-hidden rounded-xl border border-gray-200 bg-white/80 p-5 dark:border-gray-700 dark:bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeItem.name + activeItem.quote}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <Quote className="h-6 w-6 text-[#FF3B30]" aria-hidden="true" />
            <p className="text-gray-700 transition-colors duration-300 dark:text-gray-200">“{activeItem.quote}”</p>
            <div className="flex items-center gap-3">
              {activeItem.avatar ? <img src={activeItem.avatar} alt={`${activeItem.name} avatar`} className="h-10 w-10 rounded-full border border-[#FF3B30]/50 object-cover" /> : null}
              <div>
                <p className="font-semibold text-gray-900 transition-colors duration-300 dark:text-white">{activeItem.name}</p>
                <p className="text-xs text-gray-500 transition-colors duration-300 dark:text-gray-400">{activeItem.role ?? "Learner"}</p>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <Link to="/testimonials" className="inline-flex text-sm font-semibold text-[#FF3B30] transition-colors duration-300 hover:text-red-400">
        View all testimonials
      </Link>
    </section>
  );
};
