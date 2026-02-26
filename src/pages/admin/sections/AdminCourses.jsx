import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { AdminCoursePreview } from "@/pages/admin/components/AdminCoursePreview";
import { useToastStore } from "@/pages/admin/store/useToastStore";
import logoDark from "@/assets/Logo dark.png";
import { ChevronDown, ChevronUp, Eye, Pencil, Plus, Search, Trash2, X } from "lucide-react";

const ITEMS_PER_PAGE = 10;
const CATEGORY_TABS = ["All", "Programming", "Graphics Design", "Operate Computer"];

const makeClientId = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
const emptyLesson = () => ({ clientId: makeClientId(), title: "", duration: "", youtubeVideoId: "" });
const emptyModule = () => ({ clientId: makeClientId(), title: "", description: "", duration: "", isOpen: true, lessons: [emptyLesson()] });
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [formState, setFormState] = useState(emptyForm);
  const [formMode, setFormMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formNotice, setFormNotice] = useState({ type: "", text: "" });
  const [draggingModuleId, setDraggingModuleId] = useState(null);
  const [draggingLessonId, setDraggingLessonId] = useState(null);
  const formOverlayRef = useRef(null);
  const formPanelRef = useRef(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const addToast = useToastStore((state) => state.addToast);
  const [previewTarget, setPreviewTarget] = useState(null);
  const [loadingPreviewId, setLoadingPreviewId] = useState(null);
  const deleteOverlayRef = useRef(null);

  const normalizeCategory = (value = "") => value.trim().toLowerCase();

  const categories = useMemo(() => {
    const values = courses.map((course) => course.category).filter(Boolean);
    return [...new Set([...CATEGORY_TABS, ...values])];
  }, [courses]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const payload = await apiFetch("/api/courses");
      setCourses(payload.data ?? []);
    } catch (error) {
      addToast({ type: "error", message: `Failed to fetch courses: ${error.message || "Unknown error"}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch = (course.title || "").toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || normalizeCategory(course.category) === normalizeCategory(selectedCategory);
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "alphabetical") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return Number(b.id || 0) - Number(a.id || 0);
    });
  }, [courses, query, selectedCategory, sortBy]);

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
    setFormNotice({ type: "", text: "" });
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
          clientId: module.clientId || module.id || makeClientId(),
          title: module.title || "",
          description: module.description || "",
          duration: module.duration || "",
          isOpen: true,
          lessons: module.lessons?.length
            ? module.lessons.map((lesson) => ({
                ...emptyLesson(),
                ...lesson,
                clientId: lesson.clientId || lesson.id || makeClientId(),
              }))
            : [emptyLesson()],
        })),
      });
      setErrors({});
      setFormNotice({ type: "", text: "" });
      setShowForm(true);
    } catch (error) {
      addToast({ type: "error", message: `Failed to load course: ${error.message || "Unknown error"}` });
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
    const hasErrors = Object.keys(nextErrors).length > 0;
    setFormNotice(hasErrors ? { type: "error", text: "Please fix the highlighted fields before saving." } : { type: "", text: "" });
    return !hasErrors;
  };

  const closeCourseForm = () => {
    setShowForm(false);
    setErrors({});
    setFormNotice({ type: "", text: "" });
    setDraggingModuleId(null);
    setDraggingLessonId(null);
  };

  const closePreview = () => setPreviewTarget(null);

  const openPreviewFromCourse = async (courseId) => {
    setLoadingPreviewId(courseId);
    try {
      const payload = await apiFetch(`/api/courses/${courseId}`);
      setPreviewTarget(payload.data || null);
      addToast({ type: "info", message: "This is a preview, changes not saved." });
    } catch (error) {
      addToast({ type: "error", message: `Failed to load preview: ${error.message || "Unknown error"}` });
    } finally {
      setLoadingPreviewId(null);
    }
  };

  const openPreviewFromForm = () => {
    setPreviewTarget({
      ...formState,
      modules: formState.modules.map(({ isOpen, clientId, lessons = [], ...module }) => ({
        ...module,
        id: module.id || clientId,
        lessons: lessons.map(({ clientId: lessonClientId, ...lesson }) => ({ ...lesson, id: lesson.id || lessonClientId })),
      })),
    });
    addToast({ type: "info", message: "This is a preview, changes not saved." });
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

  const reorderModules = (nextOrder) => {
    setFormState((prev) => ({
      ...prev,
      modules: nextOrder.map((nextModule) => prev.modules.find((module) => module.clientId === nextModule.clientId) || nextModule),
    }));
  };

  const reorderLessons = (moduleIndex, nextLessonsOrder) => {
    setFormState((prev) => ({
      ...prev,
      modules: prev.modules.map((module, index) => {
        if (index !== moduleIndex) return module;
        return {
          ...module,
          lessons: nextLessonsOrder.map((nextLesson) => module.lessons.find((lesson) => lesson.clientId === nextLesson.clientId) || nextLesson),
        };
      }),
    }));
  };

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
      addToast({ type: "error", message: "Unable to process thumbnail file." });
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const payload = {
      ...formState,
      slug: slugify(formState.slug),
      modules: formState.modules.map(({ isOpen, clientId: _clientId, ...module }) => ({
        ...module,
        lessons: module.lessons.map(({ clientId: _lessonClientId, ...lesson }) => lesson),
      })),
    };

    try {
      if (formMode === "create") {
        await apiFetch("/api/courses", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        addToast({ type: "success", message: `Course ${payload.title || "Untitled"} added successfully` });
      } else {
        await apiFetch(`/api/courses/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        addToast({ type: "success", message: `Course ${payload.title || "Untitled"} updated successfully` });
      }

      closeCourseForm();
      setFormState(emptyForm());
      await loadCourses();
    } catch (error) {
      const errorMessage = error.message || "Unknown error";
      setFormNotice({ type: "error", text: `Failed to save course: ${errorMessage}` });
      addToast({
        type: "error",
        message: formMode === "create" ? `Failed to add course: ${errorMessage}` : `Failed to update course: ${errorMessage}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!showForm) return undefined;

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    const getFocusable = () => {
      if (!formPanelRef.current) return [];
      return Array.from(formPanelRef.current.querySelectorAll(focusableSelector));
    };

    getFocusable()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCourseForm();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = getFocusable();
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showForm]);

  const isEditMode = formMode === "edit";

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await apiFetch(`/api/courses/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      addToast({ type: "success", message: `Course ${deleteTarget.title || "Untitled"} deleted successfully` });
      await loadCourses();
    } catch (error) {
      addToast({ type: "error", message: `Failed to delete course: ${error.message || "Unknown error"}` });
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (!deleteTarget) return undefined;

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    const getFocusable = () => {
      if (!deleteOverlayRef.current) return [];
      return Array.from(deleteOverlayRef.current.querySelectorAll(focusableSelector));
    };

    getFocusable()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setDeleteTarget(null);
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = getFocusable();
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [deleteTarget]);

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


      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search courses…"
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-10 py-2.5 text-sm text-zinc-100 outline-none focus:border-[#FF3B30]/60"
          />
        </label>

        <select
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
          className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-[#FF3B30]/60 md:w-48"
        >
          <option value="newest">Newest</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition md:text-sm ${
                isActive
                  ? "border-[#FF3B30]/65 bg-[#FF3B30]/20 text-[#FF7C73]"
                  : "border-white/10 bg-zinc-950 text-zinc-300 hover:border-[#FF3B30]/40 hover:text-zinc-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="min-h-56">
        {loading ? (
          <p className="rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-8 text-center text-zinc-400">Loading courses...</p>
        ) : pagedCourses.length ? (
          <motion.div
            key={`${selectedCategory}-${query}-${sortBy}-${currentPage}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence>
              {pagedCourses.map((course) => (
                <motion.article
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 transition hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[#FF3B30]/35 hover:shadow-[0_12px_35px_rgba(0,0,0,0.3)]"
                >
                  <div className="aspect-video overflow-hidden bg-zinc-900">
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.16em] text-zinc-500">No Thumbnail</div>
                    )}
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="line-clamp-2 text-sm font-semibold text-white md:text-base">{course.title}</h3>
                        <p className="mt-1 text-xs text-zinc-400 md:text-sm">{course.instructor || "Unknown instructor"}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-zinc-900 px-2 py-1 text-[11px] text-zinc-300">{course.category || "General"}</span>
                    </div>

                    <p className="text-xs text-zinc-500">{course.modules?.length || 0} modules</p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button onClick={() => openEdit(course.id)} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-[#FF3B30]/40 hover:text-white" aria-label={`Edit ${course.title}`}>
                        <span className="inline-flex items-center gap-1"><Pencil size={12} /> Edit</span>
                      </button>
                      <button onClick={() => setDeleteTarget(course)} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-rose-400/40 hover:text-rose-200" aria-label={`Delete ${course.title}`}>
                        <span className="inline-flex items-center gap-1"><Trash2 size={12} /> Delete</span>
                      </button>
                      <button
                        onClick={() => openPreviewFromCourse(course.id)}
                        disabled={loadingPreviewId === course.id}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-sky-400/40 hover:text-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
                        aria-label={`Preview ${course.title}`}
                      >
                        <span className="inline-flex items-center gap-1"><Eye size={12} /> {loadingPreviewId === course.id ? "Loading..." : "Preview"}</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <p className="rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-8 text-center text-zinc-400">No courses found.</p>
        )}
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
          <motion.div
            ref={formOverlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={formMode === "create" ? "Add New Course" : "Edit Course"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/45 md:left-72"
            onMouseDown={(event) => {
              if (event.target === formOverlayRef.current) {
                closeCourseForm();
              }
            }}
          >
            <motion.form
              ref={formPanelRef}
              initial={{ opacity: 0, x: 72 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 72 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              onSubmit={submitForm}
              className="flex h-full w-full flex-col border-l border-white/10 bg-zinc-950/95"
            >
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-zinc-950/95 px-4 py-3 md:px-6">
                <div className="flex items-center gap-3">
                  <img src={logoDark} alt="Dev Fraol Academy" className="h-8 w-auto" />
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-zinc-100 md:text-base">{isEditMode ? "Edit course" : "Create course"}</h3>
                    {isEditMode && <p className="text-xs text-zinc-400">{formState.title || "Untitled course"}</p>}
                  </div>
                </div>
                <button type="button" onClick={closeCourseForm} className="rounded-lg border border-white/10 p-2 text-zinc-200 hover:border-[#FF3B30]/45" aria-label="Close course form">
                  <X size={16} />
                </button>
              </header>

              <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4 md:px-6 md:py-5">
                {formNotice.text && (
                  <div
                    className={`rounded-xl border px-4 py-2.5 text-sm ${
                      formNotice.type === "error"
                        ? "border-rose-400/45 bg-rose-500/10 text-rose-200"
                        : "border-emerald-400/45 bg-emerald-500/10 text-emerald-200"
                    }`}
                  >
                    {formNotice.text}
                  </div>
                )}

                <section className="space-y-3 rounded-2xl border border-white/10 bg-zinc-900/45 p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-300">Course details</h4>

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
                          value={formState[key]}
                          onChange={(event) => handleFormChange(key, event.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-[#FF3B30]/60"
                        />
                        {errors[key] && <p className="text-xs text-rose-300">{errors[key]}</p>}
                      </label>
                    ))}
                  </div>

                  <label className="block space-y-1 text-sm">
                    <span className="text-zinc-300">Description</span>
                    <textarea
                      rows={4}
                      value={formState.description}
                      onChange={(event) => handleFormChange("description", event.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-[#FF3B30]/60"
                    />
                    {errors.description && <p className="text-xs text-rose-300">{errors.description}</p>}
                  </label>

                  <label className="block space-y-1 text-sm">
                    <span className="text-zinc-300">Thumbnail</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onThumbnailChange}
                      className="block w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-[#FF3B30]/20 file:px-3 file:py-1 file:text-[#FF7C73]"
                    />
                    {formState.thumbnail && <p className="text-xs text-zinc-500">Thumbnail selected</p>}
                  </label>
                </section>

                <section className="rounded-xl border border-white/10 bg-zinc-900/45 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-300">Modules</h4>
                    <button type="button" onClick={addModule} className="rounded-lg border border-[#FF3B30]/60 px-3 py-1.5 text-xs text-[#FF7C73]">
                      Add Module
                    </button>
                  </div>

                  <Reorder.Group axis="y" values={formState.modules} onReorder={reorderModules} className="space-y-3">
                    {formState.modules.map((module, moduleIndex) => (
                      <Reorder.Item
                        key={module.clientId}
                        value={module}
                        layout
                        onDragStart={() => setDraggingModuleId(module.clientId)}
                        onDragEnd={() => setDraggingModuleId(null)}
                        className={`rounded-xl border bg-black/25 p-3 transition ${draggingModuleId === module.clientId ? "z-20 border-[#FF7C73]/70 shadow-[0_0_0_1px_rgba(255,124,115,0.4),0_16px_40px_rgba(0,0,0,0.55)]" : "border-white/10"}`}
                      >
                        <button
                          type="button"
                          onClick={() => setModule(moduleIndex, "isOpen", !module.isOpen)}
                          className="flex w-full items-center justify-between text-left text-sm font-semibold text-zinc-100"
                        >
                          <span>{module.title || `Module ${moduleIndex + 1}`}</span>
                          <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                            {module.isOpen ? "Hide" : "Show"}
                            {module.isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {module.isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 overflow-hidden"
                            >
                              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                                <input value={module.title} onChange={(event) => setModule(moduleIndex, "title", event.target.value)} placeholder="Module title" className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100" />
                                <input value={module.duration} onChange={(event) => setModule(moduleIndex, "duration", event.target.value)} placeholder="Duration" className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100" />
                                <input value={module.description} onChange={(event) => setModule(moduleIndex, "description", event.target.value)} placeholder="Brief description" className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100" />
                              </div>
                              {errors[`module-${moduleIndex}-title`] && <p className="mt-1 text-xs text-rose-300">{errors[`module-${moduleIndex}-title`]}</p>}

                              <div className={`mt-4 space-y-2 rounded-lg border p-2 transition ${draggingLessonId ? "border-[#FF7C73]/35" : "border-white/5"}`}>
                                <div className="flex items-center justify-between">
                                  <h5 className="text-sm font-semibold text-zinc-100">Lessons</h5>
                                  <div className="flex gap-2">
                                    <button type="button" onClick={() => addLesson(moduleIndex)} className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-zinc-200">Add Lesson</button>
                                    {formState.modules.length > 1 && (
                                      <button type="button" onClick={() => removeModule(moduleIndex)} className="rounded-lg border border-rose-400/45 px-2.5 py-1 text-xs text-rose-300">Remove Module</button>
                                    )}
                                  </div>
                                </div>

                                <Reorder.Group axis="y" values={module.lessons} onReorder={(nextLessonsOrder) => reorderLessons(moduleIndex, nextLessonsOrder)} className="space-y-2">
                                  {module.lessons.map((lesson, lessonIndex) => (
                                    <Reorder.Item
                                      key={lesson.clientId}
                                      value={lesson}
                                      layout
                                      onDragStart={() => setDraggingLessonId(lesson.clientId)}
                                      onDragEnd={() => setDraggingLessonId(null)}
                                      className={`rounded-lg border bg-black/25 p-3 transition ${draggingLessonId === lesson.clientId ? "z-20 border-[#FF7C73]/70 shadow-[0_0_0_1px_rgba(255,124,115,0.45),0_10px_24px_rgba(0,0,0,0.45)]" : "border-white/10"}`}
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
                                    </Reorder.Item>
                                  ))}
                                </Reorder.Group>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </section>
              </div>

              <div className="sticky bottom-0 z-10 mt-auto flex flex-wrap justify-end gap-2 border-t border-white/10 bg-zinc-950/95 px-4 py-3 md:px-6">
                <button type="button" onClick={openPreviewFromForm} className="rounded-xl border border-sky-400/45 bg-sky-500/10 px-4 py-2 text-sm text-sky-200">Preview</button>
                <button type="button" onClick={closeCourseForm} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300">Cancel</button>
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
          <motion.div
            ref={deleteOverlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm course deletion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/55 md:left-72"
            onClick={(event) => {
              if (event.target === event.currentTarget) setDeleteTarget(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mx-auto flex h-full w-full max-w-lg flex-col border-x border-white/10 bg-zinc-950/95 shadow-2xl"
            >
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-zinc-950/95 px-4 py-3 md:px-6">
                <div className="flex items-center gap-3">
                  <img src={logoDark} alt="Dev Fraol Academy" className="h-8 w-auto" />
                  <h3 className="text-sm font-semibold tracking-wide text-zinc-100 md:text-base">Confirm Delete</h3>
                </div>
                <button type="button" onClick={() => setDeleteTarget(null)} className="rounded-lg border border-white/10 p-2 text-zinc-200 hover:border-[#FF3B30]/45" aria-label="Close delete confirmation">
                  <X size={16} />
                </button>
              </header>

              <div className="flex flex-1 flex-col gap-5 px-4 py-5 md:px-6 md:py-6">
                {deleteTarget.thumbnail ? (
                  <img
                    src={deleteTarget.thumbnail}
                    alt={`${deleteTarget.title} thumbnail`}
                    className="h-44 w-full rounded-2xl border border-white/10 object-cover"
                  />
                ) : null}

                <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                  Are you sure you want to delete the course <span className="font-semibold text-white">{deleteTarget.title}</span>? This action cannot be undone.
                </p>
              </div>

              <div className="mt-auto grid grid-cols-1 gap-2 border-t border-white/10 bg-zinc-950/95 px-4 py-3 md:grid-cols-2 md:px-6">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="w-full rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="w-full rounded-xl border border-[#FF3B30]/60 bg-[#FF3B30]/15 px-4 py-2 text-sm font-medium text-[#FF7C73] transition hover:bg-[#FF3B30]/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      <AdminCoursePreview isOpen={Boolean(previewTarget)} course={previewTarget} onClose={closePreview} />
    </section>
  );
};
