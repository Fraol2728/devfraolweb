import { motion } from "framer-motion";

export const ProgressTracker = ({ completed = 4, total = 10, label = "Course Progress" }) => {
  const safeTotal = Math.max(total, 1);
  const percent = Math.min(100, Math.round((completed / safeTotal) * 100));

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-border bg-card/80 p-6 text-left"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold">{label}</h3>
        <span className="text-sm font-medium text-primary">{completed}/{safeTotal} modules complete</span>
      </div>
      <div className="mt-4 h-3 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-linear-to-r from-primary to-orange-400"
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Placeholder tracker for module completion UX.</p>
    </motion.section>
  );
};
