import { motion } from "framer-motion";
import { Award, BadgeCheck, Brush, Code2 } from "lucide-react";

const achievements = [
  { icon: Award, label: "Certified Frontend Mentor", detail: "React + UI architecture" },
  { icon: BadgeCheck, label: "Top Instructor Recognition", detail: "Student-first curriculum" },
  { icon: Code2, label: "50+ Live Project Demos", detail: "Production-style walkthroughs" },
  { icon: Brush, label: "Design System Specialist", detail: "Brand-consistent interfaces" },
];

export const Achievements = () => {
  return (
    <section aria-labelledby="achievements-title" className="mt-14 text-left">
      <h2 id="achievements-title" className="text-3xl font-bold">
        Certifications & Achievements
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map(({ icon: Icon, label, detail }, index) => (
          <motion.article
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="rounded-2xl border border-border/65 bg-card/55 p-4"
          >
            <Icon className="h-6 w-6 text-[#FF3B30]" aria-hidden="true" />
            <h3 className="mt-3 text-base font-semibold">{label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
