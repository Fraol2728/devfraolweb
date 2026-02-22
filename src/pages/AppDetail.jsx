import { AppDetail as AppDetailFeature } from "@/features/apps/AppDetail";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const AppDetail = () => {
  useSeoMeta({
    title: "App Detail | Dev Fraol Academy",
    description: "View detailed information for each Dev Fraol Academy app.",
  });

  return <AppDetailFeature />;
};
