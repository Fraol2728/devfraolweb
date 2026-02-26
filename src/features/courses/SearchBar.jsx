export const SearchBar = ({ value, onChange }) => {
  return (
    <label className="block w-full">
      <span className="sr-only">Search courses</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title or description"
        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-foreground/45 outline-none transition focus:border-[#ff3b30]/70 focus:ring-2 focus:ring-[#ff3b30]/30"
      />
    </label>
  );
};
