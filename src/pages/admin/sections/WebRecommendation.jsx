import { useState } from "react";

const mockCategories = [
  {
    id: 1,
    name: "Download",
    websites: [{ id: 1, name: "Uptodown", url: "https://uptodown.com" }],
  },
];

export const WebRecommendation = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [newCategory, setNewCategory] = useState("");
  const [websiteInputs, setWebsiteInputs] = useState({});

  const addCategory = () => {
    if (!newCategory.trim()) return;
    setCategories((prev) => [...prev, { id: Date.now(), name: newCategory, websites: [] }]);
    setNewCategory("");
  };

  const addWebsite = (categoryId) => {
    const input = websiteInputs[categoryId] || { name: "", url: "" };
    if (!input.name?.trim() || !input.url?.trim()) return;

    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              websites: [...category.websites, { id: Date.now(), name: input.name, url: input.url }],
            }
          : category,
      ),
    );

    setWebsiteInputs((prev) => ({ ...prev, [categoryId]: { name: "", url: "" } }));
  };

  const deleteWebsite = (categoryId, websiteId) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, websites: category.websites.filter((website) => website.id !== websiteId) }
          : category,
      ),
    );
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Web Recommendation</h2>

      <div className="flex flex-col gap-2 md:flex-row">
        <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="New category" className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-[#FF3B30]/60" />
        <button onClick={addCategory} className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm font-medium text-[#FF7C73]">
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <article key={category.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 text-base font-semibold text-white">{category.name}</h3>
            <div className="space-y-2">
              {category.websites.map((website) => (
                <div key={website.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm">
                  <a href={website.url} className="text-zinc-200" target="_blank" rel="noreferrer">
                    {website.name} · {website.url}
                  </a>
                  <div className="flex gap-2">
                    <button className="rounded border border-white/10 px-2 py-1 hover:border-[#FF3B30]/50">Edit</button>
                    <button onClick={() => deleteWebsite(category.id, website.id)} className="rounded border border-white/10 px-2 py-1 hover:border-[#FF3B30]/50 hover:text-[#FF3B30]">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-[1fr_1fr_auto]">
              <input
                value={websiteInputs[category.id]?.name || ""}
                onChange={(event) =>
                  setWebsiteInputs((prev) => ({
                    ...prev,
                    [category.id]: { ...prev[category.id], name: event.target.value },
                  }))
                }
                placeholder="Website name"
                className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none"
              />
              <input
                value={websiteInputs[category.id]?.url || ""}
                onChange={(event) =>
                  setWebsiteInputs((prev) => ({
                    ...prev,
                    [category.id]: { ...prev[category.id], url: event.target.value },
                  }))
                }
                placeholder="Website URL"
                className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none"
              />
              <button onClick={() => addWebsite(category.id)} className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-3 py-2 text-sm text-[#FF7C73]">
                Add Website
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
