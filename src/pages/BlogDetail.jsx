import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BlogDetailContent } from "@/features/blog/BlogDetail";
import { getBlogBySlug } from "@/data/blog";

export const BlogDetail = () => {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  useEffect(() => {
    if (!post) {
      document.title = "Post not found | Dev Fraol Academy Blog";
      return;
    }

    document.title = `${post.title} | Dev Fraol Academy Blog`;

    const setMeta = (name, content, property = false) => {
      const selector = property ? `meta[property='${name}']` : `meta[name='${name}']`;
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(property ? "property" : "name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMeta("description", post.excerpt);
    setMeta("og:title", post.title, true);
    setMeta("og:description", post.excerpt, true);
    setMeta("og:image", post.image, true);
  }, [post]);

  return <BlogDetailContent />;
};
