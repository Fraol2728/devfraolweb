import { motion } from "framer-motion";
import { Brush, Code2, Database, FileCode2, Image, Paintbrush2, Palette, PenTool } from "lucide-react";
import { sectionReveal, staggerContainer } from "@/lib/animations";
import { TrackCard } from "./TrackCard";

const webDevCourses = [
  { title: "HTML & CSS Course", description: "Structure, styling, and responsive layouts.", icon: FileCode2 },
  { title: "JavaScript Course", description: "Modern JS fundamentals and interaction.", icon: Code2 },
  { title: "PHP Course", description: "Backend logic and dynamic web apps.", icon: Code2 },
  { title: "MySQL Course", description: "Databases, queries, and data modeling.", icon: Database },
  { title: "React JS Course", description: "Component-based UI development.", icon: Code2 },
  { title: "Python Course", description: "Scripting and backend automation basics.", icon: FileCode2 },
];

const graphicDesignCourses = [
  { title: "Adobe Photoshop", description: "Photo editing and visual composition.", icon: Image },
  { title: "Adobe Illustrator", description: "Vector graphics and illustrations.", icon: PenTool },
  { title: "Adobe InDesign", description: "Publication and layout design workflow.", icon: Palette },
  { title: "Card Design", description: "Professional branding and print card design.", icon: Paintbrush2 },
];

const tracks = [
  { title: "Web Development Track", icon: Code2, courses: webDevCourses },
  { title: "Graphic Design Track", icon: Brush, courses: graphicDesignCourses },
];

export const TracksOverview = () => {
  return (
    <section id="tracks" className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl text-left">
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
          {tracks.map((track, trackIndex) => (
            <motion.article
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: trackIndex * 0.08 }}
              className="rounded-2xl border border-white/10 bg-card/70 p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <track.icon className="h-5 w-5 text-[#FF3B30]" />
                <h3 className="text-2xl">{track.title}</h3>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
              >
                {track.courses.map((course) => (
                  <TrackCard key={course.title} title={course.title} description={course.description} icon={course.icon} />
                ))}
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
