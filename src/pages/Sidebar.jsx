import { motion } from "framer-motion";
import { LayoutDashboard, AppWindow, Users, Globe, Settings, LogOut, X } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "apps", label: "Apps Management", icon: AppWindow },
  { id: "users", label: "Users", icon: Users },
  { id: "recommended", label: "Web Recommended", icon: Globe },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeItem, setActiveItem, isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {isMobileOpen && <button aria-label="Close sidebar overlay" className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setIsMobileOpen(false)} />}

      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-zinc-950/85 p-4 backdrop-blur-2xl transition-transform duration-300 md:static md:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between px-2 pt-2">
          <p className="text-sm font-semibold tracking-[0.24em] text-zinc-300">DEV FRAOL ADMIN</p>
          <button
            aria-label="Close sidebar"
            className="rounded-lg border border-white/10 p-2 text-zinc-200 transition hover:border-[#FF3B30]/70 hover:text-[#FF3B30] md:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeItem === id;

            return (
              <motion.button
                key={id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveItem(id);
                  setIsMobileOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? "border-[#FF3B30]/70 bg-[#FF3B30]/15 text-[#FF3B30] shadow-[0_0_22px_rgba(255,59,48,0.35)]"
                    : "border-white/10 bg-white/5 text-zinc-200 hover:border-[#FF3B30]/35 hover:bg-[#FF3B30]/8 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {label}
              </motion.button>
            );
          })}
        </nav>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-[#FF3B30]/60 hover:bg-[#FF3B30]/12 hover:text-[#FF3B30]"
        >
          <LogOut size={17} />
          Logout
        </motion.button>
      </motion.aside>
    </>
  );
};
