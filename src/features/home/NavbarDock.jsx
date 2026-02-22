import { motion } from "framer-motion";
import { BookOpen, House, Mail, NotebookPen, Smartphone, UserRound, MessagesSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const dockItems = [
  { label: "Home", to: "/", icon: House },
  { label: "Courses", to: "/courses", icon: BookOpen },
  { label: "Apps", to: "/apps", icon: Smartphone },
  { label: "Instructor", to: "/instructor", icon: UserRound },
  { label: "Testimonials", to: "/testimonials", icon: MessagesSquare },
  { label: "Blog", to: "/blog", icon: NotebookPen },
  { label: "Contact", to: "/contact", icon: Mail },
];

const NavItem = ({ icon: Icon, label, to, isActive }) => (
  <motion.div whileHover={{ y: -8, scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>
    <Link
      to={to}
      className={cn(
        "group relative flex h-10 items-center gap-2 rounded-xl border px-3 text-sm font-medium backdrop-blur-xl transition-all duration-300",
        isActive
          ? "border-[#FF3B30]/70 bg-[#3A1D1A]/80 text-[#FF3B30] shadow-[0_0_22px_rgba(255,59,48,0.35)]"
          : "border-white/10 bg-white/5 text-[#D4D4D4] hover:border-[#FF3B30]/55 hover:text-[#FF3B30] hover:shadow-[0_0_20px_rgba(255,59,48,0.25)]"
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden md:inline">{label}</span>
      {isActive && <motion.span layoutId="dock-active" className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FF3B30]" />}
    </Link>
  </motion.div>
);

export const NavbarDock = () => {
  const { pathname } = useLocation();

  return (
    <motion.nav initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="fixed inset-x-0 bottom-4 z-50 px-3" aria-label="Primary">
      <div className="mx-auto flex w-fit items-center gap-1 rounded-3xl border border-white/10 bg-black/45 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:gap-2">
        {dockItems.map((item) => {
          const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(`${item.to}/`));
          return <NavItem key={item.to} {...item} isActive={isActive} />;
        })}
      </div>
    </motion.nav>
  );
};
