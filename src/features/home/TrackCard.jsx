import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cardReveal } from "@/lib/animations";

const MotionLink = motion(Link);

export const TrackCard = ({ title, description, icon: Icon, highlights = [], href = "/apps" }) => {
  return (
    <MotionLink
      to={href}
      variants={cardReveal}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left shadow-[0_10px_36px_rgb(0_0_0/0.26)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3B30]/70 hover:shadow-[0_0_0_1px_rgba(255,59,48,0.28),0_16px_34px_rgba(255,59,48,0.2)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF3B30]/0 via-[#FF3B30]/0 to-[#FF3B30]/12 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold sm:text-2xl">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        {Icon ? <Icon className="mt-1 h-6 w-6 shrink-0 text-[#FF3B30]" aria-hidden="true" /> : null}
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap gap-2">
        {highlights.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:border-[#FF3B30]/45 group-hover:text-foreground"
          >
            {item}
          </span>
        ))}
      </div>

      <span className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#FF3B30]">
        Explore track
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </MotionLink>
  );
};
