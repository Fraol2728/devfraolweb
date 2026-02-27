import { useState } from "react";
import { useMockApi } from "@/context/MockApiContext";

const initialForm = { title: "", excerpt: "", category: "Web Development", date: new Date().toISOString().slice(0, 10) };

export const Blog = () => {
  const { blogs, createBlog, loading } = useMockApi();
  const [form, setForm] = useState(initialForm);

  const saveBlog = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    await createBlog(form);
    setForm(initialForm);
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Blog</h2>
      <div className="space-y-2">{blogs.slice(0, 8).map((blog) => <div key={blog.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm"><span className="text-zinc-100">{blog.title}</span><span className="text-zinc-400">{blog.category}</span></div>)}</div>
      <form onSubmit={saveBlog} className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4"><h3 className="text-base font-semibold text-white">Add Blog Post</h3><input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Title" className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-[#FF3B30]/60" /><input value={form.excerpt} onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))} placeholder="Excerpt" className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-[#FF3B30]/60" /><button type="submit" disabled={loading.submit} className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm text-[#FF7C73]">{loading.submit ? "Saving..." : "Save Blog"}</button></form>
    </section>
  );
};
