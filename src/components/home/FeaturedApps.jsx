import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

export const FeaturedApps = ({ apps = [], loading = false }) => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8" aria-labelledby="featured-apps">
      <h2 id="featured-apps" className="text-3xl font-bold text-white md:text-4xl">
        Featured Apps
      </h2>
      <p className="mt-3 text-slate-300">Try tools made for creators, developers, and productivity-focused learners.</p>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(loading ? Array.from({ length: 3 }) : apps).map((app, idx) => (
          <motion.article key={app?.id ?? idx} variants={item} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-lg backdrop-blur">
            {loading ? (
              <div className="h-[250px] animate-pulse bg-slate-800" />
            ) : (
              <>
                <img src={app.image} alt={`${app.name} app preview`} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-300">{app.category}</span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{app.name}</h3>
                  <button className="mt-6 inline-flex rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-300 outline-none transition hover:bg-cyan-500/10 focus-visible:ring-2 focus-visible:ring-cyan-300">
                    Open App
                  </button>
                </div>
              </>
            )}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};
