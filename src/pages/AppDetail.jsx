import { Navigate } from "react-router-dom";
import { AppDetail as AppDetailFeature } from "@/features/apps/AppDetail";
import { appDetailPages, webRecommendations } from "@/data/apps";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const AppDetail = ({ appId }) => {
  const app = appDetailPages.find((item) => item.id === appId);

  useSeoMeta({
    title: app ? `${app.name} | Dev Fraol Academy` : "App Detail | Dev Fraol Academy",
    description: app?.description || "View detailed information for each Dev Fraol Academy app.",
  });

  if (!app) {
    return <Navigate to="/apps" replace />;
  }

  return (
    <AppDetailFeature
      title={app.name}
      description={app.description}
      icon={app.icon}
      features={app.features}
      demoUrl={app.demoUrl}
      categoryData={app.id === "web-recommended" ? webRecommendations : null}
      resources={app.resources}
    />
  );
};
