import { TestimonialsPage } from "@/features/testimonials/TestimonialsPage";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const Testimonials = () => {
  useSeoMeta({
    title: "What Our Students Say | Dev Fraol Academy",
    description: "Read real student testimonials from Dev Fraol Academy learners across web development, design, and backend tracks.",
  });

  return <TestimonialsPage />;
};
