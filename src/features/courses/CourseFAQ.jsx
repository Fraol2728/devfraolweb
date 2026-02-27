import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const CourseFAQ = ({ faqs = [] }) => {
  const [openId, setOpenId] = useState(faqs[0]?.question ?? null);
  if (!faqs.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">FAQ</h2>
      <div className="mt-4 space-y-3">
        {faqs.map((faq) => {
          const isOpen = faq.question === openId;
          return (
            <div key={faq.question} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <button className="w-full text-left text-base font-semibold text-white" onClick={() => setOpenId(isOpen ? null : faq.question)}>
                {faq.question}
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-2 text-gray-300"
                  >
                    {faq.answer}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
