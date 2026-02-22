import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const CourseCard = ({ title, description, icon: Icon, index = 0, href = "#" }) => {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24, x: -10 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_10px_32px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all duration-300 hover:border-[#FF3B30]/70 hover:shadow-[0_0_0_1px_rgba(255,59,48,0.3),0_15px_34px_rgba(255,59,48,0.22)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF3B30]/0 via-[#FF3B30]/0 to-[#FF3B30]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-snug sm:text-xl">{title}</h3>
          {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {Icon ? <Icon className="h-5 w-5 shrink-0 text-[#FF3B30]" aria-hidden="true" /> : null}
      </div>

      <span className="relative z-10 mt-5 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-[#FF3B30]">
        Open details
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </motion.a>
  );
};
