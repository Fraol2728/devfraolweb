import { useEffect } from "react";
import { TestimonialsPage } from "@/features/testimonials/TestimonialsPage";

export const Testimonials = () => {
  useEffect(() => {
    document.title = "What Our Students Say | Dev Fraol Academy";

    const description = "Read real student testimonials from Dev Fraol Academy learners across web development, design, and backend tracks.";

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
    setMeta("og:title", "What Our Students Say | Dev Fraol Academy", true);
    setMeta("og:description", description, true);
  }, []);

  return <TestimonialsPage />;
};
