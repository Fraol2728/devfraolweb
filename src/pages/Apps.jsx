import { AppsPage } from "@/features/apps/AppsPage";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const Apps = () => {
  useSeoMeta({
    title: "Devfraol Apps | Free Developer, Design & Marketing Tools",
    description:
      "Explore Devfraol Apps: free video downloaders, coding tools, design resources, SEO and digital marketing utilities in one platform.",
    keywords: [
      "Devfraol Apps",
      "Devfraol app tools",
      "developer tools",
      "SEO tools",
      "design resources",
      "marketing tools",
      "free online tools",
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Devfraol Apps",
      description: "Curated collection of development, design, and marketing tools by Devfraol.",
      url: "https://devfraol.com/apps",
      isPartOf: {
        "@type": "WebSite",
        name: "Dev Fraol Academy",
        url: "https://devfraol.com",
      },
    },
  });

  return <AppsPage />;
};
