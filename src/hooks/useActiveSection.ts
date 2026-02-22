import { useEffect, useRef, useState } from "react";

export const useActiveSection = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "#hero");
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollYRef.current = currentScrollY;

      const scrollPosition = currentScrollY + offset;

      for (const section of sectionIds) {
        const element = document.querySelector(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, sectionIds]);

  return { activeSection, showNavbar };
};
