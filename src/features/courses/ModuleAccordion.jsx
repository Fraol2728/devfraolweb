import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CirclePlay } from "lucide-react";

export const ModuleAccordion = ({ module, index = 0 }) => {
  const [open, setOpen] = useState(index === 0);
  const panelId = useId();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white/80 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/70"
    >
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span className="font-semibold text-gray-900 transition-colors duration-300 dark:text-white">{module.module}</span>
          <ChevronDown className={`h-4 w-4 text-[#FF3B30] transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-t border-gray-200 px-4 py-3 dark:border-gray-700"
          >
            <ul className="space-y-2">
              {(module.lessons ?? []).map((lesson) => (
                <li key={lesson} className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-300 dark:text-gray-300">
                  <CirclePlay className="h-4 w-4 text-[#FF3B30]" aria-hidden="true" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
};
