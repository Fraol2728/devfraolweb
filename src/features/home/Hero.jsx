import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const terminalLines = [
  "import Academy from 'DevFraol';",
  "import { WebDevelopment, GraphicDesign } from 'academy';",
  "",
  "const student = new Academy();",
  "student.learn(WebDevelopment);",
  "student.learn(GraphicDesign);",
  "student.startProjects();",
];

const keywordPattern = /\b(import|const|new)\b/g;
const keywordExactPattern = /^(import|const|new)$/;
const stringPattern = /('[^']*'|"[^"]*")/g;
const stringExactPattern = /^('[^']*'|"[^"]*")$/;

const typeSpeedMs = 28;
const linePauseMs = 320;

export const Hero = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);

  const currentLine = useMemo(() => terminalLines[lineIndex] ?? "", [lineIndex]);
  const renderedLines = useMemo(() => {
    const activeLine = currentLine.slice(0, charIndex);
    return [...completedLines, ...(lineIndex < terminalLines.length ? [activeLine] : [])];
  }, [charIndex, completedLines, currentLine, lineIndex]);

  const highlightLine = (line, lineKey) => {
    if (!line) {
      return <span key={`${lineKey}-empty`}>&nbsp;</span>;
    }

    const segments = line.split(stringPattern);

    return segments.map((segment, segmentIndex) => {
      if (!segment) {
        return null;
      }

      if (stringExactPattern.test(segment)) {
        return (
          <span key={`${lineKey}-s-${segmentIndex}`} className="text-[#FFA500]">
            {segment}
          </span>
        );
      }

      const parts = segment.split(keywordPattern);
      return parts.map((part, partIndex) => {
        if (!part) {
          return null;
        }

        const isKeyword = keywordExactPattern.test(part);
        return (
          <span key={`${lineKey}-p-${segmentIndex}-${partIndex}`} className={isKeyword ? "text-[#FF3B30]" : "text-[#D4D4D4]"}>
            {part}
          </span>
        );
      });
    });
  };

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
      setCompletedLines((prev) => [...prev, currentLine]);
      setLineIndex((prev) => prev + 1);
      setCharIndex(0);
    }, linePauseMs);

    return () => window.clearTimeout(lineTimer);
  }, [charIndex, currentLine, lineIndex]);

  return (
    <section id="hero" className="relative px-4 sm:px-6 pt-6 pb-16">
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
            <span className="text-primary">Programing</span> + <span className="text-primary">Graphic Design</span> with real-world projects.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Learn in a practice-first curriculum with guided modules, mentor-style explanations, and project workflows that mirror creative tech teams.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/apps"
                className="inline-flex items-center justify-center rounded-lg bg-[#FF3B30] px-7 py-3 text-base font-semibold text-white transition hover:shadow-[0_0_20px_rgba(255,59,48,0.4)]"
              >
                Explore Apps
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/apps"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-[#1E1E1E] px-7 py-3 text-base font-semibold text-white transition hover:border-[#FF3B30]/60 hover:text-[#FF3B30]"
              >
                Apps
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:p-6"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-radial-[circle_at_top_right] from-[#FF3B30]/25 via-transparent to-transparent"
            animate={{ opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-[#A8A8A8]">devfraol-terminal</span>
          </div>

          <div className="relative min-h-64 rounded-xl border border-white/10 bg-[#181818] p-4 text-left font-mono text-[13px] leading-7 sm:text-sm">
            <code className="m-0 block whitespace-pre-wrap">
              {renderedLines.map((line, index) => (
                <span key={`line-${index}`} className="block">
                  {highlightLine(line, `line-${index}`)}
                </span>
              ))}
            </code>
            {lineIndex < terminalLines.length && (
              <span className="inline-block h-5 w-2 translate-y-1 animate-pulse bg-[#FF3B30]" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
