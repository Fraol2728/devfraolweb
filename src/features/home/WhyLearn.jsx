import { motion } from "framer-motion";

const points = [
  "Project-first teaching: every lesson ends in practical output.",
  "Instructor-led structure with clarity for beginners and depth for intermediates.",
  "Career-aligned roadmap built for freelancers, creators, and aspiring professionals.",
];

export const WhyLearn = () => {
  return (
    <section className="px-4 sm:px-6 py-16">
      <div className="container max-w-6xl mx-auto text-left rounded-2xl border border-border bg-card/60 p-7 sm:p-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl"
        >
          Why Learn From Dev Fraol
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-4 max-w-3xl text-muted-foreground"
        >
          Dev Fraol blends engineering precision with creative execution. You do not just watch tutorials—you build portfolio-ready outcomes guided by a teaching philosophy focused on consistency, feedback, and real scenarios.
        </motion.p>
        <ul className="mt-6 space-y-3">
          {points.map((point, idx) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-xl border border-border/80 bg-background/70 px-4 py-3"
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
