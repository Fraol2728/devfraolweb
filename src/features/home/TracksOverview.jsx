import { motion } from "framer-motion";
import { Brush, Code2, Figma, FileCode2, Palette, PenTool, Server, Shapes } from "lucide-react";
import { cardReveal, sectionReveal, staggerContainer } from "@/lib/animations";

const tracks = [
  {
    title: "Web Development Track",
    icon: Code2,
    modules: [
      { label: "HTML", icon: FileCode2 },
      { label: "CSS", icon: Palette },
      { label: "JavaScript", icon: Code2 },
      { label: "React", icon: Shapes },
      { label: "Node.js", icon: Server },
    ],
  },
  {
    title: "Graphic Design Track",
    icon: Brush,
    modules: [
      { label: "Photoshop", icon: Brush },
      { label: "Illustrator", icon: PenTool },
      { label: "Figma", icon: Figma },
      { label: "Branding", icon: Palette },
      { label: "UI/UX", icon: Shapes },
    ],
  },
];

export const TracksOverview = () => {
  return (
    <section className="px-4 sm:px-6 py-16">
      <div className="container max-w-6xl mx-auto text-left">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl">Tracks Overview / What You Will Learn</h2>
          <p className="mt-3 text-muted-foreground">Choose your path and build practical skills module by module.</p>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {tracks.map((track) => (
            <motion.article
              key={track.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-border bg-card/70 p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <track.icon className="h-5 w-5 text-primary" />
                <h3 className="text-2xl">{track.title}</h3>
              </div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {track.modules.map((module) => (
                  <motion.div
                    key={module.label}
                    variants={cardReveal}
                    className="rounded-xl border border-border/80 bg-background/70 px-3 py-4 text-center"
                  >
                    <module.icon className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-2 text-sm font-medium">{module.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
