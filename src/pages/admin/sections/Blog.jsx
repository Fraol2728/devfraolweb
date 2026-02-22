import { useState } from "react";

const mockBlogs = [
  { id: 1, title: "React 18 Performance Tips", content: "", status: "Published" },
  { id: 2, title: "TailwindCSS v4 Setup", content: "", status: "Draft" },
];

const initialForm = { title: "", content: "", status: "Draft" };

export const Blog = () => {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const saveBlog = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    if (editingId) {
      setBlogs((prev) => prev.map((blog) => (blog.id === editingId ? { ...blog, ...form } : blog)));
      setEditingId(null);
    } else {
      setBlogs((prev) => [...prev, { id: Date.now(), ...form }]);
    }

    setForm(initialForm);
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Blog</h2>
      <div className="space-y-2">
        {blogs.map((blog) => (
          <div key={blog.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
            <span className="text-zinc-100">{blog.title}</span>
            <div className="flex items-center gap-2 text-zinc-300">
              <span>{blog.status}</span>
              <button onClick={() => { setEditingId(blog.id); setForm({ title: blog.title, content: blog.content, status: blog.status }); }} className="rounded border border-white/10 px-2 py-1 hover:border-[#FF3B30]/50">Edit</button>
              <button onClick={() => setBlogs((prev) => prev.filter((item) => item.id !== blog.id))} className="rounded border border-white/10 px-2 py-1 hover:border-[#FF3B30]/50 hover:text-[#FF3B30]">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={saveBlog} className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-base font-semibold text-white">Add New Blog</h3>
        <input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Title" className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none" />
        <textarea value={form.content} onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))} placeholder="Content" rows={4} className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none" />
        <select value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none">
          <option>Draft</option>
          <option>Published</option>
        </select>
        <button type="submit" className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm text-[#FF7C73]">Save Blog</button>
      </form>
    </section>
  );
};
