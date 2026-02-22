import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold">Student Testimonials</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          Real feedback from Dev Fraol students in Web Development and Graphic Design programs.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card/70 p-6 text-left"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">“{item.content}”</p>
              <div className="mt-6">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-primary">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
