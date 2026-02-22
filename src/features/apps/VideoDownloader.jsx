import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Instagram, Link as LinkIcon, Loader2 } from "lucide-react";
import { toast } from "@/hooks/useToastStore";

const providers = [
  { id: "instagram", label: "Instagram", icon: Instagram },
];

const fakeFetchMedia = async (url) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!url.startsWith("http")) {
    throw new Error("Please provide a valid URL.");
  }

  return {
    title: "Sample Instagram Reel",
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    quality: "1080p",
    size: "12.7 MB",
  };
};

export const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [activeProvider] = useState("instagram");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const ProviderIcon = useMemo(() => providers.find((item) => item.id === activeProvider)?.icon ?? Instagram, [activeProvider]);

  const handlePreview = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await fakeFetchMedia(url.trim());
      setPreview(data);
      toast({
        title: "Preview ready",
        description: "Media fetched successfully. Download is enabled.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Preview failed",
        description: error.message,
        variant: "destructive",
      });
      setPreview(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!preview) return;

    toast({
      title: "Download started",
      description: "Placeholder download initiated. Connect backend API next.",
      variant: "success",
    });
  };

  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">Instagram Downloader</h3>
      <p className="mt-2 text-sm text-foreground/70">Input URL → preview → download. Backend-ready placeholder fetch flow.</p>

      <form onSubmit={handlePreview} className="mt-4 space-y-3" aria-label="Instagram downloader form">
        <label htmlFor="video-url" className="text-xs font-semibold uppercase tracking-wide text-foreground/65">
          Post or Reel URL
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
            <input
              id="video-url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://www.instagram.com/reel/..."
              className="w-full rounded-xl border border-border/80 bg-background/70 py-2.5 pl-10 pr-3 text-sm text-foreground outline-none focus:border-[#FF3B30]/70"
              required
            />
          </div>
          <motion.button
            whileHover={{ y: -1 }}
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ProviderIcon className="h-4 w-4" />}
            {isLoading ? "Fetching" : "Preview"}
          </motion.button>
        </div>
      </form>

      {preview ? (
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl border border-border/65 bg-background/35 p-3"
          aria-live="polite"
        >
          <img src={preview.thumbnail} alt="Instagram preview thumbnail" className="h-40 w-full rounded-lg object-cover" />
          <div className="mt-3 flex items-center justify-between gap-2 text-xs text-foreground/70">
            <p>{preview.title}</p>
            <p>
              {preview.quality} • {preview.size}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#FF3B30] px-3 py-2 text-xs font-semibold text-white"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        </motion.section>
      ) : null}
    </article>
  );
};
