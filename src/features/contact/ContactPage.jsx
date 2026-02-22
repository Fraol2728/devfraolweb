import { motion } from "framer-motion";
import { ContactForm } from "@/features/contact/ContactForm";
import { ContactInfo } from "@/features/contact/ContactInfo";
import { Map } from "@/features/contact/Map";
import { CTASection } from "@/features/contact/CTASection";

export const ContactPage = () => {
  return (
    <main className="px-4 py-16 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Get in Touch</h1>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-300">
            Have questions? Reach out and we’ll get back to you!
          </p>
        </motion.div>

        <section className="grid gap-6 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Map />
          <CTASection />
        </section>
      </section>
    </main>
  );
};
