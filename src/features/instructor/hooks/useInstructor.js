import { useMockApi } from "@/context/MockApiContext";

export const useInstructor = () => {
  const { instructors = [], loading } = useMockApi();
  return { instructors, loading };
};
