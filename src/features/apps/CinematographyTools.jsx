import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Camera, Clapperboard, Lightbulb, ScrollText } from "lucide-react";
const formatWebsiteMeta = (link) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
};


const cinematographyCategories = [
  {
    id: "learning-inspiration",
    title: "Learning & Inspiration",
    icon: BookOpen,
    apps: [
      {
        id: "shotdeck",
        name: "ShotDeck",
        description: "High-quality movie stills (limited free).",
        link: "https://shotdeck.com/",
      },
      {
        id: "film-grab",
        name: "Film Grab",
        description: "Cinematic frames from thousands of films.",
        link: "https://film-grab.com/",
      },
      {
        id: "no-film-school",
        name: "No Film School",
        description: "Tutorials, gear reviews, filmmaker tips.",
        link: "https://nofilmschool.com/",
      },
    ],
  },
  {
    id: "screenwriting",
    title: "Screenwriting",
    icon: ScrollText,
    apps: [
      {
        id: "celtx",
        name: "Celtx",
        description: "Free scriptwriting and pre-production.",
        link: "https://www.celtx.com/",
      },
      {
        id: "writerduet",
        name: "WriterDuet",
        description: "Collaborative screenplay writing.",
        link: "https://www.writerduet.com/",
      },
    ],
  },
  {
    id: "storyboarding",
    title: "Storyboarding",
    icon: Clapperboard,
    apps: [
      {
        id: "storyboard-that",
        name: "Storyboard That",
        description: "Free storyboard creator.",
        link: "https://www.storyboardthat.com/",
      },
      {
        id: "boords",
        name: "Boords",
        description: "Professional storyboarding tool (free trial).",
        link: "https://boords.com/",
      },
    ],
  },
  {
    id: "lighting-camera-guides",
    title: "Lighting & Camera Guides",
    icon: Lightbulb,
    apps: [
      {
        id: "indiewire-filmmaking",
        name: "IndieWire Filmmaking",
        description: "Cinematography insights.",
        link: "https://www.indiewire.com/c/filmmaking/",
      },
      {
        id: "cinematography-forum",
        name: "Cinematography.com",
        description: "Forum for filmmakers.",
        link: "https://cinematography.com/",
      },
    ],
  },
];

export const CinematographyTools = () => {
  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">Cinematography Tools</h3>
      <p className="mt-2 text-sm text-foreground/70">Explore categories below. Each app opens the official website in a new tab.</p>

      <div className="mt-5 space-y-5">
        {cinematographyCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;

          return (
            <section key={category.id} className="rounded-xl border border-border/70 bg-background/30 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex rounded-lg bg-[#FF3B30]/15 p-2 text-[#FF3B30]">
                  <CategoryIcon className="h-4 w-4" />
                </span>
                <h4 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{category.title}</h4>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {category.apps.map((app, appIndex) => (
                  <motion.a
                    key={app.id}
                    href={app.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.05 + appIndex * 0.04 }}
                    className="group rounded-2xl border border-border/70 bg-background/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3B30]/70 hover:shadow-[0_16px_32px_rgba(255,59,48,0.22)]"
                  >
                    <h5 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{app.name}</h5>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">{app.description}</p>
                    <p className="mt-1 text-xs text-foreground/60">Official website: {formatWebsiteMeta(app.link)} · Opens in a new tab.</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#FF3B30]/15 px-3 py-1.5 text-sm font-semibold text-[#FF3B30]">
                      Visit Website
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-5 inline-flex items-center gap-1 rounded-lg border border-border/70 bg-background/20 px-3 py-1.5 text-xs text-foreground/70">
        <Camera className="h-3.5 w-3.5 text-[#FF3B30]" />
        Curated for filmmakers, DPs, and visual storytellers.
      </div>
    </article>
  );
};
