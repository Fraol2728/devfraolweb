import { motion } from "framer-motion";
import { ArrowUpRight, Image, Palette, Type, WandSparkles } from "lucide-react";
const formatWebsiteMeta = (link) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
};


const graphicsCategories = [
  {
    id: "templates",
    title: "Templates",
    icon: WandSparkles,
    apps: [
      {
        id: "freepik",
        name: "Freepik",
        description: "PSD, AI, and vector templates for Photoshop/Illustrator.",
        link: "https://www.freepik.com/",
      },
      {
        id: "graphicburger",
        name: "GraphicBurger",
        description: "Mockups, UI kits, and design freebies.",
        link: "https://graphicburger.com/",
      },
      {
        id: "envato-elements-free",
        name: "Envato Elements Free",
        description: "Monthly updated free templates.",
        link: "https://elements.envato.com/free",
      },
    ],
  },
  {
    id: "color-palettes-pickers",
    title: "Color Palettes & Pickers",
    icon: Palette,
    apps: [
      {
        id: "coolors",
        name: "Coolors",
        description: "Generate palettes instantly.",
        link: "https://coolors.co/",
      },
      {
        id: "adobe-color",
        name: "Adobe Color",
        description: "Official Adobe palette generator.",
        link: "https://color.adobe.com/",
      },
      {
        id: "color-hunt",
        name: "Color Hunt",
        description: "Curated trendy palettes.",
        link: "https://colorhunt.co/",
      },
    ],
  },
  {
    id: "fonts",
    title: "Fonts",
    icon: Type,
    apps: [
      {
        id: "google-fonts",
        name: "Google Fonts",
        description: "Huge free font library.",
        link: "https://fonts.google.com/",
      },
      {
        id: "dafont",
        name: "DaFont",
        description: "Creative fonts for projects.",
        link: "https://www.dafont.com/",
      },
      {
        id: "font-squirrel",
        name: "Font Squirrel",
        description: "Free commercial-use fonts.",
        link: "https://www.fontsquirrel.com/",
      },
    ],
  },
  {
    id: "images-stock",
    title: "Images & Stock",
    icon: Image,
    apps: [
      {
        id: "unsplash",
        name: "Unsplash",
        description: "High-quality free photos.",
        link: "https://unsplash.com/",
      },
      {
        id: "pexels",
        name: "Pexels",
        description: "Free stock images and videos.",
        link: "https://www.pexels.com/",
      },
      {
        id: "pixabay",
        name: "Pixabay",
        description: "Free images, vectors, and illustrations.",
        link: "https://pixabay.com/",
      },
    ],
  },
  {
    id: "icons-vectors",
    title: "Icons & Vectors",
    icon: WandSparkles,
    apps: [
      {
        id: "flaticon",
        name: "Flaticon",
        description: "Millions of free icons.",
        link: "https://www.flaticon.com/",
      },
      {
        id: "svg-repo",
        name: "SVG Repo",
        description: "Free SVGs for design projects.",
        link: "https://www.svgrepo.com/",
      },
    ],
  },
];

export const GraphicsTools = () => {
  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">Graphics Tools</h3>
      <p className="mt-2 text-sm text-foreground/70">Explore categories below. Each app opens the official website in a new tab.</p>

      <div className="mt-5 space-y-5">
        {graphicsCategories.map((category, categoryIndex) => {
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
    </article>
  );
};
