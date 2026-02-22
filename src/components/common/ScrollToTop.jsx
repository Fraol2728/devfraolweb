import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAV_OFFSET = 110;

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const target = document.getElementById(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => window.scrollBy({ top: -NAV_OFFSET, behavior: "smooth" }), 50);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
};
