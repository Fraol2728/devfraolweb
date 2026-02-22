import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "js", label: "JS" },
];

export const TabBar = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-2">
      {tabs.map((tab) => {
        const active = tab.id === activeTab;

        return (
          <motion.button
            key={tab.id}
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-colors",
              active ? "text-white" : "text-white/60 hover:text-white"
            )}
            onClick={() => onTabChange(tab.id)}
          >
            {active && (
              <motion.span
                layoutId="code-tab-active"
                className="absolute inset-0 rounded-lg bg-[#FF3B30] shadow-[0_10px_24px_rgba(255,59,48,0.35)]"
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
