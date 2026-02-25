import { useEffect } from "react";

const SITE_URL = "https://devfraol.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const ensureMetaTag = (selector, attributeName, key, content) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const ensureLinkTag = (selector, rel, href) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

const ensureJsonLdScript = (id, schema) => {
  let script = document.head.querySelector(`#${id}`);

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
};

export const useSeoMeta = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  robots = "index, follow",
  canonical,
  structuredData,
}) => {
  useEffect(() => {
    const currentPath = window.location.pathname;
    const canonicalUrl = canonical ?? `${SITE_URL}${currentPath}`;
    const activeTitle = ogTitle ?? title ?? "Dev Fraol Academy";
    const activeDescription = ogDescription ?? description ?? "Dev Fraol Academy: project-first courses, apps, and resources.";

    if (title) {
      document.title = title;
    }

    ensureMetaTag(`meta[name='description']`, "name", "description", activeDescription);
    ensureMetaTag(`meta[name='robots']`, "name", "robots", robots);
    ensureMetaTag(`meta[property='og:title']`, "property", "og:title", activeTitle);
    ensureMetaTag(`meta[property='og:description']`, "property", "og:description", activeDescription);
    ensureMetaTag(`meta[property='og:image']`, "property", "og:image", ogImage);
    ensureMetaTag(`meta[property='og:url']`, "property", "og:url", canonicalUrl);
    ensureMetaTag(`meta[property='og:type']`, "property", "og:type", "website");
    ensureMetaTag(`meta[name='twitter:card']`, "name", "twitter:card", "summary_large_image");
    ensureMetaTag(`meta[name='twitter:title']`, "name", "twitter:title", activeTitle);
    ensureMetaTag(`meta[name='twitter:description']`, "name", "twitter:description", activeDescription);
    ensureMetaTag(`meta[name='twitter:image']`, "name", "twitter:image", ogImage);
    ensureLinkTag(`link[rel='canonical']`, "canonical", canonicalUrl);

    if (keywords?.length) {
      ensureMetaTag(`meta[name='keywords']`, "name", "keywords", keywords.join(", "));
    }

    if (structuredData) {
      ensureJsonLdScript("seo-structured-data", structuredData);
    }
  }, [canonical, description, keywords, ogDescription, ogImage, ogTitle, robots, structuredData, title]);
};
