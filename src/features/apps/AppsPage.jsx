import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { appsCatalog, webRecommendations } from "@/data/apps";
import { ResourceCategory } from "./ResourceCategory";

const appCategories = ["All", "Downloaders", "Editors", "Converters", "Resources"];
export const AppsPage = () => {
  const [appQuery, setAppQuery] = useState("");
  const [appCategory, setAppCategory] = useState("All");
  const [webQuery, setWebQuery] = useState("");
  const [webCategory, setWebCategory] = useState("All");

  const filteredApps = useMemo(() => {
    const q = appQuery.trim().toLowerCase();
    return appsCatalog.filter((app) => {
      const categoryMatch = appCategory === "All" || app.category === appCategory;
      const queryMatch = !q || `${app.name} ${app.description}`.toLowerCase().includes(q);
      return categoryMatch && queryMatch;
    });
  }, [appQuery, appCategory]);

  const filteredWebsites = useMemo(() => {
    const q = webQuery.trim().toLowerCase();
    return webRecommendations.filter((item) => {
      const categoryMatch = webCategory === "All" || item.category === webCategory;
      const queryMatch = !q || `${item.name} ${item.description} ${item.link}`.toLowerCase().includes(q);
      return categoryMatch && queryMatch;
    });
  }, [webQuery, webCategory]);

  const dynamicWebCategories = useMemo(() => {
    return ["All", ...new Set(webRecommendations.map((item) => item.category))];
  }, []);

  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl text-left">
        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF3B30]">Dev Fraol Academy</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Apps</h1>
          <p className="mt-4 max-w-3xl text-foreground/75">Discover every utility app in one place. Open any card for its dedicated detail page.</p>
        </motion.header>

        <section className="mt-10">
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <label className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
              <input value={appQuery} onChange={(e) => setAppQuery(e.target.value)} placeholder="Search apps" className="w-full rounded-xl border border-white/10 bg-black/25 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#FF3B30]/65" />
            </label>
            <div className="flex flex-wrap gap-2">
              {appCategories.map((category) => (
                <button key={category} type="button" onClick={() => setAppCategory(category)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${appCategory === category ? "bg-[#FF3B30] text-white" : "border border-white/10 text-foreground/75 hover:border-[#FF3B30]/50 hover:text-[#FF3B30]"}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredApps.map((app, index) => {
              const Icon = app.icon;
              return (
                <motion.article key={app.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ scale: 1.03, y: -5 }} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl hover:shadow-[0_14px_30px_rgba(255,59,48,0.2)]">
                  <div className="inline-flex rounded-xl bg-[#FF3B30]/15 p-3 text-[#FF3B30]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{app.name}</h3>
                  <p className="mt-2 text-sm text-foreground/75">{app.description}</p>
                  <Link to={app.route} className="mt-5 inline-flex items-center rounded-lg bg-[#FF3B30] px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_8px_22px_rgba(255,59,48,0.35)]">
                    Open App
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">Web Recommended</h2>
          <p className="mt-2 text-foreground/75">Massive collection of useful websites with category filters and search.</p>

          <div className="mt-6 mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <label className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
              <input value={webQuery} onChange={(e) => setWebQuery(e.target.value)} placeholder="Search websites" className="w-full rounded-xl border border-white/10 bg-black/25 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#FF3B30]/65" />
            </label>
            <div className="flex flex-wrap gap-2">
              {dynamicWebCategories.map((category) => (
                <button key={category} type="button" onClick={() => setWebCategory(category)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${webCategory === category ? "bg-[#FF3B30] text-white" : "border border-white/10 text-foreground/75 hover:border-[#FF3B30]/50 hover:text-[#FF3B30]"}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <ResourceCategory websites={filteredWebsites} />
        </section>
      </div>
    </main>
  );
};
