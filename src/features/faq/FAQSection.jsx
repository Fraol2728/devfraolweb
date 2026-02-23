import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMockApi } from "@/context/MockApiContext";

export const FAQSection = () => {
  const { faqs: faqItems = [] } = useMockApi();
  const [active, setActive] = useState(faqItems[0]?.id ?? null);

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container max-w-4xl mx-auto text-left">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold"
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="text-muted-foreground mt-3">Quick answers for learners joining Dev Fraol Academy.</p>

        <div className="mt-8 space-y-3">
          {faqItems.length === 0 ? <p className="text-sm text-muted-foreground">No FAQ entries available yet.</p> : null}
          {faqItems.map((item, index) => {
            const isOpen = active === item.id;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
                className="rounded-2xl border border-border bg-card/75 backdrop-blur-lg"
              >
                <button
                  onClick={() => setActive(isOpen ? null : item.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-lg">{item.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="h-4 w-4 text-primary" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
