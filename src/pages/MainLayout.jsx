import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DockNav } from "@/components/home/DockNav";
import { Footer } from "@/components/home/Footer";

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="relative z-0 min-h-screen overflow-x-hidden text-foreground">
      <main className="relative z-0 pb-32 pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 64 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -64 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <DockNav />
      <Footer />
    </div>
  );
};
