import { useMemo } from "react";

const sampleLines = [
  "import { motion } from 'framer-motion';",
  "import React from 'react';",
  "const theme = createTheme(config);",
  "const streamSpeed = Math.random() * 10 + 12;",
  "function renderCodeFlow() { return null; }",
  "export const useCode = () => useMemo(() => [], []);",
  "const opacity = depth * 0.25;",
  "const gradient = 'from-[#FF3B30] to-[#3B82F6]';",
  "const route = '/courses/:slug';",
  "const frame = requestAnimationFrame(update);",
  "return lines.map((line) => <span>{line}</span>);",
];

const STREAM_COUNT = 24;

const createStream = (id) => {
  const lineCount = Math.floor(Math.random() * 5) + 4;
  const lines = Array.from({ length: lineCount }, (_, index) => {
    const sourceLine = sampleLines[(id + index + Math.floor(Math.random() * sampleLines.length)) % sampleLines.length];
    const targetLength = Math.floor(Math.random() * 24) + 24;
    return sourceLine.slice(0, targetLength);
  });

  return {
    id,
    lines,
    left: Math.random() * 100,
    duration: Math.random() * 12 + 14,
    delay: Math.random() * -26,
    drift: Math.random() * 80 - 40,
    opacity: Math.random() * 0.25 + 0.2,
    scale: Math.random() * 0.35 + 0.85,
  };
};

export const CodeFlowBackground = () => {
  const streams = useMemo(() => Array.from({ length: STREAM_COUNT }, (_, id) => createStream(id)), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,59,48,0.18),transparent_42%),radial-gradient(circle_at_82%_12%,rgba(59,130,246,0.2),transparent_38%),radial-gradient(circle_at_50%_85%,rgba(59,130,246,0.08),transparent_50%)]" />

      {streams.map((stream) => (
        <div
          key={stream.id}
          className="code-stream"
          style={{
            left: `${stream.left}%`,
            animationDuration: `${stream.duration}s`,
            animationDelay: `${stream.delay}s`,
            opacity: stream.opacity,
            transform: `translateX(${stream.drift}px) scale(${stream.scale})`,
          }}
        >
          {stream.lines.map((line, index) => (
            <p key={`${stream.id}-${index}`}>{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

