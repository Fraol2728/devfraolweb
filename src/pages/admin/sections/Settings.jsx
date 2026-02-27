import { useState } from "react";

const initialSettings = {
  platformName: "Dev Fraol Academy",
  logo: "",
};

export const Settings = () => {
  const [settings, setSettings] = useState(initialSettings);

  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Settings</h2>
      <label className="space-y-1 text-sm text-zinc-300">
        <span>Platform Name</span>
        <input value={settings.platformName} onChange={(event) => setSettings((prev) => ({ ...prev, platformName: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-[#FF3B30]/60" />
      </label>

      <label className="space-y-1 text-sm text-zinc-300">
        <span>Logo Placeholder Upload</span>
        <input type="file" onChange={(event) => setSettings((prev) => ({ ...prev, logo: event.target.files?.[0]?.name || "" }))} className="block w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-[#FF3B30]/20 file:px-3 file:py-1 file:text-[#FF7C73]" />
        {settings.logo && <p className="text-xs text-zinc-500">Selected: {settings.logo}</p>}
      </label>

      <button className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm font-medium text-[#FF7C73] transition hover:bg-[#FF3B30]/25 hover:text-white">
        Save Settings
      </button>
    </section>
  );
};
