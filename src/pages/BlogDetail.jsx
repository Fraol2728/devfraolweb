import { useParams } from "react-router-dom";
import { BlogDetailContent } from "@/features/blog/BlogDetail";
import { useBlogs } from "@/features/blog/hooks/useBlogs";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const BlogDetail = () => {
  const { slug } = useParams();
  const { blogs = [] } = useBlogs();
  const post = blogs.find((item) => item.slug === slug);

  useSeoMeta(
    post
      ? {
          title: `${post.title} | Dev Fraol Academy Blog`,
          description: post.excerpt,
          ogTitle: post.title,
          ogDescription: post.excerpt,
          ogImage: post.image,
        }
      : {
          title: "Post not found | Dev Fraol Academy Blog",
          description: "This post is unavailable. Explore other Dev Fraol Academy insights and tutorials.",
          ogTitle: "Post not found | Dev Fraol Academy Blog",
        },
  );

  return <BlogDetailContent />;
};
