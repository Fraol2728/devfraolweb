import { AppsPage } from "@/features/apps/AppsPage";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const Apps = () => {
  useSeoMeta({
    title: "Apps | Dev Fraol Academy",
    description: "Discover Dev Fraol Apps: downloaders, converters, utilities, and curated resources for developers and creators.",
  });

  return <AppsPage />;
};
