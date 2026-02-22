import { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { toast } from "@/hooks/useToastStore";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = /\S+@\S+\.\S+/.test(email);

    if (!valid) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);

    toast({ title: "Subscribed", description: "You're now on the Dev Fraol Academy newsletter.", variant: "success" });
    setEmail("");
  };

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card/80 p-6 sm:p-8 text-left"
        >
          <h2 className="text-3xl font-extrabold">Stay Updated</h2>
          <p className="text-muted-foreground mt-2">Get product updates, new modules, and practical learning tips weekly.</p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-xl border border-border bg-background/80 px-4 py-3 outline-none focus:border-primary"
              required
            />
            <motion.button
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="cosmic-button inline-flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Subscribe"}
              <SendHorizontal className="h-4 w-4" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
