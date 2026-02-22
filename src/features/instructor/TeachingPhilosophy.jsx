import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tabData = {
  Approach: {
    title: "Project-First Learning",
    content:
      "Every module starts with a practical challenge. Students see the 'why' before the 'how', so technical decisions become easier to understand and apply in real work.",
  },
  Tools: {
    title: "Industry-Ready Stack",
    content:
      "Training uses modern frontend tools, visual systems, and workflow habits: React, component-driven UI architecture, branding foundations, and rapid design iteration.",
  },
  Methods: {
    title: "Mentor-Style Feedback",
    content:
      "Students receive guided critiques, progressive milestones, and portfolio-focused outcomes. The goal is confidence, clarity, and repeatable quality under deadlines.",
  },
};

const tabList = Object.keys(tabData);

export const TeachingPhilosophy = () => {
  const [activeTab, setActiveTab] = useState(tabList[0]);
  const current = useMemo(() => tabData[activeTab], [activeTab]);

  const handleKeyNavigation = (event, tab) => {
    const currentIndex = tabList.indexOf(tab);
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % tabList.length;
      setActiveTab(tabList[nextIndex]);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + tabList.length) % tabList.length;
      setActiveTab(tabList[prevIndex]);
    }
  };

  return (
    <section aria-labelledby="teaching-philosophy" className="relative mt-14 overflow-hidden rounded-3xl border border-border/60 bg-card/45 p-6 text-left sm:p-10">
      <motion.div
        className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#FF3B30]/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <h2 id="teaching-philosophy" className="relative text-3xl font-bold">
        Teaching Philosophy
      </h2>

      <div role="tablist" aria-label="Teaching philosophy tabs" className="relative mt-6 flex flex-wrap gap-3">
        {tabList.map((tab) => {
          const selected = tab === activeTab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab}`}
              id={`tab-${tab}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(event) => handleKeyNavigation(event, tab)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                selected
                  ? "border-[#FF3B30]/80 bg-[#FF3B30]/15 text-[#FF3B30]"
                  : "border-border/80 bg-background/40 text-muted-foreground hover:border-[#FF3B30]/50 hover:text-[#FF3B30]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="relative mt-7 min-h-40 rounded-2xl border border-border/70 bg-background/55 p-6">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeTab}
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-xl font-semibold text-[#FF3B30]">{current.title}</h3>
            <p className="mt-4 text-muted-foreground">{current.content}</p>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
};
