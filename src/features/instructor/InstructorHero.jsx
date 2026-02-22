import { motion } from "framer-motion";
import { SocialLinks } from "@/features/instructor/SocialLinks";

export const InstructorHero = () => {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/55 px-6 py-14 text-left sm:px-10">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-radial-[circle_at_top_right] from-[#FF3B30]/30 via-transparent to-transparent"
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="relative">
        <p className="inline-flex rounded-full border border-[#FF3B30]/40 bg-[#FF3B30]/12 px-4 py-1 text-sm font-semibold tracking-wide text-[#FF3B30]">
          Instructor Spotlight
        </p>
        <h1 className="mt-5 text-4xl font-black sm:text-5xl md:text-6xl">Dev Fraol</h1>
        <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
          "I teach by building with you—turning complex web development and graphic design concepts into practical skills that create career momentum."
        </p>

        <div className="mt-7 h-1 w-28 rounded-full bg-[#FF3B30] shadow-[0_0_20px_rgba(255,59,48,0.8)]" />
        <SocialLinks className="mt-8" iconOnly />
      </motion.div>
    </header>
  );
};
