import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cardReveal } from "@/lib/animations";

export const TrackCard = ({ title, description, icon: Icon, href = "#" }) => {
  return (
    <motion.a
      href={href}
      variants={cardReveal}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left shadow-[0_8px_30px_rgb(0_0_0/0.24)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3B30]/70 hover:shadow-[0_0_0_1px_rgba(255,59,48,0.3),0_14px_32px_rgba(255,59,48,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]/70"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF3B30]/0 via-[#FF3B30]/0 to-[#FF3B30]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <h4 className="text-base font-semibold sm:text-lg">{title}</h4>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {Icon ? <Icon className="h-5 w-5 shrink-0 text-[#FF3B30]" aria-hidden="true" /> : null}
      </div>

      <span className="relative z-10 mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#FF3B30] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
        Explore
        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </motion.a>
  );
};
