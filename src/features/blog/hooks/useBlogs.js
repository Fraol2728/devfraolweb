import { useMockApi } from "@/context/MockApiContext";

export const useBlogs = () => {
  const { blogs = [], loading, openBlog, actionLoading } = useMockApi();
  return { blogs, loading, openBlog, actionLoading };
};
