import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Loader2 } from "lucide-react";
import { toast } from "@/hooks/useToastStore";

const formats = ["PDF", "DOCX", "XLSX", "PNG", "JPG"];

export const FileConverter = () => {
  const [from, setFrom] = useState(formats[0]);
  const [to, setTo] = useState(formats[1]);
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    if (from === to) {
      toast({ title: "Invalid conversion", description: "Choose different input/output formats.", variant: "destructive" });
      return;
    }

    setIsConverting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsConverting(false);
    toast({
      title: "Conversion complete",
      description: `Placeholder ${from} → ${to} conversion finished.`,
      variant: "success",
    });
  };

  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">File Converter</h3>
      <p className="mt-2 text-sm text-foreground/70">Future backend-ready converter module for docs and image assets.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <select value={from} onChange={(event) => setFrom(event.target.value)} className="rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm">
          {formats.map((format) => (
            <option key={`from-${format}`}>{format}</option>
          ))}
        </select>
        <ArrowLeftRight className="mx-auto h-4 w-4 text-[#FF3B30]" />
        <select value={to} onChange={(event) => setTo(event.target.value)} className="rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm">
          {formats.map((format) => (
            <option key={`to-${format}`}>{format}</option>
          ))}
        </select>
      </div>

      <motion.button
        whileHover={{ y: -1 }}
        type="button"
        onClick={handleConvert}
        disabled={isConverting}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2.5 text-sm font-semibold text-white"
      >
        {isConverting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {isConverting ? "Converting..." : "Convert File"}
      </motion.button>
    </article>
  );
};
