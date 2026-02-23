import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Loader2, UploadCloud } from "lucide-react";
import { toast } from "@/hooks/useToastStore";
import { mockConverterMessage } from "@/data/mockAppResponses";

const formats = ["PDF", "DOCX", "XLSX", "PNG", "JPG"];

export const FileConverter = () => {
  const [from, setFrom] = useState(formats[0]);
  const [to, setTo] = useState(formats[1]);
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isConverting) return undefined;
    const timer = setInterval(() => {
      setProgress((value) => (value >= 92 ? value : value + 8));
    }, 180);

    return () => clearInterval(timer);
  }, [isConverting]);


  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const fileName = useMemo(() => {
    if (!file) return "";
    const extension = to.toLowerCase();
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    return `${baseName}.${extension}`;
  }, [file, to]);

  const triggerDownload = (sourceFile, fallbackName) => {
    const blob = sourceFile.slice(0, sourceFile.size, sourceFile.type || "application/octet-stream");
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fallbackName;
    link.click();
    URL.revokeObjectURL(blobUrl);
  };

  const handleConvert = async () => {
    if (from === to) {
      toast({ title: "Invalid conversion", description: "Choose different input/output formats.", variant: "destructive" });
      return;
    }

    if (!file) {
      toast({ title: "File required", description: "Please upload a file before converting.", variant: "destructive" });
      return;
    }

    setIsConverting(true);
    setProgress(8);

    try {
      await new Promise((resolve) => setTimeout(resolve, 650));
      triggerDownload(file, fileName || `converted.${to.toLowerCase()}`);
      setProgress(100);
      toast({
        title: "Conversion complete",
        description: mockConverterMessage,
        variant: "success",
      });
    } catch (error) {
      toast({ title: "Conversion failed", description: error.message, variant: "destructive" });
    } finally {
      setIsConverting(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">File Converter</h3>
      <p className="mt-2 text-sm text-foreground/70">Local mock converter module for docs and image assets.</p>
      <label
        htmlFor="convert-upload"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFileSelect(event.dataTransfer.files?.[0]);
        }}
        className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-background/45 px-4 py-4 text-sm text-foreground/75 transition-colors hover:border-[#FF3B30]/70"
      >
        <UploadCloud className="h-4 w-4" />
        {file ? `Selected: ${file.name}` : "Drag & drop or click to upload"}
      </label>
      <input id="convert-upload" type="file" className="sr-only" onChange={(event) => handleFileSelect(event.target.files?.[0] ?? null)} />

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

      {progress > 0 ? (
        <div className="mt-3 h-2 w-full rounded-full bg-background/70">
          <div className="h-2 rounded-full bg-[#FF3B30] transition-all" style={{ width: `${progress}%` }} />
        </div>
      ) : null}
    </article>
  );
};
