import { motion } from "framer-motion";

export const Map = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-md"
      aria-label="Academy location map"
    >
      <iframe
        title="Dev Fraol Academy location"
        src="https://maps.google.com/maps?q=San%20Francisco&t=&z=10&ie=UTF8&iwloc=&output=embed"
        className="h-72 w-full rounded-xl border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </motion.section>
  );
};
