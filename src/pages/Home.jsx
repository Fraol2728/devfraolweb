import { motion } from "framer-motion";
import { HeroSection } from "@/features/hero/Hero";
import { HomeCoursesSection } from "@/features/homeCourses/HomeCourses";
import { FAQSection } from "@/features/faq/FAQSection";
import { ProgressTracker } from "@/features/progress/ProgressTracker";
import { NewsletterForm } from "@/features/newsletter/NewsletterForm";

const learnItems = [
  "Frontend architecture with React + Vite",
  "Backend API workflows and deployment",
  "UI/UX systems for product-ready interfaces",
  "Brand identity thinking for creative projects",
];

export const Home = () => {
  return (
    <>
      <HeroSection />
      <section className="py-16 px-4 sm:px-6">
        <div className="container max-w-6xl mx-auto text-left">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold"
          >
            What You Will Learn
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {learnItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-xl border border-border bg-card/70 p-5 text-lg leading-relaxed"
              >
                {item}
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <ProgressTracker completed={5} total={12} label="Web Development Track" />
          </div>
        </div>
      </section>
      <HomeCoursesSection />
      <FAQSection />
      <NewsletterForm />
    </>
  );
};
