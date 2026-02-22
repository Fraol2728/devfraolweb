import { motion } from "framer-motion";
import { AppWindow, BookOpen, Globe, LayoutDashboard, MenuSquare, MessageSquareText, Settings, Users, X } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "apps", label: "App Management", icon: AppWindow },
  { id: "users", label: "Users", icon: Users },
  { id: "web", label: "Web Recommendation", icon: Globe },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "blog", label: "Blog", icon: MenuSquare },
  { id: "testimonial", label: "Testimonial", icon: MessageSquareText },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeSection, setActiveSection, isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {isMobileOpen && <button className="fixed inset-0 z-30 bg-black/65 md:hidden" onClick={() => setIsMobileOpen(false)} aria-label="Close sidebar overlay" />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-zinc-950/80 p-4 backdrop-blur-2xl transition-transform duration-300 md:static md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2 pt-2">
          <p className="text-sm font-semibold tracking-[0.22em] text-zinc-300">DEV FRAOL ADMIN</p>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded-lg border border-white/10 p-2 text-zinc-200 transition hover:border-[#FF3B30]/70 hover:text-[#FF3B30] md:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <motion.button
                key={id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveSection(id);
                  setIsMobileOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? "border-[#FF3B30]/70 bg-[#FF3B30]/15 text-[#FF3B30] shadow-[0_0_24px_rgba(255,59,48,0.35)]"
                    : "border-white/10 bg-white/5 text-zinc-200 hover:border-[#FF3B30]/40 hover:bg-[#FF3B30]/10 hover:text-white hover:shadow-[0_0_16px_rgba(255,59,48,0.25)]"
                }`}
              >
                <Icon size={16} />
                {label}
              </motion.button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
