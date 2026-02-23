import { useMockApi } from "@/context/MockApiContext";

export const useCourses = () => {
  const { courses = [], loading, openCourse, enrollCourse, actionLoading } = useMockApi();
  return { courses, loading, openCourse, enrollCourse, actionLoading };
};
