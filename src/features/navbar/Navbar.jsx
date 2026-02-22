import { useEffect, useState } from "react";
import { Home, GraduationCap, User, MessageSquare, Mail, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "Instructor", href: "/instructor", icon: User },
  { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
  { name: "Contact", href: "/contact", icon: Mail }
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800" aria-label="Toggle theme">
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <motion.div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/courses" && pathname.startsWith("/courses/"));
            return (
              <Link key={item.name} to={item.href} className={cn("p-2 rounded-full transition-colors flex flex-col items-center", isActive ? "bg-primary text-white" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary")} aria-label={item.name}>
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1 hidden md:block">{item.name}</span>
              </Link>
            );
          })}
          <div className="flex items-center px-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
