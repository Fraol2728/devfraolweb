import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

const getInitials = (name) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

export const FixedAuthActions = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const initials = useMemo(() => getInitials(user?.name), [user?.name]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed right-4 top-4 z-[70] sm:right-6 sm:top-6"
    >
      <div className="relative">
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setProfileOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 p-1.5 pr-2 text-white backdrop-blur-xl"
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
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#0b0b0b]/95 p-1.5 shadow-xl backdrop-blur-xl"
            >
              <DropdownLink to="/settings" icon={Settings} label="Settings" onSelect={() => setProfileOpen(false)} />
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/85 transition hover:bg-white/10"
              >
                <LogOut size={14} /> Logout
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const DropdownLink = ({ to, icon: Icon, label, onSelect }) => (
  <Link to={to} onClick={onSelect} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/85 transition hover:bg-white/10">
    <Icon size={14} /> {label}
  </Link>
);
