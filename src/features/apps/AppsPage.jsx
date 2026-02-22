import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowRight, Moon, ShieldCheck, Sparkles, Star, Sun, Trophy } from "lucide-react";
import { toast } from "@/hooks/useToastStore";
import { AppCard } from "@/features/apps/AppCard";
import { ResourceCard } from "@/features/apps/ResourceCard";
import { SearchFilter } from "@/features/apps/SearchFilter";
import { FileConverter } from "@/features/apps/FileConverter";
import { VideoDownloader } from "@/features/apps/VideoDownloader";
import { BackgroundRemover } from "@/features/apps/BackgroundRemover";
import { CodeEditor } from "@/features/apps/CodeEditor";
import { appCategories, appsCatalog } from "@/features/apps/appsData";

const API_ENDPOINTS = {
  convert: "/api/convert",
  videoDownload: "/api/video/download",
  backgroundRemove: "/api/bg-remove",
  codeRun: "/api/code/run",
  resources: "/api/resources",
};

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
  const [activeTool, setActiveTool] = useState("converter");
  const [resourceQuery, setResourceQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [isResourcesLoading, setIsResourcesLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [favoriteApps, setFavoriteApps] = useState(() => JSON.parse(localStorage.getItem("fav-apps") || "[]"));
  const [favoriteResources, setFavoriteResources] = useState(() => JSON.parse(localStorage.getItem("fav-resources") || "[]"));
  const [usageByTool, setUsageByTool] = useState(() => JSON.parse(localStorage.getItem("tool-usage") || "{}"));
  const isDark = resolvedTheme !== "light";

  useEffect(() => localStorage.setItem("fav-apps", JSON.stringify(favoriteApps)), [favoriteApps]);
  useEffect(() => localStorage.setItem("fav-resources", JSON.stringify(favoriteResources)), [favoriteResources]);
  useEffect(() => localStorage.setItem("tool-usage", JSON.stringify(usageByTool)), [usageByTool]);

  useEffect(() => {
    const controller = new AbortController();

    const loadResources = async () => {
      setIsResourcesLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.resources, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to fetch resources right now.");

        const data = await response.json();
        const normalized = Array.isArray(data) ? data : data.resources;
        setResources(Array.isArray(normalized) ? normalized : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setResources([]);
          toast({ title: "Resources unavailable", description: "Could not fetch recommended resources.", variant: "destructive" });
        }
      } finally {
        setIsResourcesLoading(false);
      }
    };

    loadResources();

    return () => controller.abort();
  }, []);

  const filteredApps = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return appsCatalog.filter((app) => {
      const categoryMatch = activeCategory === "All" || app.category === activeCategory;
      const queryMatch = !normalized || `${app.name} ${app.description}`.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [query, activeCategory]);

  const ActiveTool = toolComponents[activeTool] ?? VideoDownloader;

  const filteredResources = useMemo(() => {
    const normalizedQuery = resourceQuery.trim().toLowerCase();
    return resources.filter((resource) => {
      if (!normalizedQuery) return true;
      return `${resource.title ?? ""} ${resource.description ?? ""} ${resource.link ?? ""}`.toLowerCase().includes(normalizedQuery);
    });
  }, [resourceQuery, resources]);

  const onSelectTool = (tool) => {
    setActiveTool(tool);
    setUsageByTool((prev) => ({ ...prev, [tool]: (prev[tool] ?? 0) + 1 }));
  };

  const toggleFavoriteApp = (appId) => {
    setFavoriteApps((prev) => (prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]));
  };

  const toggleFavoriteResource = (resourceId) => {
    setFavoriteResources((prev) => (prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId]));
  };

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-3xl border border-border/65 bg-gradient-to-br from-card/80 to-card/40 px-6 py-10 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF3B30]">Dev Fraol Academy</p>
          <h1 className="mt-3 text-4xl font-extrabold text-foreground sm:text-5xl">Apps & Resources Hub</h1>
          <p className="mt-4 max-w-3xl text-base text-foreground/75 sm:text-lg">Responsive, animated utilities with dark-red branding. Each module is structured for future API/backend integration.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF3B30]/40 bg-[#FF3B30]/10 px-4 py-2 text-sm font-semibold text-[#FF3B30]"><Sparkles className="h-4 w-4" />Featured: File Converter</div>
            <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-4 py-2 text-sm font-semibold text-foreground/85 backdrop-blur transition-all duration-300 hover:border-[#FF3B30]/60 hover:text-[#FF3B30]" aria-label="Toggle dark and light mode">{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{isDark ? "Light mode" : "Dark mode"}</button>
          </div>
        </motion.header>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-card/45 p-4 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF3B30]">Authentication</p>
            <p className="mt-2 text-sm text-foreground/70">Backend-ready auth controls for sign up/login/logout state.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => { setIsLoggedIn(true); setIsAdmin(false); toast({ title: "Logged in", description: "Student session started.", variant: "success" }); }} className="rounded-lg bg-[#FF3B30] px-3 py-2 text-xs font-semibold text-white">Login</button>
              <button onClick={() => { setIsLoggedIn(true); setIsAdmin(false); toast({ title: "Account created", description: "Signup flow placeholder complete.", variant: "success" }); }} className="rounded-lg border border-[#FF3B30]/60 px-3 py-2 text-xs font-semibold text-[#FF3B30]">Sign up</button>
              <button onClick={() => { setIsLoggedIn(false); setIsAdmin(false); toast({ title: "Logged out", description: "Session ended.", variant: "default" }); }} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80">Logout</button>
            </div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/45 p-4 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF3B30]">Progress & Gamification</p>
            <p className="mt-2 text-sm text-foreground/70">Track tool usage, unlock badges, and monitor learning progress.</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-foreground/80"><Trophy className="h-4 w-4 text-[#FF3B30]" />Total Runs: {Object.values(usageByTool).reduce((sum, value) => sum + value, 0)}</div>
            <div className="mt-2 flex items-center gap-2 text-sm text-foreground/80"><Star className="h-4 w-4 text-[#FF3B30]" />Badges: {Object.keys(usageByTool).length >= 3 ? "Explorer" : "Starter"}</div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/45 p-4 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF3B30]">Admin Controls</p>
            <p className="mt-2 text-sm text-foreground/70">Enable an admin panel mode for app/resource management.</p>
            <button onClick={() => { setIsAdmin((prev) => !prev); setIsLoggedIn(true); }} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#FF3B30]/60 px-3 py-2 text-xs font-semibold text-[#FF3B30]"><ShieldCheck className="h-3.5 w-3.5" />{isAdmin ? "Disable" : "Enable"} Admin Mode</button>
          </div>
        </section>

        <section className="mt-10" aria-label="Apps catalog">
          <SearchFilter query={query} onQueryChange={setQuery} activeCategory={activeCategory} onCategoryChange={setActiveCategory} categories={appCategories} />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredApps.map((app, index) => (
              <AppCard key={app.id} app={app} index={index} onSelectTool={onSelectTool} isFavorited={favoriteApps.includes(app.id)} onToggleFavorite={toggleFavoriteApp} />
            ))}
          </div>
        </section>

        <section className="mt-10" aria-label="Tool workspace">
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="grid gap-5 lg:grid-cols-2">
            <ActiveTool endpoints={API_ENDPOINTS} />
            <div className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-foreground">Integration Notes</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                <li>• API endpoints are passed from AppsPage to every tool component as props.</li>
                <li>• Upload/download flows now call your Express endpoints and return live results.</li>
                <li>• Per-user ready modules: auth, favorites, usage analytics, and admin mode toggles.</li>
                <li>• Code editor supports local snippet saving, share links, and dark/light controls.</li>
              </ul>
              <div className="mt-4 rounded-xl border border-[#FF3B30]/35 bg-[#FF3B30]/10 p-3 text-xs text-[#FF3B30]">{isLoggedIn ? "Authenticated session active" : "Guest mode active"} {isAdmin ? "• Admin panel enabled" : "• Admin panel disabled"}</div>
            </div>
          </motion.div>
        </section>

        <section className="mt-16">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35 }} className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Recommended Resources</h2>
            <p className="mt-2 text-foreground/70">Fetched dynamically from your backend API with copy, quick-visit, and bookmarks.</p>
            <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#FF3B30] transition-all duration-300 hover:translate-x-1">Explore more resource collections<ArrowRight className="h-4 w-4" /></a>
          </motion.div>

          <div className="space-y-6">
            <input value={resourceQuery} onChange={(event) => setResourceQuery(event.target.value)} placeholder="Search recommended resources" className="w-full rounded-xl border border-border/80 bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-[#FF3B30]/70" />
            {isResourcesLoading ? <p className="text-sm text-foreground/70">Loading resources...</p> : null}
            {!isResourcesLoading && filteredResources.length === 0 ? <p className="rounded-xl border border-border/65 bg-card/40 p-4 text-sm text-foreground/75">No resources found from the backend response.</p> : null}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredResources.map((resource, index) => {
                const resourceId = resource.id ?? `${resource.link}-${index}`;
                return <ResourceCard key={resourceId} resource={resource} index={index} isFavorited={favoriteResources.includes(resourceId)} onToggleFavorite={() => toggleFavoriteResource(resourceId)} />;
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
