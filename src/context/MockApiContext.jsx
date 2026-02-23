import { createContext, useContext, useMemo, useState } from "react";
import { courses as coursesSeed } from "@/data/courses";
import { appsCatalog, appDetailPages, webRecommendations as webRecommendationsSeed } from "@/data/apps";
import { blogPosts as blogSeed } from "@/data/blog";
import { testimonials as testimonialsSeed } from "@/data/testimonials";
import { faqItems as faqSeed } from "@/data/faq";

const MockApiContext = createContext(null);

const usersSeed = [
  { id: "usr-001", name: "John Doe", email: "john@email.com", role: "Student", status: "Active" },
  { id: "usr-002", name: "Sofia Khan", email: "sofia@email.com", role: "Instructor", status: "Inactive" },
  { id: "inst-001", name: "Sahil Sharma", email: "sahil@devfraol.academy", role: "Instructor", status: "Active" },
];

const instructorsSeed = [
  {
    id: "inst-001",
    name: "Sahil Sharma",
    slug: "sahil-sharma",
    role: "Lead Frontend Instructor",
    quote: "I teach by building with you—turning concepts into portfolio-ready outcomes.",
    bio: "Sahil helps learners bridge the gap between tutorials and production work through practical modules and guided feedback.",
    experience: [
      "7+ years shipping modern frontend products and learning platforms.",
      "Mentored 1000+ learners across web development and UI implementation.",
      "Build-first teaching style focused on real deliverables.",
    ],
    philosophy: {
      Approach: {
        title: "Project-First Learning",
        content: "Every module starts with a practical challenge so technical decisions feel meaningful and easy to retain.",
      },
      Tools: {
        title: "Industry-Ready Stack",
        content: "Learners practice with React, design systems, and modern collaboration workflows used by product teams.",
      },
      Methods: {
        title: "Mentor-Style Feedback",
        content: "Regular critique loops and milestone reviews build confidence and consistency in execution.",
      },
    },
    achievements: [
      { label: "Certified Frontend Mentor", detail: "React + UI architecture" },
      { label: "Top Instructor Recognition", detail: "Student-first curriculum" },
      { label: "50+ Live Project Demos", detail: "Production-style walkthroughs" },
      { label: "Design System Specialist", detail: "Brand-consistent interfaces" },
    ],
  },
];

const contactSeed = {
  title: "Get in Touch",
  subtitle: "Have questions? Reach out and we’ll get back to you!",
  details: [
    { id: "email", label: "Email", value: "hello@devfraol.academy", href: "mailto:hello@devfraol.academy" },
    { id: "phone", label: "Phone", value: "+1 (555) 867-5309", href: "tel:+15558675309" },
    { id: "location", label: "Location", value: "Remote-first · Serving globally", href: null },
  ],
};

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
  const [faqs, setFaqs] = useState(faqSeed);
  const [instructors, setInstructors] = useState(instructorsSeed);
  const [contact, setContact] = useState(contactSeed);
  const [webRecommendations, setWebRecommendations] = useState(webRecommendationsSeed);
  const [expandedCourseModules, setExpandedCourseModules] = useState({});
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

  const toggleCourseModule = (courseId, moduleId) => {
    setExpandedCourseModules((previous) => {
      const currentModules = previous[courseId] ?? [];
      const nextModules = currentModules.includes(moduleId) ? currentModules.filter((id) => id !== moduleId) : [...currentModules, moduleId];
      return { ...previous, [courseId]: nextModules };
    });
  };

  const toggleAllCourseModules = (courseId, moduleIds) => {
    setExpandedCourseModules((previous) => {
      const currentModules = previous[courseId] ?? [];
      const allExpanded = moduleIds.length > 0 && currentModules.length === moduleIds.length;
      return { ...previous, [courseId]: allExpanded ? [] : moduleIds };
    });
  };

  const value = useMemo(
    () => ({
      courses,
      apps,
      appDetails,
      setAppDetails,
      blogs,
      users,
      instructors,
      testimonials,
      faqs,
      contact,
      webRecommendations,
      expandedCourseModules,
      setWebRecommendations,
      setFaqs,
      setContact,
      setInstructors,
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
      toggleCourseModule,
      toggleAllCourseModules,
      actionLoading,
    }),
    [courses, apps, appDetails, blogs, users, instructors, testimonials, faqs, contact, webRecommendations, expandedCourseModules, loading, error, actionLoading],
  );

  return <MockApiContext.Provider value={value}>{children}</MockApiContext.Provider>;
};

export const useMockApi = () => {
  const context = useContext(MockApiContext);
  if (!context) throw new Error("useMockApi must be used inside MockApiProvider");
  return context;
};
