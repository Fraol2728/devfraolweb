import { NavLink } from "react-router-dom";

const dockItems = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "Apps", path: "/apps" },
  { label: "Instructor", path: "/instructors" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Blog", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

export const DockNav = () => {
  return (
    <nav aria-label="Primary dock navigation" className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 rounded-2xl border border-white/15 bg-slate-900/85 p-2 shadow-2xl backdrop-blur">
      <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {dockItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `inline-flex rounded-lg px-3 py-2 text-sm font-medium outline-none transition ${
                  isActive ? "bg-cyan-400 text-slate-900" : "text-slate-200 hover:bg-slate-700/80"
                } focus-visible:ring-2 focus-visible:ring-cyan-300`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
