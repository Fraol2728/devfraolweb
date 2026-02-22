import { useState } from "react";
import { useMockApi } from "@/context/MockApiContext";

const initialForm = { name: "", description: "", status: "Active", category: "Resources" };

export const AppManagement = () => {
  const { apps, createApp, loading } = useMockApi();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const addApp = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    await createApp(form);
    setForm(initialForm);
    setIsOpen(false);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold text-white">App Management</h2><button onClick={() => setIsOpen(true)} className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm font-medium text-[#FF7C73] transition hover:bg-[#FF3B30]/25 hover:text-white">Add New App</button></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm text-zinc-300"><thead><tr className="border-b border-white/10 text-zinc-400"><th className="px-3 py-2">App Name</th><th className="px-3 py-2">Description</th><th className="px-3 py-2">Route</th></tr></thead><tbody>{apps.map((app) => <tr key={app.id} className="border-b border-white/5"><td className="px-3 py-3 text-white">{app.name}</td><td className="px-3 py-3">{app.description}</td><td className="px-3 py-3">{app.route || `/apps/${app.id}`}</td></tr>)}</tbody></table></div>
      {isOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"><form onSubmit={addApp} className="w-full max-w-lg space-y-4 rounded-2xl border border-white/10 bg-zinc-950 p-5"><h3 className="text-lg font-semibold text-white">Add New App</h3><input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="App Name" className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-[#FF3B30]/65" /><textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder="Description" rows={3} className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-[#FF3B30]/65" /><div className="flex justify-end gap-2"><button type="button" onClick={() => setIsOpen(false)} className="rounded-xl border border-white/10 px-4 py-2 text-zinc-300">Cancel</button><button type="submit" disabled={loading.submit} className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-[#FF7C73]">{loading.submit ? "Saving..." : "Save App"}</button></div></form></div>}
    </section>
  );
};
