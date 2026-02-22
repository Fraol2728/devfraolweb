import { motion } from "framer-motion";
import { Brush, Code2 } from "lucide-react";
import { sectionReveal, staggerContainer } from "@/lib/animations";
import { TrackCard } from "./TrackCard";

const tracks = [
  {
    title: "Web Development Track",
    description: "Build modern websites and applications from frontend foundations to backend logic.",
    icon: Code2,
    highlights: ["HTML & CSS", "JavaScript", "React JS", "PHP + MySQL", "Python"],
    href: "/courses",
  },
  {
    title: "Graphic Design Track",
    description: "Create polished visual assets with industry-standard Adobe tools and workflows.",
    icon: Brush,
    highlights: ["Illustrator", "Photoshop", "InDesign", "Composition"],
    href: "/courses",
  },
];

export const TracksOverview = () => {
  return (
    <section id="tracks" className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl text-left">
        <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="text-3xl sm:text-4xl">Tracks Overview / What You Will Learn</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Start with a focused path. Learn practical, job-relevant skills through project-driven modules.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-6 lg:grid-cols-2"
        >
          {tracks.map((track) => (
            <TrackCard
              key={track.title}
              title={track.title}
              description={track.description}
              icon={track.icon}
              highlights={track.highlights}
              href={track.href}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
