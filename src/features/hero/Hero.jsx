import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const lines = [
  "Booting Dev Fraol Academy...",
  "Loading Web Development Track...",
  "Loading Graphic Design Track...",
  "Compiling Real-World Projects...",
  "System Ready.",
  "Start. Learn. Build.",
];

export const HeroSection = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const currentLine = lines[lineIndex];
    if (typed.length < currentLine.length) {
      const timer = setTimeout(() => {
        setTyped(currentLine.slice(0, typed.length + 1));
      }, 35);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      if (lineIndex < lines.length - 1) {
        setLineIndex((prev) => prev + 1);
        setTyped("");
      } else {
        setLineIndex(0);
        setTyped("");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [lineIndex, typed]);

  return (
    <section className="relative min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8">
      <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Terminal className="h-4 w-4" /> Dev Fraol Academy
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
            Learn <span className="text-primary">Web Development</span> and <span className="text-primary">Graphic Design</span> with real projects.
          </h1>
          <p className="text-muted-foreground text-lg mt-6 max-w-xl leading-relaxed">
            A modern learning platform built to help creators and developers move from theory to portfolio-ready execution.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to="/apps" className="cosmic-button inline-flex items-center gap-2">
              Explore Apps <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/instructors" className="px-6 py-2 rounded-full border border-border hover:bg-card transition-colors">
              Meet the Instructor
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl border border-border bg-card/70 backdrop-blur-xl p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <p className="text-sm text-primary" style={{ fontFamily: "JetBrains Mono, monospace" }}>devfraol@academy:~$</p>
          <div className="text-sm sm:text-base mt-4 min-h-44 text-left space-y-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            {lines.slice(0, lineIndex).map((line) => (
              <p key={line} className="text-foreground/90">{line}</p>
            ))}
            <p className="text-foreground/90">
              {typed}
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
