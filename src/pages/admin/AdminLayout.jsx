import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/pages/admin/components/Sidebar";
import { AdminHeader } from "@/pages/admin/components/AdminHeader";
import { Dashboard } from "@/pages/admin/sections/Dashboard";
import { AppManagement } from "@/pages/admin/sections/AppManagement";
import { Users } from "@/pages/admin/sections/Users";
import { WebRecommendation } from "@/pages/admin/sections/WebRecommendation";
import { Blog } from "@/pages/admin/sections/Blog";
import { Testimonial } from "@/pages/admin/sections/Testimonial";
import { Settings } from "@/pages/admin/sections/Settings";

const sectionLabels = {
  dashboard: "Dashboard",
  apps: "App Management",
  users: "Users",
  web: "Web Recommendation",
  blog: "Blog",
  testimonial: "Testimonial",
  settings: "Settings",
};

export const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sections = useMemo(
    () => ({
      dashboard: <Dashboard />,
      apps: <AppManagement />,
      users: <Users />,
      web: <WebRecommendation />,
      blog: <Blog />,
      testimonial: <Testimonial />,
      settings: <Settings />,
    }),
    [],
  );

  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto flex max-w-[1480px]">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        <section className="w-full px-4 py-4 md:px-6 md:py-6">
          <AdminHeader onMenuClick={() => setIsMobileOpen(true)} activeLabel={sectionLabels[activeSection]} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {sections[activeSection]}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
};
