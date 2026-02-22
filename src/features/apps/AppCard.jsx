import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const AppCard = ({ app, index, onSelectTool, isActive = false }) => {
  const Icon = app.icon;

  return (
    <motion.article
      id={app.tool}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={cn(
        "group rounded-2xl border bg-linear-to-br from-card/85 to-card/45 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300",
        isActive
          ? "border-[#FF3B30]/70 shadow-[0_18px_40px_rgba(255,59,48,0.25)]"
          : "border-border/70 hover:border-[#FF3B30]/60 hover:shadow-[0_18px_40px_rgba(255,59,48,0.25)]"
      )}
    >
      <div className="mb-4 inline-flex rounded-xl bg-[#FF3B30]/15 p-3 text-[#FF3B30] transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-foreground">{app.name}</h3>
      <p className="mt-2 min-h-14 text-sm text-foreground/75">{app.description}</p>
      <button
        type="button"
        onClick={() => onSelectTool?.(app.tool, app.name)}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[0_10px_24px_rgba(255,59,48,0.35)]"
      >
        {app.buttonLabel}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </motion.article>
  );
};
