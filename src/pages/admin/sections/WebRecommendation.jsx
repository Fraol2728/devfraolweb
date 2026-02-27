import { useState } from "react";
import { useMockApi } from "@/context/MockApiContext";

export const WebRecommendation = () => {
  const { webRecommendations, setWebRecommendations } = useMockApi();
  const [form, setForm] = useState({ name: "", link: "", category: "General", description: "" });

  const addWebsite = () => {
    if (!form.name || !form.link) return;
    setWebRecommendations((prev) => [{ ...form, id: `${form.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}` }, ...prev]);
    setForm({ name: "", link: "", category: "General", description: "" });
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Web Recommendation</h2>
      <div className="grid gap-2 md:grid-cols-4"><input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Website name" className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none" /><input value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="Website URL" className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none" /><input value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} placeholder="Category" className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none" /><button onClick={addWebsite} className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm font-medium text-[#FF7C73]">Add Website</button></div>
      <div className="space-y-2">{webRecommendations.slice(0, 10).map((website) => <div key={website.id} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200">{website.name} · {website.category}</div>)}</div>
    </section>
  );
};
