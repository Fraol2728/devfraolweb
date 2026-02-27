import { BlogPage } from "@/features/blog/BlogPage";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const Blog = () => {
  useSeoMeta({
    title: "Dev Fraol Academy Blog | Web Development & Design Insights",
    description: "Stay updated with Dev Fraol Academy courses, web development guides, and graphic design insights.",
    ogImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
  });

  return <BlogPage />;
};
