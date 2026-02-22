import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown, LogOut, Menu, Settings, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Instructor", to: "/instructor" },
  { label: "Blog", to: "/blog" },
  { label: "Apps", to: "/apps" },
  { label: "Contact", to: "/contact" },
];

const getInitials = (name) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

export const TopNavbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = useMemo(() => getInitials(user?.name), [user?.name]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-sm font-semibold tracking-wide text-white sm:text-base">Dev Fraol Academy</Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-all duration-300",
                  isActive ? "bg-[#FF3B30]/20 text-[#FF3B30]" : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <AuthSlot
            user={user}
            initials={initials}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
            onLogout={() => {
              logout();
              setProfileOpen(false);
              navigate("/");
            }}
          />

          <button
            type="button"
            className="rounded-lg border border-white/15 p-2 text-white lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-black/65 px-4 py-3 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

const AuthSlot = ({ user, initials, profileOpen, setProfileOpen, onLogout }) => {
  if (!user) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link to="/login" className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:border-[#FF3B30]/70 hover:text-white">
          Login
        </Link>
        <Link to="/signup" className="rounded-lg bg-[#FF3B30] px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_0_18px_rgba(255,59,48,0.45)]">
          Signup
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        onClick={() => setProfileOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-1.5 pr-2 text-white"
      >
        {user.profilePic ? (
          <img src={user.profilePic} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF3B30] text-xs font-semibold">{initials}</span>
        )}
        <ChevronDown size={14} className={cn("transition-transform", profileOpen && "rotate-180")} />
      </motion.button>

      <AnimatePresence>
        {profileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#111]/95 p-1 shadow-xl"
          >
            <DropdownLink to="/my-courses" icon={BookOpen} label="My Courses" />
            <DropdownLink to="/settings" icon={Settings} label="Settings" />
            <button type="button" onClick={onLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/85 transition hover:bg-white/10">
              <LogOut size={14} /> Logout
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const DropdownLink = ({ to, icon: Icon, label }) => (
  <Link to={to} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/85 transition hover:bg-white/10">
    <Icon size={14} /> {label}
  </Link>
);
