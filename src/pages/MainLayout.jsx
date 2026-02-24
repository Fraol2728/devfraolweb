import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavbarDock } from "@/features/home/NavbarDock";
import { Navbar } from "@/features/navbar/Navbar";
import { Footer } from "@/features/footer/Footer";

const routeOrder = ["/", "/courses", "/blogs", "/apps", "/apps/python-code-editor", "/instructors", "/testimonials", "/contact", "/faq", "/login", "/signup"];

const routeIndex = (pathname) => {
  const matched = routeOrder.findIndex((route) => pathname === route || pathname.startsWith(`${route}/`));
  return matched === -1 ? 0 : matched;
};

export const MainLayout = () => {
  const location = useLocation();
  const previousIndex = useRef(routeIndex(location.pathname));
  const shouldAnimate = useMemo(() => !location.pathname.startsWith("/auth/"), [location.pathname]);
  const immersiveMode = location.pathname.includes("/python-code-editor");
  const [showFloatingNavbar, setShowFloatingNavbar] = useState(true);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  const currentIndex = routeIndex(location.pathname);
  const direction = currentIndex >= previousIndex.current ? 1 : -1;
  previousIndex.current = currentIndex;

  useEffect(() => {
    if (!immersiveMode) return undefined;

    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastYRef.current;

        if (Math.abs(delta) > 4) {
          setShowFloatingNavbar(delta < 0 || currentY <= 8);
          lastYRef.current = currentY;
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      tickingRef.current = false;
    };
  }, [immersiveMode]);

  return (
    <div className="relative z-0 min-h-screen overflow-x-hidden text-foreground">
      {immersiveMode ? (
        <motion.div
          initial={false}
          animate={{ y: showFloatingNavbar ? 0 : 120, opacity: showFloatingNavbar ? 1 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[95] pb-2"
        >
          <div className="pointer-events-auto">
            <Navbar />
          </div>
        </motion.div>
      ) : null}
      <main className={`relative z-0 ${immersiveMode ? "h-screen overflow-hidden p-0 pb-20" : "pb-28 pt-4 md:pt-6"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={shouldAnimate ? { opacity: 0, x: 30 * direction } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldAnimate ? { opacity: 0, x: -30 * direction } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {!immersiveMode ? <NavbarDock /> : null}
      {!immersiveMode ? <Footer /> : null}
    </div>
  );
};
