import { motion } from "framer-motion";
import { ArrowUpRight, Eraser, FileCog, QrCode } from "lucide-react";
const formatWebsiteMeta = (link) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
};


const advancedToolsApps = [
  {
    id: "background-remover",
    name: "Background Remover",
    description: "Open Remove.bg to erase image backgrounds online.",
    icon: Eraser,
    link: "https://www.remove.bg/",
  },
  {
    id: "qr-generator",
    name: "QR Code Generator",
    description: "Open QRCode Monkey to generate and download custom QR codes.",
    icon: QrCode,
    link: "https://www.qrcode-monkey.com/",
  },
  {
    id: "file-converter",
    name: "File Converter",
    description: "Open CloudConvert to convert files between many formats.",
    icon: FileCog,
    link: "https://cloudconvert.com/",
  },
];

export const AdvancedTools = () => {
  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">Advanced Tools</h3>
      <p className="mt-2 text-sm text-foreground/70">Choose a tool below. Each option opens an external website in a new tab.</p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {advancedToolsApps.map((app, index) => {
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
              className="group rounded-2xl border border-border/70 bg-background/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3B30]/70 hover:shadow-[0_16px_32px_rgba(255,59,48,0.22)]"
            >
              <div className="inline-flex rounded-lg bg-[#FF3B30]/15 p-2 text-[#FF3B30]">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{app.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{app.description}</p>
              <p className="mt-1 text-xs text-foreground/60">Official website: {formatWebsiteMeta(app.link)} · Opens in a new tab.</p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#FF3B30]/15 px-3 py-1.5 text-sm font-semibold text-[#FF3B30]">
                Visit Website
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </motion.a>
          );
        })}
      </div>
    </article>
  );
};
