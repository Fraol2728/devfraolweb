import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Globe, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export const ResourceCard = ({ resource, index, isFavorited, onToggleFavorite }) => {
  const Icon = resource.icon || Globe;
  const [copied, setCopied] = useState(false);
  const link = resource.link || resource.href;
  const title = resource.title || resource.name;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ y: -5 }}
      className="group rounded-2xl border border-border/70 bg-card/55 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#FF3B30]/45 hover:shadow-[0_14px_30px_rgba(255,59,48,0.2)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-[#FF3B30]/15 p-2 text-[#FF3B30]"><Icon className="h-5 w-5" /></span>
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
        <button type="button" onClick={onToggleFavorite} className={cn("rounded-lg border p-2", isFavorited ? "border-[#FF3B30]/50 bg-[#FF3B30]/10 text-[#FF3B30]" : "border-border text-foreground/70 hover:border-[#FF3B30]/50 hover:text-[#FF3B30]")} aria-label={`Toggle favorite for ${title}`}>
          <Heart className={cn("h-3.5 w-3.5", isFavorited ? "fill-current" : "")} />
        </button>
      </div>
      <p className="mt-3 text-sm text-foreground/70">{resource.description}</p>
      <div className="mt-4 flex items-center gap-2">
        <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-[#FF3B30] px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:shadow-[0_8px_20px_rgba(255,59,48,0.35)]">Visit<ArrowUpRight className="h-3.5 w-3.5" /></a>
        <button type="button" onClick={handleCopy} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 transition-colors duration-300 hover:border-[#FF3B30]/60 hover:text-[#FF3B30]" aria-label={`Copy ${title} link`}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </motion.article>
  );
};
