import { create } from "@/lib/zustand";
import { apiFetch } from "@/lib/api";

const COURSE_REFRESH_EVENT = "course:updated";
const notifyCourseRefresh = (detail = {}) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COURSE_REFRESH_EVENT, { detail }));
};

const toArray = (payload) => {
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data?.courses)) return payload.data.courses;
  if (Array.isArray(payload?.courses)) return payload.courses;
  if (Array.isArray(payload?.data?.users)) return payload.data.users;
  if (Array.isArray(payload?.users)) return payload.users;
  return [];
};

const appendActivity = (state, action, course) => {
  const timestamp = new Date().toISOString();
  const nextEntry = {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    action,
    courseId: course?.id,
    courseTitle: course?.title || "Untitled course",
    category: course?.category || "Uncategorized",
    timestamp,
  };

  return [nextEntry, ...state.recentActivity].slice(0, 20);
};

export const useAdminStore = create((set, get) => ({
  courses: [],
  users: [],
  recentActivity: [],
  isLoadingCourses: false,
  isLoadingUsers: false,
  isSavingCourse: false,
  coursesError: "",
  usersError: "",

  fetchCourses: async () => {
    set({ isLoadingCourses: true, coursesError: "" });
    try {
      const payload = await apiFetch("/api/courses");
      set({ courses: toArray(payload), coursesError: "" });
    } catch (error) {
      set({ coursesError: error.message || "Failed to fetch courses." });
      throw error;
    } finally {
      set({ isLoadingCourses: false });
    }
  },

  fetchUsers: async () => {
    set({ isLoadingUsers: true, usersError: "" });
    try {
      const payload = await apiFetch("/api/users");
      set({ users: toArray(payload), usersError: "" });
    } catch (error) {
      set({ usersError: error.message || "Failed to fetch users." });
      throw error;
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  getCourseById: async (courseId) => {
    const payload = await apiFetch(`/api/courses/${courseId}`);
    const course = payload?.data ?? payload;

    if (course?.id !== undefined) {
      set((state) => ({
        courses: state.courses.some((item) => item.id === course.id)
          ? state.courses.map((item) => (item.id === course.id ? { ...item, ...course } : item))
          : [course, ...state.courses],
      }));
    }

    return course;
  },

  createCourse: async (courseData) => {
    set({ isSavingCourse: true });
    try {
      const payload = {
        ...courseData,
        title: String(courseData?.title || "").trim(),
        slug: String(courseData?.slug || "").trim(),
      };

      console.log("[AddCourse] API URL:", "http://localhost:5000/api/courses");
      console.log("[AddCourse] Outgoing payload:", payload);

      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("STATUS:", res.status);

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      if (!res.ok) {
        throw new Error(text || "Request failed");
      }

      const parsed = text ? JSON.parse(text) : {};
      const created = parsed?.data ?? parsed;
      set((state) => ({
        courses: created ? [created, ...state.courses] : state.courses,
        recentActivity: appendActivity(state, "created", created || payload),
      }));
      notifyCourseRefresh({ courseId: created?.id, slug: created?.slug, action: "created" });
      return created;
    } finally {
      set({ isSavingCourse: false });
    }
  },

  updateCourse: async (courseId, courseData) => {
    set({ isSavingCourse: true });
    try {
      const payload = await apiFetch(`/api/courses/${courseId}`, {
        method: "PUT",
        body: JSON.stringify(courseData),
      });
      const updated = payload?.data ?? { ...courseData, id: courseId };
      set((state) => ({
        courses: state.courses.map((course) => (course.id === courseId ? { ...course, ...updated } : course)),
        recentActivity: appendActivity(state, "updated", updated),
      }));
      notifyCourseRefresh({ courseId, slug: updated?.slug, action: "updated" });
      return updated;
    } finally {
      set({ isSavingCourse: false });
    }
  },

  deleteCourse: async (courseId) => {
    set({ isSavingCourse: true });
    const target = get().courses.find((course) => course.id === courseId);
    try {
      await apiFetch(`/api/courses/${courseId}`, { method: "DELETE" });
      set((state) => ({
        courses: state.courses.filter((course) => course.id !== courseId),
        recentActivity: appendActivity(state, "deleted", target || { id: courseId }),
      }));
      notifyCourseRefresh({ courseId, slug: target?.slug, action: "deleted" });
    } finally {
      set({ isSavingCourse: false });
    }
  },
}));
