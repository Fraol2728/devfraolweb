import { Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/useToastStore";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xwpbojaj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({ title: "Message sent", description: "Thanks for contacting Dev Fraol Academy.", variant: "success" });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again in a moment.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl font-bold">Contact Dev Fraol</h1>
          <p className="text-muted-foreground mt-4">
            Ask about enrollment, curriculum, or future tracks in Web Development and Graphic Design.
          </p>
          <div className="mt-6 flex items-center gap-3 text-muted-foreground">
            <Mail className="h-4 w-4" /> hello@devfraol.academy
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card/70 p-6 space-y-4 text-left">
          <div>
            <label htmlFor="name" className="text-sm text-muted-foreground">Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-muted-foreground">Email</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border" />
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-muted-foreground">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border" />
          </div>
          <button type="submit" disabled={isSubmitting} className="cosmic-button inline-flex items-center gap-2 disabled:opacity-70">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send Message
          </button>
        </form>
      </div>
    </section>
  );
};
