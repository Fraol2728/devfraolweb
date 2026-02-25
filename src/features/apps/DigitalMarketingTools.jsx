import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Megaphone, Search, Send, Sparkles } from "lucide-react";
const formatWebsiteMeta = (link) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
};


const marketingCategories = [
  {
    id: "content-creation",
    title: "Content Creation",
    icon: Sparkles,
    apps: [
      {
        id: "canva",
        name: "Canva",
        description: "Create social media posts, infographics, and blog visuals.",
        link: "https://www.canva.com/",
      },
      {
        id: "copy-ai",
        name: "Copy.ai",
        description: "AI-generated marketing copy with a free tier.",
        link: "https://www.copy.ai/",
      },
      {
        id: "grammarly",
        name: "Grammarly",
        description: "Improve writing quality for blogs, ads, and emails.",
        link: "https://www.grammarly.com/",
      },
    ],
  },
  {
    id: "seo-keyword-research",
    title: "SEO & Keyword Research",
    icon: Search,
    apps: [
      {
        id: "ubersuggest",
        name: "Ubersuggest",
        description: "Keyword research and SEO insights (free version).",
        link: "https://neilpatel.com/ubersuggest/",
      },
      {
        id: "answer-the-public",
        name: "AnswerThePublic",
        description: "Discover trending search queries.",
        link: "https://answerthepublic.com/",
      },
      {
        id: "google-keyword-planner",
        name: "Google Keyword Planner",
        description: "Free keyword research tool from Google Ads.",
        link: "https://ads.google.com/home/tools/keyword-planner/",
      },
    ],
  },
  {
    id: "analytics-tracking",
    title: "Analytics & Tracking",
    icon: BarChart3,
    apps: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        description: "Website traffic and audience insights.",
        link: "https://analytics.google.com/",
      },
      {
        id: "google-search-console",
        name: "Google Search Console",
        description: "Monitor site performance in search.",
        link: "https://search.google.com/search-console/",
      },
      {
        id: "hotjar",
        name: "Hotjar",
        description: "Heatmaps and user behavior tracking with a free plan.",
        link: "https://www.hotjar.com/",
      },
    ],
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    icon: Megaphone,
    apps: [
      {
        id: "buffer",
        name: "Buffer",
        description: "Schedule posts and track engagement.",
        link: "https://buffer.com/",
      },
      {
        id: "hootsuite",
        name: "Hootsuite",
        description: "Basic scheduling and monitoring with a free plan.",
        link: "https://www.hootsuite.com/",
      },
      {
        id: "later",
        name: "Later",
        description: "Instagram/TikTok scheduling and analytics.",
        link: "https://later.com/",
      },
    ],
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    icon: Send,
    apps: [
      {
        id: "brevo",
        name: "Brevo",
        description: "Free email campaigns with automation (formerly Sendinblue).",
        link: "https://www.brevo.com/",
      },
      {
        id: "mailchimp",
        name: "Mailchimp",
        description: "Newsletters and marketing automation with a free tier.",
        link: "https://mailchimp.com/",
      },
      {
        id: "mailerlite",
        name: "MailerLite",
        description: "Free email marketing with landing pages.",
        link: "https://www.mailerlite.com/",
      },
    ],
  },
  {
    id: "design-assets-for-marketing",
    title: "Design & Creative Assets for Marketing",
    icon: Sparkles,
    apps: [
      {
        id: "unsplash",
        name: "Unsplash",
        description: "Free high-quality stock photos.",
        link: "https://unsplash.com/",
      },
      {
        id: "pexels",
        name: "Pexels",
        description: "Free stock images and videos.",
        link: "https://www.pexels.com/",
      },
      {
        id: "flaticon",
        name: "Flaticon",
        description: "Free icons for campaigns.",
        link: "https://www.flaticon.com/",
      },
    ],
  },
];

export const DigitalMarketingTools = () => {
  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">Digital Marketing Tools</h3>
      <p className="mt-2 text-sm text-foreground/70">Explore categories below. Each app opens the official website in a new tab.</p>

      <div className="mt-5 space-y-5">
        {marketingCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;

          return (
            <section key={category.id} className="rounded-xl border border-border/70 bg-background/30 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex rounded-lg bg-[#FF3B30]/15 p-2 text-[#FF3B30]">
                  <CategoryIcon className="h-4 w-4" />
                </span>
                <h4 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{category.title}</h4>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {category.apps.map((app, appIndex) => (
                  <motion.a
                    key={app.id}
                    href={app.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.05 + appIndex * 0.04 }}
                    className="group rounded-2xl border border-border/70 bg-background/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3B30]/70 hover:shadow-[0_16px_32px_rgba(255,59,48,0.22)]"
                  >
                    <h5 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{app.name}</h5>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">{app.description}</p>
                    <p className="mt-1 text-xs text-foreground/60">Official website: {formatWebsiteMeta(app.link)} · Opens in a new tab.</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#FF3B30]/15 px-3 py-1.5 text-sm font-semibold text-[#FF3B30]">
                      Visit Website
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
};
