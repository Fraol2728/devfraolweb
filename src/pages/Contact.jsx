import { useEffect } from "react";
import { ContactPage } from "@/features/contact/ContactPage";

export const Contact = () => {
  useEffect(() => {
    document.title = "Contact Dev Fraol Academy | Get in Touch";

    const description = "Have questions about courses, enrollment, or mentorship at Dev Fraol Academy? Send us a message and our team will respond quickly.";

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
    setMeta("og:title", "Contact Dev Fraol Academy | Get in Touch", true);
    setMeta("og:description", description, true);
  }, []);

  return <ContactPage />;
};
