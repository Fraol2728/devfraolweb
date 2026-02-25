import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ResourceCategory } from "./ResourceCategory";
import { useApps } from "@/features/apps/hooks/useApps";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Container } from "@/shared/ui/Container";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Section } from "@/shared/ui/Section";

const appCategories = ["All", "Downloaders", "Utilities", "Editors", "Design", "Marketing", "Programming", "Converters", "Resources"];
export const AppsPage = () => {
  const { apps: appsCatalog = [], webRecommendations = [], loading, openApp, actionLoading } = useApps();
  const [appQuery, setAppQuery] = useState("");
  const [appCategory, setAppCategory] = useState("All");
  const [webQuery, setWebQuery] = useState("");
  const [webCategory, setWebCategory] = useState("All");

  const filteredApps = useMemo(() => {
    const q = appQuery.trim().toLowerCase();
    return appsCatalog.filter((app) => (appCategory === "All" || app.category === appCategory) && (!q || `${app.name} ${app.description}`.toLowerCase().includes(q)));
  }, [appsCatalog, appQuery, appCategory]);

  const filteredWebsites = useMemo(() => {
    const q = webQuery.trim().toLowerCase();
    return webRecommendations.filter((item) => (webCategory === "All" || item.category === webCategory) && (!q || `${item.name} ${item.description} ${item.link}`.toLowerCase().includes(q)));
  }, [webRecommendations, webQuery, webCategory]);

  const dynamicWebCategories = useMemo(() => ["All", ...new Set(webRecommendations.map((item) => item.category))], [webRecommendations]);

  return (
    <Container className="py-14 text-left">
      <PageHeader title="Apps" description="Discover every utility app in one place. Open any card for its dedicated detail page." />
      <Section>
        <div className="mb-6 flex flex-col gap-4 glass-panel rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative w-full sm:max-w-sm" htmlFor="app-search">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
            <input id="app-search" value={appQuery} onChange={(e) => setAppQuery(e.target.value)} placeholder="Search apps" className="w-full rounded-xl border border-white/10 bg-black/25 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#FF3B30]/65" />
          </label>
          <div className="flex flex-wrap gap-2">{appCategories.map((category) => <Button key={category} variant={appCategory === category ? "primary" : "outline"} className="rounded-full px-3 py-1.5 text-xs" onClick={() => setAppCategory(category)} aria-label={`Filter apps by ${category}`}>{category}</Button>)}</div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {loading.list ? <p className="text-sm text-foreground/70">Loading apps...</p> : null}
          {!loading.list && filteredApps.length === 0 ? <EmptyState text="No apps matched your search." /> : null}
          {!loading.list && filteredApps.map((app, index) => {
            const Icon = typeof app.icon === "string" ? null : app.icon;
            const actionKey = `open-app:${app.id}`;
            return (
              <motion.div key={app.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                <Card>
                  <div className="inline-flex rounded-xl bg-[#FF3B30]/15 p-3 text-[#FF3B30]">
                    {Icon ? <Icon className="h-5 w-5" /> : <img src={app.icon} alt="" className="h-5 w-5" />}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{app.name}</h3>
                  <p className="mt-2 text-sm text-foreground/75">{app.description}</p>
                  <Link to={app.route || `/apps/${app.id}`} onClick={() => openApp(app.id)} className="mt-5 inline-flex" aria-label={`Open ${app.name}`}>
                    <Button>{actionLoading[actionKey] ? "Opening..." : "Open App"}</Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section className="mt-6">
        <h2 className="text-3xl font-bold">Web Recommended</h2>
        <p className="mt-2 text-foreground/75">Massive collection of useful websites with category filters and search.</p>
        <div className="mt-6 mb-6 flex flex-col gap-4 glass-panel rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative w-full sm:max-w-sm" htmlFor="website-search">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
            <input id="website-search" value={webQuery} onChange={(e) => setWebQuery(e.target.value)} placeholder="Search websites" className="w-full rounded-xl border border-white/10 bg-black/25 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#FF3B30]/65" />
          </label>
          <div className="flex flex-wrap gap-2">{dynamicWebCategories.map((category) => <Button key={category} variant={webCategory === category ? "primary" : "outline"} className="rounded-full px-3 py-1.5 text-xs" onClick={() => setWebCategory(category)} aria-label={`Filter websites by ${category}`}>{category}</Button>)}</div>
        </div>
        {filteredWebsites.length === 0 ? <EmptyState text="No websites found for the current filters." /> : null}
        <ResourceCategory websites={filteredWebsites} />
      </Section>
    </Container>
  );
};
