import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Music2, Youtube } from "lucide-react";

const downloaderApps = [
  {
    id: "youtube",
    name: "Youtube video downloader",
    description: "Open a trusted web tool to download YouTube videos.",
    icon: Youtube,
    link: "https://en.y2mate.is/",
  },
  {
    id: "tiktok",
    name: "Tiktok video downloader",
    description: "Open a web tool for downloading TikTok videos.",
    icon: Music2,
    link: "https://ssstik.io/",
  },
  {
    id: "instagram",
    name: "Instagram video downloader",
    description: "Open an external site for downloading Instagram videos.",
    icon: Instagram,
    link: "https://snapinsta.app/",
  },
];

export const VideoDownloader = () => {
  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">Video Downloaders</h3>
      <p className="mt-2 text-sm text-foreground/70">Choose one app below. Each option opens an external downloader website in a new tab.</p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {downloaderApps.map((app, index) => {
          const Icon = app.icon;

          return (
            <motion.a
              key={app.id}
              href={app.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="group rounded-xl border border-border/70 bg-background/35 p-4 transition hover:border-[#FF3B30]/70"
            >
              <div className="inline-flex rounded-lg bg-[#FF3B30]/15 p-2 text-[#FF3B30]">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-sm font-semibold text-foreground">{app.name}</h4>
              <p className="mt-1 text-xs text-foreground/70">{app.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#FF3B30]">
                Open website
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </motion.a>
          );
        })}
      </div>
    </article>
  );
};
