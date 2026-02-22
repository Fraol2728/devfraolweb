import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CircleHelp, Compass, Home, Mail, Newspaper, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const dockItems = [
  { label: "Hero", section: "#hero", icon: Home },
  { label: "Tracks", section: "#tracks", icon: Compass },
  { label: "Courses", section: "#featured-courses", icon: BookOpen },
  { label: "Blog", section: "#blog-preview", icon: Newspaper },
  { label: "FAQ", section: "#faq-preview", icon: CircleHelp },
  { label: "Contact", href: "/contact", icon: Mail },
];

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-11 w-11 place-items-center rounded-2xl border border-border/70 bg-background/45 text-foreground/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3B30]/60 hover:text-[#FF3B30]"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.9 }}
          transition={{ duration: 0.18 }}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export const NavbarDock = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sectionIds = useMemo(() => dockItems.filter((item) => item.section).map((item) => item.section), []);
  const { activeSection, showNavbar } = useActiveSection(sectionIds, 180);

  const handleSectionNav = (section) => {
    if (pathname !== "/") {
      navigate(`/${section}`);
      return;
    }

    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: showNavbar ? 0 : 8 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 bottom-4 z-50 px-3 sm:bottom-5"
      aria-label="Primary"
    >
      <div className="mx-auto flex w-fit items-end gap-2 rounded-3xl border border-white/15 bg-background/45 p-2 shadow-[0_16px_45px_rgba(0,0,0,0.4)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/35">
        {dockItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.section ? pathname === "/" && activeSection === item.section : pathname.startsWith(item.href);

          return (
            <motion.button
              key={item.label}
              onClick={() => (item.section ? handleSectionNav(item.section) : navigate(item.href))}
              whileHover={{ y: -7, scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 360, damping: 20, delay: index * 0.015 }}
              className={cn(
                "group relative grid h-11 w-11 touch-manipulation place-items-center rounded-2xl border text-foreground/75 transition-colors sm:h-12 sm:w-12",
                isActive
                  ? "border-[#FF3B30]/65 bg-[#FF3B30]/20 text-[#FF3B30] shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                  : "border-white/10 bg-background/30 hover:border-[#FF3B30]/45 hover:text-[#FF3B30]"
              )}
              aria-label={item.label}
              title={item.label}
            >
              <Icon className="h-[18px] w-[18px]" />
              {isActive && (
                <motion.span
                  layoutId="dock-active-dot"
                  className="absolute -bottom-2 h-1.5 w-1.5 rounded-full bg-[#FF3B30]"
                />
              )}
            </motion.button>
          );
        })}

        <div className="ml-1 border-l border-white/10 pl-2">
          <ThemeToggle />
        </div>
      </div>
      <div className="pointer-events-none mx-auto mt-2 flex w-fit items-center gap-1 rounded-full bg-background/45 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur-lg">
        <Sparkles className="h-3 w-3 text-[#FF3B30]" />
        Mac-style Dock Navigation
      </div>
    </motion.nav>
  );
};
