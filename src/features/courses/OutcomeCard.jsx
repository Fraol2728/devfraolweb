import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const OutcomeCard = ({ outcome, index = 0 }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.3, delay: index * 0.06 }}
    className="rounded-xl border border-gray-200 bg-white/80 p-4 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/70"
  >
    <p className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700 transition-colors duration-300 dark:text-gray-200">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3B30]" aria-hidden="true" />
      <span>{outcome}</span>
    </p>
  </motion.article>
);
