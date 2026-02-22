import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";

const extractHostname = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
};

export const ResourceCategory = ({ websites }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {websites.map((site, index) => {
        const Icon = site.icon || Globe;
        const hostname = extractHostname(site.link);
        const logoUrl = hostname ? `https://icons.duckduckgo.com/ip3/${hostname}.ico` : null;

        return (
          <motion.article
            key={site.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.04, duration: 0.28 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:border-[#FF3B30]/60 hover:shadow-[0_14px_34px_rgba(255,59,48,0.24)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-[#FF3B30]/15 text-[#FF3B30]">
                <WebsiteLogo logoUrl={logoUrl} siteName={site.name} Icon={Icon} />
              </span>
              <h3 className="text-base font-bold">{site.name}</h3>
            </div>

            <p className="mt-3 text-sm text-foreground/70">{site.description}</p>

            <a
              href={site.link}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#FF3B30] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:shadow-[0_10px_24px_rgba(255,59,48,0.32)]"
            >
              Visit Website
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.article>
        );
      })}
    </div>
  );
};

const WebsiteLogo = ({ logoUrl, siteName, Icon }) => {
  const [hasImageError, setHasImageError] = useState(false);

  if (!logoUrl || hasImageError) {
    return <Icon className="h-5 w-5" />;
  }

  return (
    <img
      src={logoUrl}
      alt={`${siteName} logo`}
      className="h-6 w-6 object-contain"
      loading="lazy"
      onError={() => setHasImageError(true)}
    />
  );
};
