import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoDark from "@/assets/Logo dark.png";

const welcomeMessage = "Welcome to Dev Fraol Academy";
const subTitle = "Code. Create. Launch your journey.";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 53) % 100}%`,
  top: `${(index * 37) % 100}%`,
  size: index % 4 === 0 ? "h-1.5 w-1.5" : "h-1 w-1",
  duration: 5 + (index % 4),
  delay: (index % 6) * 0.18,
}));

const typeSpeedMs = 46;
const holdBeforeExitMs = 1200;
const exitDurationMs = 700;

export const WelcomePage = ({ onWelcomeComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [revealSubtitle, setRevealSubtitle] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const typedMessage = useMemo(() => welcomeMessage.slice(0, messageIndex), [messageIndex]);

  useEffect(() => {
    if (messageIndex < welcomeMessage.length) {
      const typeTimer = window.setTimeout(() => {
        setMessageIndex((previous) => previous + 1);
      }, typeSpeedMs);

      return () => window.clearTimeout(typeTimer);
    }

    const subtitleTimer = window.setTimeout(() => setRevealSubtitle(true), 260);
    const exitTimer = window.setTimeout(() => setIsExiting(true), holdBeforeExitMs);

    return () => {
      window.clearTimeout(subtitleTimer);
      window.clearTimeout(exitTimer);
    };
  }, [messageIndex]);

  useEffect(() => {
    if (!isExiting) return undefined;

    const completionTimer = window.setTimeout(onWelcomeComplete, exitDurationMs - 30);
    return () => window.clearTimeout(completionTimer);
  }, [isExiting, onWelcomeComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.section
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(128deg, #040404 0%, #120506 32%, #2a0709 58%, #140507 74%, #050505 100%)",
              backgroundSize: "200% 200%",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,59,48,0.23),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(255,59,48,0.15),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.07),transparent_45%)]"
            animate={{ opacity: [0.5, 0.82, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className={`absolute rounded-full bg-[#FF3B30]/65 ${particle.size}`}
              style={{ left: particle.left, top: particle.top }}
              animate={{ y: [0, -20, 0], opacity: [0.16, 0.88, 0.16], scale: [0.92, 1.16, 0.92] }}
              transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
            />
          ))}

          <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_0_100px_rgba(255,59,48,0.2)] backdrop-blur-2xl sm:p-10">
            <motion.img
              src={logoDark}
              alt="Dev Fraol Academy"
              className="mx-auto w-52 sm:w-64 md:w-72"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "drop-shadow(0 0 20px rgba(255,59,48,0.45))" }}
              transition={{ duration: 0.95, ease: "easeOut", delay: 0.2 }}
            />

            <div className="mt-7 text-center">
              <motion.h1
                className="text-3xl font-extrabold tracking-tight sm:text-5xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
              >
                <span className="bg-gradient-to-r from-[#FF3B30] via-[#d81f1a] to-[#a91212] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,59,48,0.32)]">
                  {typedMessage}
                </span>
                <span className="ml-1 inline-block h-7 w-[2px] translate-y-1 animate-pulse bg-[#FF3B30]" />
              </motion.h1>

              <AnimatePresence>
                {revealSubtitle && (
                  <motion.p
                    className="mt-3 text-sm text-white/75 sm:text-base"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55 }}
                  >
                    {subTitle}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent"
            animate={{ opacity: [0.6, 0.92, 0.6] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default WelcomePage;
