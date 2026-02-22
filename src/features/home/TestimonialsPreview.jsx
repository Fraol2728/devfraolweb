import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { testimonials } from "@/data/testimonials";

export const TestimonialsPreview = () => {
  const previewTestimonials = testimonials.slice(0, 2);

  return (
    <section className="px-4 sm:px-6 py-16">
      <div className="container max-w-6xl mx-auto text-left">
        <h2 className="text-3xl sm:text-4xl">Student Testimonials</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {previewTestimonials.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-2xl border border-border bg-card/70 p-6"
            >
              <p className="text-muted-foreground">“{item.content}”</p>
              <p className="mt-4 font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.role}</p>
            </motion.article>
          ))}
        </div>
        <Link to="/testimonials" className="mt-6 inline-block text-primary font-semibold hover:underline">
          View all testimonials
        </Link>
      </div>
    </section>
  );
};
