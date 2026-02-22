import { useEffect, useState } from "react";
import { AppWindow, BookOpen, Home, Mail, MessageSquareQuote, Moon, Newspaper, Sun, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Instructor", href: "/instructors", icon: UserRound },
  { name: "Testimonials", href: "/testimonials", icon: MessageSquareQuote },
  { name: "Blog", href: "/blogs", icon: Newspaper },
  { name: "Apps", href: "/apps", icon: AppWindow },
  { name: "Contact", href: "/contact", icon: Mail },
];

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full border border-border/50 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, y: 8, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export const Navbar = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-3 z-50 mx-auto w-[min(96%,56rem)]"
    >
      <div
        className={cn(
          "flex items-center justify-between gap-1 rounded-2xl border px-2 py-2 transition-all duration-300",
          "bg-background/60 supports-[backdrop-filter]:bg-background/45 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_35px_rgba(0,0,0,0.2)]",
          isScrolled ? "border-primary/35 shadow-[0_16px_40px_rgba(255,59,48,0.15)]" : "border-border/70"
        )}
      >
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all duration-300",
                  "hover:scale-[1.03]",
                  active
                    ? "bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(255,59,48,0.35)]"
                    : "text-foreground/75 hover:text-foreground hover:bg-primary/10"
                )}
              >
                <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-115 group-hover:-translate-y-0.5" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}
        </div>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
};
