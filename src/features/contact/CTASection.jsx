import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/useToastStore";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CTASection = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email to subscribe.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Subscribed",
      description: "You will receive Dev Fraol Academy updates soon.",
      variant: "success",
    });
    setEmail("");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-[#FF3B30]/10 p-6 shadow-xl shadow-black/20 backdrop-blur-md"
    >
      <h2 className="text-2xl font-semibold text-white">Stay updated</h2>
      <p className="mt-2 text-sm text-zinc-300">Get announcements about new tracks, workshops, and open sessions.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none transition focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/40"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="rounded-xl bg-[#FF3B30] px-5 py-2.5 font-semibold text-white transition hover:bg-[#ff5248]"
        >
          Subscribe
        </motion.button>
      </form>
    </motion.section>
  );
};
