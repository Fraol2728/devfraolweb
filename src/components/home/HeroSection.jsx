import { motion } from "framer-motion";

export const HeroSection = ({ backgroundImage }) => {
  return (
    <header
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(2, 6, 23, 0.85), rgba(2, 132, 199, 0.4)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center text-white md:px-8">
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200"
        >
          Dev Fraol Academy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl"
        >
          Learn, Code, and Create with Industry-Ready Skills
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-100 md:text-lg"
        >
          Build real-world projects, master modern technologies, and grow with a supportive learning community.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 rounded-full bg-cyan-400 px-8 py-3 text-base font-semibold text-slate-900 shadow-lg outline-none ring-offset-2 transition hover:bg-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-100"
        >
          Get Started
        </motion.button>
      </div>
    </header>
  );
};
