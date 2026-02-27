import { motion } from "framer-motion";

export const HeroSection = ({ course, stats }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-[#111827] to-[#0f172a] p-6 shadow-[0_24px_60px_rgba(8,47,73,0.35)] sm:p-10"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Course detail</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">{course.title}</h1>
          <p className="mt-4 max-w-2xl text-gray-200 leading-relaxed">{course.description}</p>
          <button className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-100">
            Start Learning
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((item) => (
            <motion.article
              whileHover={{ y: -3, scale: 1.01 }}
              key={item.label}
              className="rounded-2xl border border-white/15 bg-white/5 p-4"
            >
              <p className="text-2xl font-bold text-white">{item.value}</p>
              <p className="mt-1 text-sm text-gray-300">{item.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
