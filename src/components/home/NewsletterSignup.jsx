import { useState } from "react";
import { motion } from "framer-motion";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-24 mt-16 w-full max-w-4xl rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/95 to-slate-800/95 px-6 py-10 md:px-10"
      aria-labelledby="newsletter-signup"
    >
      <h2 id="newsletter-signup" className="text-3xl font-bold text-white md:text-4xl">
        Stay Updated with Dev Fraol Academy
      </h2>
      <p className="mt-2 text-slate-300">Get weekly coding tips, new courses, and app updates directly in your inbox.</p>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
          className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-cyan-300"
        />
        <button type="submit" className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-100">
          Subscribe
        </button>
      </form>

      {submitted ? <p className="mt-3 text-sm text-cyan-300">Thanks for subscribing! Check your inbox soon.</p> : null}
    </motion.section>
  );
};
