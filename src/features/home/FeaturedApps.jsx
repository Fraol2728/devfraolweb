import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { appsCatalog } from "@/features/apps/appsData";

export const FeaturedApps = () => {
  const featuredApps = appsCatalog.slice(0, 4);

  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF3B30]">Featured Apps</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">Try Production-Ready Tools</h2>
            <p className="mt-2 max-w-2xl text-foreground/70">File conversion, video downloading, image cleanup, and code utilities with API-ready architecture.</p>
          </div>
          <Link
            to="/apps"
            className="inline-flex items-center gap-2 rounded-xl border border-[#FF3B30]/40 bg-[#FF3B30]/10 px-4 py-2 text-sm font-semibold text-[#FF3B30] transition-all duration-300 hover:translate-y-[-1px] hover:border-[#FF3B30]/70"
          >
            See More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featuredApps.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.article
                key={app.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="rounded-2xl border border-border/70 bg-card/55 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#FF3B30]/60 hover:shadow-[0_16px_36px_rgba(255,59,48,0.22)]"
              >
                <div className="mb-4 inline-flex rounded-lg bg-[#FF3B30]/15 p-2.5 text-[#FF3B30]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{app.name}</h3>
                <p className="mt-2 text-sm text-foreground/70">{app.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
