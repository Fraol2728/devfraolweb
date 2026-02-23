import { useEffect } from "react";

const ensureMetaTag = (selector, attributeName, key, content) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

export const useSeoMeta = (titleOrOptions, description, extra = {}) => {
  const config =
    typeof titleOrOptions === "object"
      ? titleOrOptions
      : {
          title: titleOrOptions,
          description,
          ...extra,
        };

  const { title, ogTitle, ogDescription, ogImage } = config;

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      ensureMetaTag(`meta[name='description']`, "name", "description", description);
    }

    ensureMetaTag(`meta[property='og:title']`, "property", "og:title", ogTitle ?? title ?? "Dev Fraol Academy");

    if (ogDescription ?? description) {
      ensureMetaTag(`meta[property='og:description']`, "property", "og:description", ogDescription ?? description);
    }

    if (ogImage) {
      ensureMetaTag(`meta[property='og:image']`, "property", "og:image", ogImage);
    }
  }, [description, ogDescription, ogImage, ogTitle, title]);
};
