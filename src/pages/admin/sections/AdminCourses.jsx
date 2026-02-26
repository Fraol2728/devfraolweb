import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { Eye, Pencil, Plus, Search, Trash2, X } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const emptyLesson = () => ({ title: "", duration: "", youtubeVideoId: "" });
const emptyModule = () => ({ title: "", description: "", duration: "", isOpen: true, lessons: [emptyLesson()] });
const emptyForm = () => ({
  title: "",
  slug: "",
  category: "",
  instructor: "",
  description: "",
  thumbnail: "",
  modules: [emptyModule()],
});

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [formState, setFormState] = useState(emptyForm);
  const [formMode, setFormMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState({ type: "", text: "" });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);

  const categories = useMemo(() => {
    const values = courses
      .map((course) => course.category)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return [...new Set(values)];
  }, [courses]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const payload = await apiFetch("/api/courses");
      setCourses(payload.data ?? []);
      setMessage({ type: "", text: "" });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to fetch courses." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = [course.title, course.instructor, course.category]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, query, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pagedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const openCreate = () => {
    setFormMode("create");
    setEditingId(null);
    setFormState(emptyForm());
    setErrors({});
    setShowForm(true);
  };

  const openEdit = async (courseId) => {
    try {
      const payload = await apiFetch(`/api/courses/${courseId}`);
      const data = payload.data;
      setFormMode("edit");
      setEditingId(courseId);
      setFormState({
        ...emptyForm(),
        ...data,
        modules: (data.modules?.length ? data.modules : [emptyModule()]).map((module) => ({
          ...module,
          isOpen: true,
          lessons: module.lessons?.length ? module.lessons : [emptyLesson()],
        })),
      });
      setErrors({});
      setShowForm(true);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to load course." });
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formState.title.trim()) nextErrors.title = "Title is required";
    if (!formState.slug.trim()) nextErrors.slug = "Slug is required";
    if (!formState.category.trim()) nextErrors.category = "Category is required";
    if (!formState.description.trim()) nextErrors.description = "Description is required";

    formState.modules.forEach((module, moduleIndex) => {
      if (!module.title.trim()) nextErrors[`module-${moduleIndex}-title`] = "Module title is required";
      module.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson.title.trim()) nextErrors[`module-${moduleIndex}-lesson-${lessonIndex}-title`] = "Lesson title is required";
      });
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "title" && !prev.slug ? { slug: slugify(value) } : {}),
    }));
  };

  const setModule = (moduleIndex, field, value) => {
    setFormState((prev) => ({
      ...prev,
      modules: prev.modules.map((module, index) => (index === moduleIndex ? { ...module, [field]: value } : module)),
    }));
  };

  const setLesson = (moduleIndex, lessonIndex, field, value) => {
    setFormState((prev) => ({
      ...prev,
      modules: prev.modules.map((module, index) => {
        if (index !== moduleIndex) return module;
        return {
          ...module,
          lessons: module.lessons.map((lesson, li) => (li === lessonIndex ? { ...lesson, [field]: value } : lesson)),
        };
      }),
    }));
  };

  const addModule = () => setFormState((prev) => ({ ...prev, modules: [...prev.modules, emptyModule()] }));

  const removeModule = (moduleIndex) => {
    setFormState((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, index) => index !== moduleIndex),
    }));
  };

  const addLesson = (moduleIndex) => {
    setFormState((prev) => ({
      ...prev,
      modules: prev.modules.map((module, index) =>
        index === moduleIndex ? { ...module, lessons: [...module.lessons, emptyLesson()] } : module,
      ),
    }));
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    setFormState((prev) => ({
      ...prev,
      modules: prev.modules.map((module, index) => {
        if (index !== moduleIndex) return module;
        return {
          ...module,
          lessons: module.lessons.filter((_, li) => li !== lessonIndex),
        };
      }),
    }));
  };

  const onThumbnailChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const toDataUrl = () =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    try {
      const dataUrl = await toDataUrl();
      setFormState((prev) => ({ ...prev, thumbnail: dataUrl }));
    } catch {
      setMessage({ type: "error", text: "Unable to process thumbnail file." });
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const payload = {
      ...formState,
      slug: slugify(formState.slug),
      modules: formState.modules.map(({ isOpen, ...module }) => ({
        ...module,
        lessons: module.lessons,
      })),
    };

    try {
      if (formMode === "create") {
        await apiFetch("/api/courses", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setMessage({ type: "success", text: "Course created successfully." });
      } else {
        await apiFetch(`/api/courses/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setMessage({ type: "success", text: "Course updated successfully." });
      }

      setShowForm(false);
      setFormState(emptyForm());
      await loadCourses();
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to save course." });
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await apiFetch(`/api/courses/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      setMessage({ type: "success", text: "Course deleted successfully." });
      await loadCourses();
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to delete course." });
    }
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Courses</h2>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm font-medium text-[#FF7C73] transition hover:bg-[#FF3B30]/25 hover:text-white"
        >
          <Plus size={16} />
          Add Course
        </button>
      </div>

      {message.text && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            message.type === "error"
              ? "border-rose-400/45 bg-rose-500/10 text-rose-200"
              : "border-emerald-400/45 bg-emerald-500/10 text-emerald-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title, instructor, category"
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-10 py-2.5 text-sm text-zinc-100 outline-none focus:border-[#FF3B30]/60"
          />
        </label>

        <select
          value={selectedCategory}
          onChange={(event) => {
            setSelectedCategory(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-[#FF3B30]/60"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm text-zinc-300">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400">
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Instructor</th>
              <th className="px-3 py-2">Modules</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-zinc-400">
                  Loading courses...
                </td>
              </tr>
            ) : pagedCourses.length ? (
              pagedCourses.map((course) => (
                <tr key={course.id} className="border-b border-white/5">
                  <td className="px-3 py-3 text-white">{course.title}</td>
                  <td className="px-3 py-3">{course.category || "-"}</td>
                  <td className="px-3 py-3">{course.instructor || "-"}</td>
                  <td className="px-3 py-3">{course.modules?.length || 0}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(course.id)} className="rounded-lg border border-white/10 p-2 text-zinc-200 hover:border-[#FF3B30]/40 hover:text-white" aria-label={`Edit ${course.title}`}>
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(course)} className="rounded-lg border border-white/10 p-2 text-zinc-200 hover:border-rose-400/40 hover:text-rose-200" aria-label={`Delete ${course.title}`}>
                        <Trash2 size={14} />
                      </button>
                      <button onClick={() => setViewTarget(course)} className="rounded-lg border border-white/10 p-2 text-zinc-200 hover:border-sky-400/40 hover:text-sky-200" aria-label={`View ${course.title}`}>
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-zinc-400">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-400">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4">
            <motion.form
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              onSubmit={submitForm}
              className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/10 bg-zinc-950 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{formMode === "create" ? "Add New Course" : "Edit Course"}</h3>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-white/10 p-2 text-zinc-200 hover:border-[#FF3B30]/45">
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[
                  ["title", "Title"],
                  ["slug", "Slug"],
                  ["category", "Category"],
                  ["instructor", "Instructor"],
                ].map(([key, label]) => (
                  <label key={key} className="space-y-1 text-sm">
                    <span className="text-zinc-300">{label}</span>
                    <input
                      value={formState[key] || ""}
                      onChange={(event) => handleFormChange(key, event.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-[#FF3B30]/60"
                    />
                    {errors[key] && <p className="text-xs text-rose-300">{errors[key]}</p>}
                  </label>
                ))}
              </div>

              <label className="mt-3 block space-y-1 text-sm">
                <span className="text-zinc-300">Description</span>
                <textarea
                  value={formState.description}
                  onChange={(event) => handleFormChange("description", event.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none focus:border-[#FF3B30]/60"
                />
                {errors.description && <p className="text-xs text-rose-300">{errors.description}</p>}
              </label>

              <label className="mt-3 block space-y-1 text-sm">
                <span className="text-zinc-300">Thumbnail</span>
                <input type="file" accept="image/*" onChange={onThumbnailChange} className="block w-full text-xs text-zinc-300 file:mr-3 file:rounded-lg file:border file:border-white/10 file:bg-zinc-900 file:px-3 file:py-2 file:text-zinc-100" />
              </label>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-white">Modules</h4>
                  <button type="button" onClick={addModule} className="rounded-lg border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-3 py-1.5 text-xs text-[#FF7C73]">Add Module</button>
                </div>

                {formState.modules.map((module, moduleIndex) => (
                  <motion.div key={`${moduleIndex}-${module.title}`} layout className="rounded-xl border border-white/10 bg-zinc-900/60">
                    <button
                      type="button"
                      onClick={() => setModule(moduleIndex, "isOpen", !module.isOpen)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-zinc-100"
                    >
                      <span>{module.title || `Module ${moduleIndex + 1}`}</span>
                      <span className="text-xs text-zinc-500">{module.isOpen ? "Collapse" : "Expand"}</span>
                    </button>

                    <AnimatePresence initial={false}>
                      {module.isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-white/10 px-4 pb-4 pt-3"
                        >
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <input value={module.title} onChange={(event) => setModule(moduleIndex, "title", event.target.value)} placeholder="Module title" className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100" />
                            <input value={module.duration} onChange={(event) => setModule(moduleIndex, "duration", event.target.value)} placeholder="Module duration (e.g., 2h)" className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100" />
                          </div>
                          <textarea value={module.description} onChange={(event) => setModule(moduleIndex, "description", event.target.value)} placeholder="Module description" rows={2} className="mt-3 w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100" />
                          {errors[`module-${moduleIndex}-title`] && <p className="mt-1 text-xs text-rose-300">{errors[`module-${moduleIndex}-title`]}</p>}

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="text-sm font-semibold text-zinc-100">Lessons</h5>
                              <div className="flex gap-2">
                                <button type="button" onClick={() => addLesson(moduleIndex)} className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-zinc-200">Add Lesson</button>
                                {formState.modules.length > 1 && (
                                  <button type="button" onClick={() => removeModule(moduleIndex)} className="rounded-lg border border-rose-400/45 px-2.5 py-1 text-xs text-rose-300">Remove Module</button>
                                )}
                              </div>
                            </div>

                            <AnimatePresence>
                              {module.lessons.map((lesson, lessonIndex) => (
                                <motion.div
                                  key={`${moduleIndex}-${lessonIndex}`}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  className="rounded-lg border border-white/10 bg-black/25 p-3"
                                >
                                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                                    <input value={lesson.title} onChange={(event) => setLesson(moduleIndex, lessonIndex, "title", event.target.value)} placeholder="Lesson title" className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-xs text-zinc-100" />
                                    <input value={lesson.duration} onChange={(event) => setLesson(moduleIndex, lessonIndex, "duration", event.target.value)} placeholder="Duration" className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-xs text-zinc-100" />
                                    <input value={lesson.youtubeVideoId} onChange={(event) => setLesson(moduleIndex, lessonIndex, "youtubeVideoId", event.target.value)} placeholder="YouTube video ID" className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-xs text-zinc-100" />
                                  </div>
                                  <div className="mt-2 flex justify-end">
                                    {module.lessons.length > 1 && (
                                      <button type="button" onClick={() => removeLesson(moduleIndex, lessonIndex)} className="rounded-lg border border-rose-400/45 px-2 py-1 text-[11px] text-rose-300">Remove Lesson</button>
                                    )}
                                  </div>
                                  {errors[`module-${moduleIndex}-lesson-${lessonIndex}-title`] && (
                                    <p className="mt-1 text-xs text-rose-300">{errors[`module-${moduleIndex}-lesson-${lessonIndex}-title`]}</p>
                                  )}
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300">Cancel</button>
                <button type="submit" disabled={submitting} className="rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm text-[#FF7C73] disabled:opacity-60">
                  {submitting ? "Saving..." : formMode === "create" ? "Create Course" : "Update Course"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-5">
              <h3 className="text-lg font-semibold text-white">Delete Course?</h3>
              <p className="mt-2 text-sm text-zinc-300">Are you sure you want to delete <span className="text-white">{deleteTarget.title}</span>? This action cannot be undone.</p>
              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setDeleteTarget(null)} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300">Cancel</button>
                <button onClick={confirmDelete} className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-300">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4">
            <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-zinc-950 p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{viewTarget.title}</h3>
                  <p className="text-sm text-zinc-400">{viewTarget.category || "Uncategorized"} • {viewTarget.instructor || "No instructor"}</p>
                </div>
                <button onClick={() => setViewTarget(null)} className="rounded-lg border border-white/10 p-2 text-zinc-200"><X size={16} /></button>
              </div>
              <p className="text-sm text-zinc-300">{viewTarget.description}</p>
              <div className="mt-4 space-y-2">
                {(viewTarget.modules || []).map((module, index) => (
                  <div key={`${module.title}-${index}`} className="rounded-xl border border-white/10 bg-zinc-900/55 p-3">
                    <p className="font-medium text-zinc-100">{module.title}</p>
                    <p className="text-xs text-zinc-400">{module.duration}</p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-300">
                      {(module.lessons || []).map((lesson, li) => (
                        <li key={`${lesson.title}-${li}`}>{lesson.title} {lesson.duration ? `(${lesson.duration})` : ""}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
