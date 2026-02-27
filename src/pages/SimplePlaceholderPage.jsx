import { motion } from "framer-motion";

export const SimplePlaceholderPage = ({ title }) => {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 text-white">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-black/50 p-8 text-center backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-[#FF3B30]">{title}</h1>
        <p className="mt-3 text-white/70">This area is wired for authenticated navigation and ready for backend-powered data.</p>
      </motion.div>
    </section>
  );
};
