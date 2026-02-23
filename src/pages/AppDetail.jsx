import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppDetail as AppDetailFeature } from "@/features/apps/AppDetail";
import { useMockApi } from "@/context/MockApiContext";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { VideoDownloader } from "@/features/apps/VideoDownloader";
import { CodeEditor } from "@/features/apps/CodeEditor";
import { FileConverter } from "@/features/apps/FileConverter";
import { BackgroundRemover } from "@/features/apps/BackgroundRemover";

const appComponentMap = {
  "youtube-downloader": VideoDownloader,
  "tiktok-downloader": VideoDownloader,
  "instagram-downloader": VideoDownloader,
  "code-editor": CodeEditor,
  "file-converter": FileConverter,
  "background-remover": BackgroundRemover,
};

export const AppDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appDetails = [], webRecommendations = [], loading } = useMockApi();
  const app = appDetails.find((item) => item.id === id);
  const AppToolComponent = appComponentMap[id];

  useSeoMeta({
    title: app ? `${app.name} | Dev Fraol Academy` : "App Detail | Dev Fraol Academy",
    description: app?.description || "View detailed information for each Dev Fraol Academy app.",
  });

  if (loading.list) {
    return <section className="py-20 text-center text-foreground/75">Loading app details...</section>;
  }

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
      appId={app.id}
      onOpenApp={() => navigate(`/apps/${app.id}`)}
      ToolComponent={AppToolComponent}
    />
  );
};
