import { motion } from "framer-motion";
import { ArrowUpRight, Code2, FileCog, FileImage, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/useToastStore";

const featuredApps = [
  { name: "Video Downloader", description: "Grab videos quickly from popular platforms.", icon: Video, sectionId: "downloader" },
  { name: "Background Remover", description: "Clean cut-outs with backend image processing.", icon: FileImage, sectionId: "background-remover" },
  { name: "Online Code Editor", description: "Run snippets and preview output with one click.", icon: Code2, sectionId: "code-editor" },
  { name: "File Converter", description: "Convert files across formats with auto-download.", icon: FileCog, sectionId: "converter" },
];

export const FeaturedApps = () => {
  return (
    <section id="featured-apps" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF3B30]">Apps Spotlight</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Featured Apps</h2>
          <p className="mt-2 max-w-2xl text-foreground/70">Jump directly into the tool you need with smooth section navigation.</p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredApps.map((app, index) => {
            const Icon = app.icon;

            return (
              <motion.div
                key={app.sectionId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <Link
                  to={`/apps#${app.sectionId}`}
                  onClick={() => toast({ title: `Opening ${app.name}...`, description: "Taking you to the selected app section.", variant: "default" })}
                  className="group block rounded-2xl border border-border/65 bg-card/45 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3B30]/60 hover:shadow-[0_18px_40px_rgba(255,59,48,0.2)]"
                >
                  <div className="inline-flex rounded-xl bg-[#FF3B30]/15 p-3 text-[#FF3B30]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{app.name}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{app.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF3B30]">
                    Open app <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
