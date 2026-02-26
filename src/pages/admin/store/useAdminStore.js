import { create } from "@/lib/zustand";
import { apiFetch } from "@/lib/api";

const toArray = (payload) => payload?.data ?? payload ?? [];

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
      const payload = await apiFetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(courseData),
      });
      const created = payload?.data ?? payload;
      set((state) => ({
        courses: created ? [created, ...state.courses] : state.courses,
        recentActivity: appendActivity(state, "created", created || courseData),
      }));
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
    } finally {
      set({ isSavingCourse: false });
    }
  },
}));
