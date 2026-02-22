import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/useToastStore";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? "https://formspree.io/f/xwpbojaj";

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!formData.message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please review your message",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({
        title: "Message sent",
        description: "Thanks for reaching out! We'll get back to you soon.",
        variant: "success",
      });
      setFormData(initialState);
    } catch {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-md"
    >
      <h2 className="text-2xl font-semibold text-white">Send us a message</h2>
      <p className="mt-2 text-sm text-zinc-300">We typically respond within 24–48 hours.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        {[
          ["name", "Name", "text"],
          ["email", "Email", "email"],
          ["subject", "Subject", "text"],
        ].map(([name, label, type]) => (
          <div key={name}>
            <label htmlFor={name} className="text-sm text-zinc-200">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors[name])}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none transition focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/40"
            />
            {errors[name] && (
              <p id={`${name}-error`} className="mt-1 text-xs text-red-400">
                {errors[name]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="message" className="text-sm text-zinc-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none transition focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/40"
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-400">
              {errors.message}
            </p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-3 font-semibold text-white transition hover:bg-[#ff5248] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isSubmitting ? "Sending..." : "Submit Message"}
        </motion.button>
      </form>
    </motion.article>
  );
};
