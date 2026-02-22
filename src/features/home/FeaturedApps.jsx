import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { appsCatalog } from "@/data/apps";
import { cardReveal, staggerContainer } from "@/lib/animations";

export const FeaturedApps = () => {
  const navigate = useNavigate();
  const featuredApps = appsCatalog;

  const handleOpenApp = (appId) => {
    navigate(`/apps#${appId}`);
  };

  return (
    <section id="featured-apps" className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl text-left">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl">Featured Apps</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Jump straight into our most-used tools. Each card opens the Apps hub and auto-focuses the selected utility.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/apps")}
            className="rounded-xl border border-border/70 bg-card/50 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#FF3B30]/60 hover:text-[#FF3B30]"
          >
            See More
          </button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {featuredApps.map((app) => {
            const Icon = app.icon;

            return (
              <motion.article
                key={app.id}
                variants={cardReveal}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="group rounded-2xl border border-border/70 bg-linear-to-br from-card/85 to-card/45 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl"
              >
                <div className="inline-flex rounded-xl bg-[#FF3B30]/15 p-3 text-[#FF3B30] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold">{app.featuredLabel}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{app.description}</p>
                <button
                  type="button"
                  onClick={() => handleOpenApp(app.id)}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-[#FF3B30] hover:underline"
                >
                  Open Tool
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
