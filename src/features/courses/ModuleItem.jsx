import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Lock, PlayCircle } from "lucide-react";

export const ModuleItem = ({ module, isOpen, onToggle }) => {
  const lessonCount = module.lessons?.length ?? 0;

  return (
    <motion.article
      layout
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:border-[#FF3B30]/60 hover:shadow-[0_0_0_1px_rgba(255,59,48,0.2),0_14px_30px_rgba(0,0,0,0.35)]"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-white/[0.04] sm:px-6"
      >
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-white sm:text-lg">{module.title}</h3>
          <p className="mt-1 text-sm text-gray-300">
            {module.duration} · {lessonCount} lesson{lessonCount === 1 ? "" : "s"}
          </p>
        </div>

        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="rounded-full border border-[#FF3B30]/40 p-2 text-[#FF3B30]">
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: -6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.05,
                  },
                },
              }}
              className="border-t border-white/10 px-6 pb-4"
            >
              {module.lessons?.map((lesson, index) => (
                <motion.li
                  key={lesson.id ?? `${module.id}-${lesson.title}-${index}`}
                  variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0 } }}
                  className="group flex items-center justify-between gap-3 border-b border-white/10 py-3 pl-2 text-sm last:border-b-0 hover:rounded-lg hover:bg-white/[0.04]"
                >
                  <div className="flex min-w-0 items-center gap-2 text-gray-200">
                    <PlayCircle size={15} className="shrink-0 text-[#FF3B30]" />
                    <span className="truncate">{lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{lesson.duration}</span>
                    <Lock size={12} className="text-gray-500" />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
};
