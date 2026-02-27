import { useMemo, useState } from "react";
import { useMockApi } from "@/context/MockApiContext";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ResourceCategory } from "./ResourceCategory";

export const AppDetail = ({ title, description, icon: Icon, features = [], demoUrl, categoryData = null, resources = [], appId, onOpenApp, ToolComponent = null }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { openApp, actionLoading } = useMockApi();

  const categories = useMemo(() => {
    if (!categoryData?.length) return ["All"];
    return ["All", ...new Set(categoryData.map((item) => item.category))];
  }, [categoryData]);

  const filteredCategories = useMemo(() => {
    if (!categoryData?.length) return [];
    const cleanQuery = query.trim().toLowerCase();

    return categoryData.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const queryMatch = !cleanQuery || `${item.name} ${item.description} ${item.link}`.toLowerCase().includes(cleanQuery);
      return categoryMatch && queryMatch;
    });
  }, [categoryData, category, query]);

  const handleOpenApp = async () => {
    const app = await openApp(appId);
    if (!app) return;

    if (ToolComponent) {
      const toolSection = document.getElementById("tool-section");
      toolSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    onOpenApp?.();
  };

  const handleExploreDetails = () => {
    const detailsSection = document.getElementById("details");
    detailsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 text-left">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-7 sm:p-10">
          <div className="inline-flex rounded-2xl bg-[#FF3B30]/15 p-4 text-[#FF3B30]">
            <Icon className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-4xl font-black sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base text-foreground/75 sm:text-lg">{description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={handleOpenApp} type="button" className="inline-flex items-center gap-2 rounded-xl border border-[#FF3B30]/70 bg-[#FF3B30]/85 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(255,59,48,0.35)] backdrop-blur-xl transition hover:scale-[1.03] hover:shadow-[0_16px_35px_rgba(255,59,48,0.45)]">
              {actionLoading[`open-app:${appId}`] ? "Opening..." : "Open App"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <Link to="/apps" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-xl transition hover:scale-[1.02] hover:border-[#FF3B30]/60 hover:text-[#FF3B30]">
              <ArrowLeft className="h-4 w-4" />
              Back to Apps
            </Link>
            <button
              type="button"
              onClick={handleExploreDetails}
              className="inline-flex items-center rounded-xl border border-white/20 bg-black/30 px-5 py-3 text-sm font-semibold text-foreground/90 transition hover:border-[#FF3B30]/60 hover:text-[#FF3B30]"
            >
              Explore Details
            </button>
          </div>
        </motion.section>



        {ToolComponent ? (
          <section id="tool-section" className="scroll-mt-24 glass-panel rounded-3xl p-7 sm:p-9">
            <h2 className="text-2xl font-bold sm:text-3xl">Try the app</h2>
            <p className="mt-2 text-sm text-foreground/70">Interactive mock module powered by local context and frontend state.</p>
            <div className="mt-5">
              <ToolComponent />
            </div>
          </section>
        ) : null}

        <section id="details" className="scroll-mt-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="glass-panel rounded-3xl p-7 sm:p-9">
            <h2 className="text-2xl font-bold sm:text-3xl">Features & Instructions</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {features.length === 0 ? <p className="text-sm text-foreground/70">No feature list available for this app yet.</p> : null}
              {features.map((feature, index) => (
                <motion.article key={feature} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm leading-relaxed text-foreground/80">{feature}</p>
                </motion.article>
              ))}
            </div>

            {demoUrl && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-5">
                <h3 className="text-lg font-semibold">Quick Demo</h3>
                <a href={demoUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_10px_25px_rgba(255,59,48,0.35)]">
                  Watch Demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </motion.div>
        </section>

        {categoryData?.length > 0 && (
          <section className="glass-panel rounded-3xl p-7 sm:p-9">
            <h2 className="text-2xl font-bold sm:text-3xl">Website Categories</h2>
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search websites" className="w-full rounded-xl border border-white/10 bg-black/25 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#FF3B30]/65" />
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <motion.button key={item} type="button" whileTap={{ scale: 0.96 }} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-[#FF3B30] text-white shadow-[0_10px_20px_rgba(255,59,48,0.28)]" : "border border-white/10 text-foreground/80 hover:border-[#FF3B30]/50 hover:text-[#FF3B30]"}`}>
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <ResourceCategory websites={filteredCategories} />
            </div>
          </section>
        )}

        <section className="glass-panel rounded-3xl p-7 sm:p-9">
          <h2 className="text-2xl font-bold">Additional Resources</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {resources.length === 0 ? <p className="text-sm text-foreground/70">No additional resources available yet.</p> : null}
            {resources.map((resource) => {
              const isExternal = resource.link?.startsWith("http");

              if (isExternal) {
                return (
                  <a key={resource.name} href={resource.link} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#FF3B30]/60 hover:text-[#FF3B30]">
                    {resource.name}
                  </a>
                );
              }

              return (
                <Link key={resource.name} to={resource.link} className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#FF3B30]/60 hover:text-[#FF3B30]">
                  {resource.name}
                </Link>
              );
            })}
          </div>
        </section>

        <footer className="pb-2">
          <Link to="/apps" className="inline-flex items-center gap-2 rounded-xl border border-[#FF3B30]/55 bg-[#FF3B30]/15 px-5 py-3 text-sm font-semibold text-[#FF3B30] transition hover:scale-[1.02]">
            Return to Apps Page
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </footer>
      </div>
    </main>
  );
};
