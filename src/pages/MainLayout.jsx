import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NavbarDock } from "@/features/home/NavbarDock";
import { Footer } from "@/features/footer/Footer";

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="relative z-0 min-h-screen overflow-x-hidden text-foreground">
      <main className="relative z-0 pb-28 pt-4 md:pt-6">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <NavbarDock />
      <Footer />
    </div>
  );
};
