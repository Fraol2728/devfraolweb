import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Bot,
  Brush,
  Code2,
  FileCog,
  FileImage,
  Figma,
  Globe,
  Instagram,
  Moon,
  Palette,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import { AppCard } from "@/features/apps/AppCard";
import { ResourceCard } from "@/features/apps/ResourceCard";
import { SearchFilter } from "@/features/apps/SearchFilter";
import { FileConverter } from "@/features/apps/FileConverter";
import { VideoDownloader } from "@/features/apps/VideoDownloader";
import { BackgroundRemover } from "@/features/apps/BackgroundRemover";
import { CodeEditor } from "@/features/apps/CodeEditor";

const apps = [
  {
    name: "Instagram Downloader",
    description: "Input URL, generate a preview, and start downloads with a backend-ready placeholder fetch.",
    buttonLabel: "Use Tool",
    category: "Downloaders",
    icon: Instagram,
    tool: "downloader",
  },
  {
    name: "Background Remover",
    description: "Upload an image, simulate background removal, and export the processed preview instantly.",
    buttonLabel: "Use Tool",
    category: "Editors",
    icon: FileImage,
    tool: "background-remover",
  },
  {
    name: "Online Code Editor",
    description: "Multi-language editor with line numbers, theme-friendly UI, and JS/Python run preview flow.",
    buttonLabel: "Use Tool",
    category: "Editors",
    icon: Code2,
    tool: "code-editor",
  },
  {
    name: "File Converter",
    description: "Pluggable file conversion UI that is modular and prepared for backend API integrations.",
    buttonLabel: "Use Tool",
    category: "Converters",
    icon: FileCog,
    tool: "converter",
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

const categories = ["All", "Converters", "Downloaders", "Editors"];

const toolComponents = {
  converter: FileConverter,
  downloader: VideoDownloader,
  "background-remover": BackgroundRemover,
  "code-editor": CodeEditor,
};

export const AppsPage = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTool, setActiveTool] = useState("downloader");
  const isDark = resolvedTheme !== "light";

  const filteredApps = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return apps.filter((app) => {
      const categoryMatch = activeCategory === "All" || app.category === activeCategory;
      const queryMatch = !normalized || `${app.name} ${app.description}`.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [query, activeCategory]);

  const ActiveTool = toolComponents[activeTool] ?? VideoDownloader;

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
          <h1 className="mt-3 text-4xl font-extrabold text-foreground sm:text-5xl">Apps & Resources Hub</h1>
          <p className="mt-4 max-w-3xl text-base text-foreground/75 sm:text-lg">
            Responsive, animated utilities with dark-red branding. Each module is structured for future API/backend integration.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF3B30]/40 bg-[#FF3B30]/10 px-4 py-2 text-sm font-semibold text-[#FF3B30]">
              <Sparkles className="h-4 w-4" />
              Featured: Instagram Downloader
            </div>
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-4 py-2 text-sm font-semibold text-foreground/85 backdrop-blur transition-all duration-300 hover:border-[#FF3B30]/60 hover:text-[#FF3B30]"
              aria-label="Toggle dark and light mode"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </motion.header>

        <section className="mt-10" aria-label="Apps catalog">
          <SearchFilter
            query={query}
            onQueryChange={setQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={categories}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredApps.map((app, index) => (
              <AppCard key={app.name} app={app} index={index} onSelectTool={setActiveTool} />
            ))}
          </div>
        </section>

        <section className="mt-10" aria-label="Tool workspace">
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="grid gap-5 lg:grid-cols-2">
            <ActiveTool />
            <div className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-foreground">Integration Notes</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                <li>• Replace placeholder async actions with backend APIs.</li>
                <li>• Existing toast states support success/error feedback for all modules.</li>
                <li>• Components are split for maintainability and dynamic search/filter wiring.</li>
                <li>• Framer Motion animations handle entrance, hover, and micro-interactions.</li>
              </ul>
            </div>
          </motion.div>
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
            <p className="mt-2 text-foreground/70">Curated platforms grouped by category with quick actions and fade-in cards.</p>
            <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#FF3B30] transition-all duration-300 hover:translate-x-1">
              Explore more resource collections
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="space-y-10">
            {Object.entries(resourceGroups).map(([title, resources]) => (
              <section key={title}>
                <h3 className="mb-4 text-xl font-semibold text-foreground">{title}</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {resources.map((resource, index) => (
                    <ResourceCard key={resource.name} resource={resource} index={index} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
