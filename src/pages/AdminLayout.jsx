import { useState } from "react";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { AdminHeader } from "@/pages/AdminHeader";
import { Sidebar } from "@/pages/Sidebar";

export const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <div className="mx-auto flex max-w-[1440px]">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        <section className="w-full px-4 py-4 md:px-6 md:py-6">
          <AdminHeader onMenuClick={() => setIsMobileOpen(true)} />
          <AdminDashboard activeSection={activeItem} />
        </section>
      </div>
    </main>
  );
};
