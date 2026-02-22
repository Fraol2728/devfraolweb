import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoDark from "@/assets/Logo dark.png";

const welcomeMessage = "Welcome to Dev Fraol Academy";
const subTitle = "Code. Create. Launch your journey.";

const particles = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 67) % 100}%`,
  top: `${(index * 41) % 100}%`,
  size: index % 3 === 0 ? "h-1.5 w-1.5" : "h-1 w-1",
  duration: 5 + (index % 5),
  delay: (index % 6) * 0.2,
}));

const typeSpeedMs = 42;
const holdBeforeExitMs = 900;
const exitDurationMs = 700;

const WelcomePage = ({ onWelcomeComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const typedMessage = useMemo(() => welcomeMessage.slice(0, messageIndex), [messageIndex]);

  useEffect(() => {
    if (messageIndex < welcomeMessage.length) {
      const typeTimer = window.setTimeout(() => {
        setMessageIndex((previous) => previous + 1);
      }, typeSpeedMs);

      return () => window.clearTimeout(typeTimer);
    }

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, holdBeforeExitMs);

    return () => window.clearTimeout(exitTimer);
  }, [messageIndex]);

  useEffect(() => {
    if (!isExiting) {
      return undefined;
    }

    const completionTimer = window.setTimeout(onWelcomeComplete, exitDurationMs - 20);
    return () => window.clearTimeout(completionTimer);
  }, [isExiting, onWelcomeComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.section
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050505] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, #030303 0%, #180707 42%, #080808 70%, #1a0909 100%)",
              backgroundSize: "180% 180%",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,59,48,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,59,48,0.16),transparent_35%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.08),transparent_40%)]"
            animate={{ opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className={`absolute rounded-full bg-[#FF3B30]/60 ${particle.size}`}
              style={{ left: particle.left, top: particle.top }}
              animate={{ y: [0, -22, 0], opacity: [0.18, 0.9, 0.18], scale: [0.9, 1.15, 0.9] }}
              transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
            />
          ))}

          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_90px_rgba(255,59,48,0.2)] backdrop-blur-xl sm:p-9">
            <motion.img
              src={logoDark}
              alt="Dev Fraol Academy"
              className="mx-auto w-52 sm:w-64 md:w-72"
              initial={{ opacity: 0, scale: 0.84, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "drop-shadow(0 0 18px rgba(255,59,48,0.45))" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <p className="text-lg font-semibold tracking-wide text-white sm:text-2xl">
                {typedMessage}
                <span className="ml-1 inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-[#FF3B30]" />
              </p>
              <p className="mt-3 text-sm text-white/70 sm:text-base">{subTitle}</p>
            </motion.div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/70 to-transparent"
            animate={{ opacity: [0.65, 0.9, 0.65] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default WelcomePage;
