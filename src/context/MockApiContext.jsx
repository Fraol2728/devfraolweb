import { createContext, useContext, useMemo, useState } from "react";
import { courses as coursesSeed } from "@/data/courses";
import { appsCatalog, appDetailPages, webRecommendations as webRecommendationsSeed } from "@/data/apps";
import { blogPosts as blogSeed } from "@/data/blog";
import { testimonials as testimonialsSeed } from "@/data/testimonials";

const MockApiContext = createContext(null);

const usersSeed = [
  { id: "usr-001", name: "John Doe", email: "john@email.com", role: "Student", status: "Active" },
  { id: "usr-002", name: "Sofia Khan", email: "sofia@email.com", role: "Instructor", status: "Inactive" },
  { id: "inst-001", name: "Sahil Sharma", email: "sahil@devfraol.academy", role: "Instructor", status: "Active" },
];

const withDelay = (value, ms = 350) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });

export const MockApiProvider = ({ children }) => {
  const [courses, setCourses] = useState(coursesSeed);
  const [apps, setApps] = useState(appsCatalog);
  const [appDetails, setAppDetails] = useState(appDetailPages);
  const [blogs, setBlogs] = useState(blogSeed);
  const [users, setUsers] = useState(usersSeed);
  const [testimonials, setTestimonials] = useState(testimonialsSeed);
  const [webRecommendations, setWebRecommendations] = useState(webRecommendationsSeed);
  const [loading, setLoading] = useState({ list: false, submit: false });
  const [actionLoading, setActionLoading] = useState({});
  const [error, setError] = useState(null);

  const runAction = async (actionKey, callback) => {
    setActionLoading((prev) => ({ ...prev, [actionKey]: true }));
    try {
      await withDelay(null, 220);
      return callback();
    } finally {
      setActionLoading((prev) => ({ ...prev, [actionKey]: false }));
    }
  };

  const createCourse = async (payload) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    const nextCourse = {
      id: payload.id || payload.title.toLowerCase().replace(/\s+/g, "-"),
      slug: payload.slug || payload.title.toLowerCase().replace(/\s+/g, "-"),
      modules: payload.modules || 0,
      ...payload,
    };
    await withDelay(null);
    setCourses((prev) => [nextCourse, ...prev]);
    setLoading((prev) => ({ ...prev, submit: false }));
    return nextCourse;
  };

  const updateCourse = async (courseId, payload) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    await withDelay(null);
    setCourses((prev) => prev.map((course) => (course.id === courseId ? { ...course, ...payload } : course)));
    setLoading((prev) => ({ ...prev, submit: false }));
  };

  const deleteCourse = (courseId) => setCourses((prev) => prev.filter((course) => course.id !== courseId));

  const createApp = async (payload) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    await withDelay(null);
    const id = payload.id || payload.name.toLowerCase().replace(/\s+/g, "-");
    const nextApp = { ...payload, id, route: `/apps/${id}` };
    setApps((prev) => [nextApp, ...prev]);
    setLoading((prev) => ({ ...prev, submit: false }));
  };

  const createBlog = async (payload) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    await withDelay(null);
    const slug = payload.slug || payload.title.toLowerCase().replace(/\s+/g, "-");
    const nextBlog = { ...payload, id: slug, slug, popularity: payload.popularity || 0, content: payload.content || [] };
    setBlogs((prev) => [nextBlog, ...prev]);
    setLoading((prev) => ({ ...prev, submit: false }));
  };

  const submitContact = async (payload) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);
    try {
      await withDelay(payload, 500);
      return { ok: true, data: payload };
    } catch {
      setError("Unable to submit contact form.");
      return { ok: false };
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const openApp = (appId) =>
    runAction(`open-app:${appId}`, () => apps.find((app) => app.id === appId) ?? null);

  const openCourse = (courseId) =>
    runAction(`open-course:${courseId}`, () => courses.find((course) => course.id === courseId || course.slug === courseId) ?? null);

  const enrollCourse = (courseId) =>
    runAction(`enroll-course:${courseId}`, () => courses.find((course) => course.id === courseId || course.slug === courseId) ?? null);

  const openBlog = (slug) => runAction(`open-blog:${slug}`, () => blogs.find((blog) => blog.slug === slug) ?? null);

  const value = useMemo(
    () => ({
      courses,
      apps,
      appDetails,
      setAppDetails,
      blogs,
      users,
      testimonials,
      webRecommendations,
      setWebRecommendations,
      loading,
      error,
      setUsers,
      createCourse,
      updateCourse,
      deleteCourse,
      createApp,
      createBlog,
      submitContact,
      openApp,
      openCourse,
      enrollCourse,
      openBlog,
      actionLoading,
    }),
    [courses, apps, appDetails, blogs, users, testimonials, webRecommendations, loading, error, actionLoading],
  );

  return <MockApiContext.Provider value={value}>{children}</MockApiContext.Provider>;
};

export const useMockApi = () => {
  const context = useContext(MockApiContext);
  if (!context) throw new Error("useMockApi must be used inside MockApiProvider");
  return context;
};
