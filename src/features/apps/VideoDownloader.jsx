import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Instagram, Link as LinkIcon, Loader2, Youtube } from "lucide-react";
import { toast } from "@/hooks/useToastStore";

const providers = [
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "tiktok", label: "TikTok", icon: LinkIcon },
  { id: "instagram", label: "Instagram", icon: Instagram },
];

export const VideoDownloader = ({ endpoints }) => {
  const [url, setUrl] = useState("");
  const [activeProvider, setActiveProvider] = useState("instagram");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  const ProviderIcon = useMemo(() => providers.find((item) => item.id === activeProvider)?.icon ?? Instagram, [activeProvider]);

  const isValidUrl = (candidateUrl) => {
    try {
      new URL(candidateUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handlePreview = async (event) => {
    event.preventDefault();

    if (!isValidUrl(url.trim())) {
      toast({ title: "Invalid URL", description: "Please enter a valid video URL.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setProgress(10);
    setDownloadUrl("");

    const timer = setInterval(() => {
      setProgress((value) => (value >= 94 ? value : value + 6));
    }, 200);

    try {
      const response = await fetch(endpoints.videoDownload, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim(), platform: activeProvider }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch video data. Please verify the URL.");
      }

      const data = await response.json();
      const nextDownloadUrl = data.downloadUrl || data.fileUrl || data.url || "";
      setPreview({ ...data, thumbnail: data.thumbnail || data.thumbnailUrl || "https://placehold.co/960x540/111827/ffffff?text=Video+Preview" });
      setDownloadUrl(nextDownloadUrl);
      setProgress(100);
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
      setDownloadUrl("");
      setProgress(0);
    } finally {
      clearInterval(timer);
      setIsLoading(false);
      setTimeout(() => setProgress(0), 600);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;

    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = "video";
    anchor.click();

    toast({
      title: "Download started",
      description: "The video download has started.",
      variant: "success",
    });
  };

  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">Video Downloader</h3>
      <p className="mt-2 text-sm text-foreground/70">Input URL → preview → download via backend API.</p>

      <form onSubmit={handlePreview} className="mt-4 space-y-3" aria-label="Video downloader form">
        <div className="flex flex-wrap gap-2">
          {providers.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => setActiveProvider(provider.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeProvider === provider.id ? "bg-[#FF3B30] text-white" : "border border-border text-foreground/75"
              }`}
            >
              {provider.label}
            </button>
          ))}
        </div>

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

      {progress > 0 ? (
        <div className="mt-3 h-2 w-full rounded-full bg-background/70">
          <div className="h-2 rounded-full bg-[#FF3B30] transition-all" style={{ width: `${progress}%` }} />
        </div>
      ) : null}

      {preview ? (
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl border border-border/65 bg-background/35 p-3"
          aria-live="polite"
        >
          <img src={preview.thumbnail || preview.thumbnailUrl} alt="Video preview thumbnail" className="h-40 w-full rounded-lg object-cover" />
          <div className="mt-3 flex items-center justify-between gap-2 text-xs text-foreground/70">
            <p>{preview.title || "Video Preview"}</p>
            <p>
              {preview.quality || "Best"} • {preview.size || "Unknown"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!downloadUrl}
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
