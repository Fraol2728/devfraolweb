export const Terminal = ({ logs, onClear }) => (
  <div className="flex h-full flex-col bg-black text-zinc-200">
    <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 text-xs uppercase tracking-wide text-zinc-400">
      <span>Terminal</span>
      <button type="button" onClick={onClear} className="rounded px-2 py-1 text-zinc-300 hover:bg-zinc-800">
        Clear
      </button>
    </div>
    <div className="flex-1 overflow-auto p-3 text-xs">
      {logs.map((entry) => (
        <div key={entry.id} className={entry.type === "error" ? "text-red-400" : "text-zinc-200"}>
          {entry.value}
        </div>
      ))}
    </div>
  </div>
);
