import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDetail as AppDetailFeature } from "@/features/apps/AppDetail";
import { useApps } from "@/features/apps/hooks/useApps";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { VideoDownloader } from "@/features/apps/VideoDownloader";
import { FileConverter } from "@/features/apps/FileConverter";
import { BackgroundRemover } from "@/features/apps/BackgroundRemover";

const appComponentMap = {
  "video-downloaders": VideoDownloader,
  "file-converter": FileConverter,
  "background-remover": BackgroundRemover,
};

export const AppDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appDetails = [], webRecommendations = [], loading } = useApps();
  const app = appDetails.find((item) => item.id === id);
  const AppToolComponent = appComponentMap[id];

  useSeoMeta({
    title: app ? `${app.name} | Dev Fraol Academy` : "App not found | Dev Fraol Academy",
    description: app?.description || "The requested app does not exist. Browse other Dev Fraol Academy apps.",
  });

  if (loading.list) {
    return <section className="py-20 text-center text-foreground/75">Loading app details...</section>;
  }

  if (!app) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">App not found</h1>
        <p className="mt-3 text-foreground/75">This app may have been removed or the link is incorrect.</p>
        <Link to="/apps" className="mt-6 inline-flex rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/10 px-4 py-2 font-semibold text-[#FF3B30]">
          Back to Apps
        </Link>
      </section>
    );
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
