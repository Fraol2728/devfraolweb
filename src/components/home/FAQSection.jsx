import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const FAQSection = ({ faqs = [] }) => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8" aria-labelledby="faq-section">
      <h2 id="faq-section" className="text-3xl font-bold text-white md:text-4xl">
        Frequently Asked Questions
      </h2>

      <div className="mt-8 space-y-4">
        {faqs.map((faq) => {
          const isOpen = activeId === faq.id;
          return (
            <article key={faq.id} className="rounded-xl border border-white/15 bg-slate-900/70 p-4">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${faq.id}`}
                  onClick={() => setActiveId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {faq.question}
                  <span className="text-cyan-300">{isOpen ? "−" : "+"}</span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-content-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-sm text-slate-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
};
