import { useEffect } from "react";
import { motion } from "framer-motion";
import logoDark from "@/assets/Logo dark.png";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 97) % 100}%`,
  top: `${(i * 53) % 100}%`,
  duration: 4 + (i % 4),
}));

const WelcomeScreen = ({ onWelcomeComplete }) => {
  useEffect(() => {
    const timer = window.setTimeout(onWelcomeComplete, 3200);
    return () => window.clearTimeout(timer);
  }, [onWelcomeComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#090909]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,59,48,0.3), transparent 45%), radial-gradient(circle at 80% 20%, rgba(255,59,48,0.2), transparent 40%), linear-gradient(130deg, #090909 10%, #1b0d0c 45%, #090909 90%)",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#FF3B30]/55"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(255,59,48,0.18)] backdrop-blur-2xl"
      >
        <img src={logoDark} alt="Dev Fraol Academy" className="mx-auto w-52 sm:w-64" />
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
