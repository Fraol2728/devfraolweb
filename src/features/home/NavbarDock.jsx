import { motion } from "framer-motion";
import { House, Mail, NotebookPen, Smartphone, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const dockItems = [
  { label: "Home", to: "/", icon: House },
  { label: "Apps", to: "/apps", icon: Smartphone },
  { label: "Instructor", to: "/instructors", icon: UserRound },
  { label: "Blog", to: "/blogs", icon: NotebookPen },
  { label: "Contact", to: "/contact", icon: Mail },
];

const dockLinkClassName = ({ isActive }) =>
  cn(
    "group relative flex h-10 touch-manipulation select-none items-center gap-2 rounded-xl border px-3 text-sm font-medium backdrop-blur-xl transition-all duration-200",
    isActive
      ? "border-[#FF3B30]/70 bg-[#3A1D1A]/80 text-[#FF3B30] shadow-[0_0_22px_rgba(255,59,48,0.35)]"
      : "border-white/10 bg-white/5 text-[#D4D4D4] hover:border-[#FF3B30]/55 hover:text-[#FF3B30] hover:shadow-[0_0_20px_rgba(255,59,48,0.25)]"
  );

const NavItem = ({ icon: Icon, label, to }) => (
  <motion.div whileHover={{ y: -8, scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>
    <NavLink to={to} end={to === "/"} className={dockLinkClassName} aria-label={`Go to ${label}`}>
      {({ isActive }) => (
        <>
          <Icon className="h-4 w-4" />
          <span className="hidden md:inline">{label}</span>
          {isActive && <motion.span layoutId="dock-active" className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FF3B30]" />}
        </>
      )}
    </NavLink>
  </motion.div>
);

export const NavbarDock = () => (
  <motion.nav initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-auto fixed inset-x-0 bottom-4 z-[80] px-3" aria-label="Primary">
    <div className="mx-auto flex w-fit items-center gap-1 rounded-3xl border border-white/10 bg-black/45 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:gap-2">
      {dockItems.map((item) => <NavItem key={item.to} {...item} />)}
    </div>
  </motion.nav>
);
