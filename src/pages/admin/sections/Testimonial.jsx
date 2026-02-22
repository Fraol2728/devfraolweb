import { useState } from "react";

const mockTestimonials = [
  { id: 1, name: "Maria Chen", role: "Student", message: "Great learning platform." },
];

const initialForm = { name: "", role: "", message: "" };

export const Testimonial = () => {
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const saveTestimonial = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    if (editingId) {
      setTestimonials((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
      setEditingId(null);
    } else {
      setTestimonials((prev) => [...prev, { id: Date.now(), ...form }]);
    }

    setForm(initialForm);
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Testimonial</h2>
      <div className="space-y-2">
        {testimonials.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-200">
            <p className="font-medium text-white">{item.name} · {item.role}</p>
            <p className="mt-2">{item.message}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => { setEditingId(item.id); setForm({ name: item.name, role: item.role, message: item.message }); }} className="rounded border border-white/10 px-3 py-1 hover:border-[#FF3B30]/50">Edit</button>
              <button onClick={() => setTestimonials((prev) => prev.filter((entry) => entry.id !== item.id))} className="rounded border border-white/10 px-3 py-1 hover:border-[#FF3B30]/50 hover:text-[#FF3B30]">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={saveTestimonial} className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-base font-semibold text-white">Add Testimonial</h3>
        <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Name" className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none" />
        <input value={form.role} onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))} placeholder="Role" className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none" />
        <textarea value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} placeholder="Message" rows={3} className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none" />
        <button type="submit" className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm text-[#FF7C73]">Save Testimonial</button>
      </form>
    </section>
  );
};
