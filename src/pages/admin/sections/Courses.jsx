import { useState } from "react";

const mockCourses = [
  {
    id: "react-mastery",
    title: "React Mastery",
    description: "Advanced React patterns and architecture.",
    thumbnail: "https://placehold.co/200x120",
    modules: 5,
    status: "Published",
  },
];

const initialForm = { title: "", description: "", thumbnail: "", status: "Draft" };

export const Courses = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const saveCourse = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    if (editingId) {
      setCourses((prev) =>
        prev.map((course) => (course.id === editingId ? { ...course, ...form } : course)),
      );
      setEditingId(null);
    } else {
      setCourses((prev) => [
        ...prev,
        {
          id: form.title.toLowerCase().replace(/\s+/g, "-") + Date.now(),
          ...form,
          modules: 0,
        },
      ]);
    }

    setForm(initialForm);
  };

  const startEdit = (course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      status: course.status,
    });
  };

  const deleteCourse = (id) => setCourses((prev) => prev.filter((course) => course.id !== id));

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Courses</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm text-zinc-300">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400">
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Modules</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-white/5">
                <td className="px-3 py-3 text-white">{course.title}</td>
                <td className="px-3 py-3">{course.modules}</td>
                <td className="px-3 py-3">{course.status}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(course)} className="rounded border border-white/10 px-3 py-1 hover:border-[#FF3B30]/50">Edit</button>
                    <button onClick={() => deleteCourse(course.id)} className="rounded border border-white/10 px-3 py-1 hover:border-[#FF3B30]/50 hover:text-[#FF3B30]">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={saveCourse} className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-base font-semibold text-white">{editingId ? "Edit Course" : "Add New Course"}</h3>
        <input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Title" className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-[#FF3B30]/60" />
        <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder="Description" rows={3} className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-[#FF3B30]/60" />
        <input value={form.thumbnail} onChange={(event) => setForm((prev) => ({ ...prev, thumbnail: event.target.value }))} placeholder="Thumbnail URL (placeholder)" className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-[#FF3B30]/60" />
        <select value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-[#FF3B30]/60">
          <option>Draft</option>
          <option>Published</option>
        </select>
        <button type="submit" className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm text-[#FF7C73]">
          {editingId ? "Update Course" : "Save Course"}
        </button>
      </form>
    </section>
  );
};
