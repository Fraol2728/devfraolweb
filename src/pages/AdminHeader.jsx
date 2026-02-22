import { Menu, Search } from "lucide-react";

export const AdminHeader = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900/75 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button
          aria-label="Open sidebar"
          onClick={onMenuClick}
          className="rounded-lg border border-white/10 p-2 text-zinc-100 transition hover:border-[#FF3B30]/70 hover:text-[#FF3B30] md:hidden"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-xl font-semibold text-white md:text-2xl">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-zinc-300 md:w-72">
          <Search size={16} className="shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
          />
        </label>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FF3B30]/50 bg-[#FF3B30]/20 font-semibold text-[#FF3B30] shadow-[0_0_14px_rgba(255,59,48,0.35)]">
          AD
        </div>
      </div>
    </header>
  );
};
