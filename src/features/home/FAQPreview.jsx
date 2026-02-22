import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";

export const FAQPreview = () => {
  const [openId, setOpenId] = useState(faqItems[0].id);

  return (
    <section className="px-4 sm:px-6 py-16">
      <div className="container max-w-5xl mx-auto text-left">
        <h2 className="text-3xl sm:text-4xl">FAQ Preview</h2>
        <div className="mt-6 space-y-3">
          {faqItems.slice(0, 3).map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="rounded-xl border border-border bg-card/70 px-5 py-4">
                <button
                  onClick={() => setOpenId(isOpen ? "" : faq.id)}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-3 text-muted-foreground"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <Link to="/faq" className="mt-6 inline-block text-primary font-semibold hover:underline">
          Read full FAQ
        </Link>
      </div>
    </section>
  );
};
