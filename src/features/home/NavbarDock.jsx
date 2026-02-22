import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Home,
  Mail,
  Moon,
  NotebookPen,
  Sun,
  Code2,
  UserRound,
  MessagesSquare,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const dockItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "Courses", to: "/courses", icon: BookOpen },
  { label: "Instructor", to: "/instructor", icon: UserRound },
  { label: "Testimonials", to: "/testimonials", icon: MessagesSquare },
  { label: "Blog", to: "/blog", icon: NotebookPen },
  { label: "Editor", to: "/code-editor", icon: Code2 },
  { label: "Contact", to: "/contact", icon: Mail },
];

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-[#2A2A2A] text-[#D4D4D4] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF3B30]/60 hover:text-[#FF3B30] sm:h-10 sm:w-10 md:h-11 md:w-11"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, y: 4, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.92 }}
          transition={{ duration: 0.18 }}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

const NavItem = ({ icon: Icon, label, to, isActive }) => {
  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 380, damping: 20 }}>
      <Link
        to={to}
        className={cn(
          "group relative flex h-9 items-center gap-1.5 rounded-lg border px-2 text-xs font-medium transition-all duration-300 sm:h-10 sm:px-2.5 md:h-11 md:gap-2 md:rounded-xl md:px-3 md:text-sm",
          isActive
            ? "border-[#FF3B30]/65 bg-[#3A1D1A] text-[#FF3B30] shadow-[0_0_18px_rgba(255,59,48,0.3)]"
            : "border-white/10 bg-[#2A2A2A] text-[#D4D4D4] hover:border-[#FF3B30]/45 hover:text-[#FF3B30]"
        )}
      >
        <Icon className="h-[16px] w-[16px] shrink-0" />
        <motion.span
          initial={false}
          animate={{ opacity: 1, scale: isActive ? 1.02 : 1 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          className={cn("hidden whitespace-nowrap md:inline", isActive ? "text-[#FF3B30]" : "text-current")}
        >
          {label}
        </motion.span>

        {isActive && <motion.span layoutId="active-pill" className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FF3B30]" />}
      </Link>
    </motion.div>
  );
};

export const NavbarDock = () => {
  const { pathname } = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 bottom-3 z-50 px-3 sm:bottom-4"
      aria-label="Primary"
    >
      <div className="mx-auto flex w-fit items-center gap-1 rounded-2xl border border-white/10 bg-[#1E1E1E] p-2 shadow-[0_16px_45px_rgba(0,0,0,0.45)] md:gap-2 md:rounded-3xl">
        {dockItems.map((item) => {
          const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(`${item.to}/`));

          return <NavItem key={item.to} {...item} isActive={isActive} />;
        })}

        <div className="ml-1 border-l border-white/10 pl-2">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};
