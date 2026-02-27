import { useMockApi } from "@/context/MockApiContext";

export const useApps = () => {
  const { apps = [], appDetails = [], webRecommendations = [], loading, openApp, actionLoading } = useMockApi();
  return { apps, appDetails, webRecommendations, loading, openApp, actionLoading };
};
