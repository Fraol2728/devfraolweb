import { useEffect } from "react";
import { BlogPage } from "@/features/blog/BlogPage";

export const Blog = () => {
  useEffect(() => {
    document.title = "Dev Fraol Academy Blog | Web Development & Design Insights";

    const description = "Stay updated with Dev Fraol Academy courses, web development guides, and graphic design insights.";
    const image = "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80";

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

    setMeta("description", description);
    setMeta("og:title", "Dev Fraol Academy Blog", true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
  }, []);

  return <BlogPage />;
};
