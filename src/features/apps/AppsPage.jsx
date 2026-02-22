import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Bot,
  Brush,
  Code2,
  FileImage,
  FileCog,
  Film,
  Figma,
  Globe,
  ImageUpscale,
  Instagram,
  Moon,
  Palette,
  Play,
  Sun,
  Sparkles,
  Wrench,
} from "lucide-react";
import { AppCard } from "@/features/apps/AppCard";
import { ResourceCard } from "@/features/apps/ResourceCard";
import { SearchFilter } from "@/features/apps/SearchFilter";

const apps = [
  {
    name: "File Converter",
    description: "Convert PDF, Word, Excel, and image formats quickly inside one utility.",
    buttonLabel: "Go to Tool",
    category: "Converters",
    href: "#",
    icon: FileCog,
  },
  {
    name: "YouTube Video Downloader",
    description: "Download YouTube videos in multiple qualities for offline learning.",
    buttonLabel: "Open App",
    category: "Downloaders",
    href: "#",
    icon: Play,
  },
  {
    name: "TikTok Video Downloader",
    description: "Save TikTok clips without watermark and keep creator credits intact.",
    buttonLabel: "Open App",
    category: "Downloaders",
    href: "#",
    icon: Film,
  },
  {
    name: "Instagram Video Downloader",
    description: "Grab Instagram videos and reels for content research and inspiration.",
    buttonLabel: "Open App",
    category: "Downloaders",
    href: "#",
    icon: Instagram,
  },
  {
    name: "Background Remover",
    description: "Remove image backgrounds instantly with smart edge detection.",
    buttonLabel: "Go to Tool",
    category: "Editors",
    href: "#",
    icon: FileImage,
  },
  {
    name: "Online Code Editor",
    description: "Write and run JavaScript, Python, C, C++, Java, and more in-browser.",
    buttonLabel: "Go to Tool",
    category: "Editors",
    href: "/code-editor",
    icon: Code2,
  },
  {
    name: "Image Upscaler",
    description: "Enhance image resolution without losing quality using AI upscaling.",
    buttonLabel: "Open App",
    category: "Utilities",
    href: "#",
    icon: ImageUpscale,
  },
];

const resourceGroups = {
  "AI Websites": [
    { name: "ChatGPT", description: "AI assistant for writing, coding, and ideation.", href: "https://chatgpt.com", icon: Bot },
    { name: "Claude", description: "Conversational AI for analysis and long-form tasks.", href: "https://claude.ai", icon: Sparkles },
  ],
  "Software Downloads": [
    { name: "VS Code", description: "Developer-focused source code editor from Microsoft.", href: "https://code.visualstudio.com", icon: Wrench },
    { name: "Figma Desktop", description: "Collaborative design tooling for UI/UX teams.", href: "https://www.figma.com/downloads", icon: Figma },
  ],
  "Developer Tools": [
    { name: "GitHub", description: "Code hosting, version control, and CI/CD workflows.", href: "https://github.com", icon: Globe },
    { name: "Vite", description: "Fast frontend build tooling and development server.", href: "https://vite.dev", icon: Code2 },
  ],
  "Design Tools": [
    { name: "Coolors", description: "Generate modern color palettes for web projects.", href: "https://coolors.co", icon: Palette },
    { name: "Dribbble", description: "Discover design inspiration and creative portfolios.", href: "https://dribbble.com", icon: Brush },
  ],
};

const categories = ["All", "Converters", "Downloaders", "Editors", "Utilities"];

export const AppsPage = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const isDark = resolvedTheme !== "light";

  const filteredApps = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return apps.filter((app) => {
      const categoryMatch = activeCategory === "All" || app.category === activeCategory;
      const queryMatch = !normalized || `${app.name} ${app.description}`.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [query, activeCategory]);

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-border/65 bg-gradient-to-br from-card/80 to-card/40 px-6 py-10 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF3B30]">Dev Fraol Academy</p>
          <h1 className="mt-3 text-4xl font-extrabold text-foreground sm:text-5xl">Dev Fraol Apps</h1>
          <p className="mt-4 max-w-3xl text-base text-foreground/75 sm:text-lg">
            A curated collection of apps and resources for developers, designers, and creators.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF3B30]/40 bg-[#FF3B30]/10 px-4 py-2 text-sm font-semibold text-[#FF3B30]">
              <Sparkles className="h-4 w-4" />
              Featured App of the Week: File Converter
            </div>
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-4 py-2 text-sm font-semibold text-foreground/85 backdrop-blur transition-all duration-300 hover:border-[#FF3B30]/60 hover:text-[#FF3B30]"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </motion.header>

        <section className="mt-10">
          <SearchFilter
            query={query}
            onQueryChange={setQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={categories}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredApps.map((app, index) => (
              <AppCard key={app.name} app={app} index={index} />
            ))}
          </div>
          {filteredApps.length === 0 ? (
            <p className="mt-5 rounded-xl border border-dashed border-border/70 bg-card/40 p-4 text-sm text-foreground/70">
              No apps found for this filter. Try another category or keyword.
            </p>
          ) : null}
        </section>

        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-foreground">Recommended Resources</h2>
            <p className="mt-2 text-foreground/70">Curated platforms to speed up your workflow and learning path.</p>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#FF3B30] transition-all duration-300 hover:translate-x-1"
            >
              Explore more resource collections
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="space-y-10">
            {Object.entries(resourceGroups).map(([title, resources]) => (
              <div key={title}>
                <h3 className="mb-4 text-xl font-semibold text-foreground">{title}</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {resources.map((resource, index) => (
                    <ResourceCard key={resource.name} resource={resource} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
