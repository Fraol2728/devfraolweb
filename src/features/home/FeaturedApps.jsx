import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { appsCatalog } from "@/data/apps";
import { cardReveal, staggerContainer } from "@/lib/animations";
import { NavButton } from "@/components/common/NavButton";

export const FeaturedApps = () => {
  const featuredApps = appsCatalog.slice(0, 4);

  return (
    <section id="featured-apps" className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl text-left">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl">Featured Apps</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Explore top utility apps and jump directly to each app page.
            </p>
          </div>
          <NavButton
            to="/apps"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-xl transition hover:border-[#FF3B30]/60 hover:text-[#FF3B30]"
          >
            See More
          </NavButton>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {featuredApps.map((app) => {
            const Icon = app.icon;

            return (
              <motion.article
                key={app.id}
                variants={cardReveal}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
              >
                <div className="inline-flex rounded-xl bg-[#FF3B30]/15 p-3 text-[#FF3B30] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold">{app.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{app.description}</p>
                <Link to={app.route} className="mt-5 inline-flex items-center gap-2 font-semibold text-[#FF3B30] hover:underline">
                  Open App
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
