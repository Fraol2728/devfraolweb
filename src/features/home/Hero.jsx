import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const terminalLines = [
  "import Academy from 'DevFraol';",
  "import { WebDevelopment, GraphicDesign } from 'courses';",
  "",
  "const student = new Academy();",
  "student.learn(WebDevelopment);",
  "student.learn(GraphicDesign);",
  "student.startProjects();",
];

const typeSpeedMs = 28;
const linePauseMs = 320;

export const Hero = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [completed, setCompleted] = useState([]);

  const currentLine = useMemo(() => terminalLines[lineIndex] ?? "", [lineIndex]);

  useEffect(() => {
    if (lineIndex >= terminalLines.length) {
      return undefined;
    }

    if (charIndex < currentLine.length) {
      const typeTimer = window.setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, typeSpeedMs);
      return () => window.clearTimeout(typeTimer);
    }

    const lineTimer = window.setTimeout(() => {
      setCompleted((prev) => [...prev, currentLine]);
      setLineIndex((prev) => prev + 1);
      setCharIndex(0);
    }, linePauseMs);

    return () => window.clearTimeout(lineTimer);
  }, [charIndex, currentLine, lineIndex]);

  return (
    <section className="relative px-4 sm:px-6 pt-6 pb-16">
      <div className="container max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-left"
        >
          <p className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            DEV FRAOL ACADEMY
          </p>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold">
            Master <span className="text-primary">Web Development</span> + <span className="text-primary">Graphic Design</span> with real-world projects.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Learn in a practice-first curriculum with guided modules, mentor-style explanations, and project workflows that mirror creative tech teams.
          </p>
          <div className="mt-8">
            <Link to="/courses" className="cosmic-button inline-flex items-center justify-center px-7 py-3 text-base">
              Start Learning
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="rounded-2xl border border-primary/30 bg-linear-to-b from-card to-background p-5 sm:p-6 shadow-[0_20px_50px_rgba(255,59,48,0.12)]"
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted-foreground">devfraol-terminal</span>
          </div>
          <div className="min-h-64 rounded-xl border border-border/80 bg-background/80 p-4 text-left font-mono text-[13px] sm:text-sm leading-7">
            {[...completed, currentLine.slice(0, charIndex)].map((line, idx) => (
              <p key={`${line}-${idx}`} className="text-foreground/90">
                {line ? line : "\u00A0"}
              </p>
            ))}
            {lineIndex < terminalLines.length && (
              <span className="inline-block h-5 w-2 translate-y-1 bg-primary animate-pulse" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
