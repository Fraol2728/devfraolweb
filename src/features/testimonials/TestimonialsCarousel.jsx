import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/features/testimonials/TestimonialCard";

export const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const totalSlides = testimonials.length;
  const currentItem = testimonials[activeIndex];

  const goToNext = () => {
    setActiveIndex((index) => (index + 1) % totalSlides);
  };

  const goToPrevious = () => {
    setActiveIndex((index) => (index - 1 + totalSlides) % totalSlides);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      goToNext();
    }

    if (event.key === "ArrowLeft") {
      goToPrevious();
    }
  };

  const desktopCards = useMemo(() => testimonials, []);

  return (
    <section className="mt-12" aria-label="Student testimonials carousel and grid">
      <div
        className="md:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Student testimonials"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <TestimonialCard testimonial={currentItem} priority />
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goToPrevious}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-all duration-300 hover:border-[#FF3B30] hover:text-[#FF3B30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            aria-label="Show previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2" aria-label="Testimonial navigation dots">
            {testimonials.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] ${
                    isActive ? "w-6 bg-[#FF3B30]" : "w-2.5 bg-gray-400/70 dark:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={isActive ? "true" : "false"}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-all duration-300 hover:border-[#FF3B30] hover:text-[#FF3B30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            aria-label="Show next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3">
        {desktopCards.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};
