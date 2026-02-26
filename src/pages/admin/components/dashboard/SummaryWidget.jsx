import { motion } from "framer-motion";

export const SummaryWidget = ({ title, value, subtitle, icon: Icon, gradientFrom = "from-[#FF3B30]/25", gradientTo = "to-transparent", delay = 0 }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
    whileHover={{ y: -4, scale: 1.015 }}
    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradientFrom} ${gradientTo} p-5 shadow-lg backdrop-blur-2xl`}
  >
    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-2xl transition group-hover:bg-[#FF3B30]/30" />
    <div className="relative flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-zinc-300">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        {subtitle ? <p className="mt-1 text-xs text-zinc-400">{subtitle}</p> : null}
      </div>
      <div className="rounded-xl border border-white/15 bg-black/20 p-2.5 text-[#FF7C73]">
        <Icon size={18} />
      </div>
    </div>
  </motion.article>
);
