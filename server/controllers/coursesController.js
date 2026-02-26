import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coursesPath = path.join(__dirname, "../data/courses.json");
const DEFAULT_INSTRUCTOR = "Dev Fraol";

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const makeId = (prefix = "id") =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const readCourses = async () => {
  try {
    const raw = await fs.readFile(coursesPath, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(coursesPath, "[]", "utf-8");
      return [];
    }

    if (error instanceof SyntaxError) {
      await fs.writeFile(coursesPath, "[]", "utf-8");
      return [];
    }

    throw error;
  }
};

const writeCourses = async (courses) => {
  try {
    await fs.writeFile(coursesPath, `${JSON.stringify(courses, null, 2)}\n`, "utf-8");
  } catch (error) {
    console.error("[coursesController] Failed to write courses file", {
      path: coursesPath,
      message: error?.message,
      code: error?.code,
    });
    throw error;
  }
};

const normalizeLesson = (lesson = {}, courseId, moduleId, lessonIndex = 0) => ({
  id: String(lesson?.id || `${courseId}-${moduleId}-l${lessonIndex + 1}` || makeId("lesson")),
  title: String(lesson?.title || "").trim(),
  description: String(lesson?.description || "").trim(),
  duration: String(lesson?.duration || "").trim(),
  videoUrl: String(lesson?.videoUrl || lesson?.video_url || lesson?.youtubeVideoId || lesson?.youtube_video_id || "").trim(),
  youtubeVideoId: String(lesson?.youtubeVideoId || lesson?.youtube_video_id || lesson?.videoUrl || lesson?.video_url || "").trim(),
  freePreview: Boolean(lesson?.freePreview ?? lesson?.isPreview ?? lesson?.is_preview ?? lessonIndex === 0),
  isPreview: Boolean(lesson?.isPreview ?? lesson?.is_preview ?? lesson?.freePreview ?? lessonIndex === 0),
});

const normalizeModule = (module = {}, courseId, moduleIndex = 0) => {
  const moduleId = String(module?.id || `${courseId}-m${moduleIndex + 1}` || makeId("module"));
  return {
    id: moduleId,
    title: String(module?.title || "").trim(),
    description: String(module?.description || "").trim(),
    duration: String(module?.duration || "").trim(),
    lessons: Array.isArray(module?.lessons)
      ? module.lessons.map((lesson, lessonIndex) => normalizeLesson(lesson, courseId, moduleId, lessonIndex))
      : [],
  };
};

const normalizeCourse = (payload = {}, fallbackId = undefined) => {
  const title = String(payload.title || "").trim();
  const slug = slugify(payload.slug || title);
  const id = String(fallbackId || payload.id || slug || `${Date.now()}`);

  return {
    id,
    title,
    slug,
    category: String(payload.category || "").trim(),
    instructor: DEFAULT_INSTRUCTOR,
    description: String(payload.description || "").trim(),
    thumbnail: String(payload.thumbnail || "").trim(),
    modules: Array.isArray(payload.modules)
      ? payload.modules.map((module, moduleIndex) => normalizeModule(module, id, moduleIndex))
      : [],
  };
};

const validateCourse = (course) => {
  if (!course.title) return "Title is required.";
  if (!course.slug) return "Slug is required.";
  if (!course.category) return "Category is required.";
  if (!course.description) return "Description is required.";
  return null;
};

const toCourseSummary = (course) => ({
  id: course.id,
  slug: course.slug,
  title: course.title,
  category: course.category,
  instructor: course.instructor || DEFAULT_INSTRUCTOR,
  thumbnail: course.thumbnail,
  description: course.description,
});

const findCourseIndex = (courses, lookupValue = "") => {
  const lookup = String(lookupValue || "").trim().toLowerCase();
  return courses.findIndex(
    (item) => item.id === lookup || item.slug.toLowerCase() === lookup || item.id.toLowerCase() === lookup,
  );
};

const withCourseMutation = async (req, res, callback) => {
  const courses = await readCourses();
  const courseIndex = courses.findIndex((item) => item.id === req.params.id);

  if (courseIndex === -1) {
    return res.status(404).json({ success: false, message: "Course not found." });
  }

  const result = callback(normalizeCourse(courses[courseIndex], courses[courseIndex].id));
  if (result?.error) {
    return res.status(result.status || 400).json({ success: false, message: result.error });
  }

  courses[courseIndex] = normalizeCourse(result.course, courses[courseIndex].id);
  await writeCourses(courses);
  return res.json({ success: true, data: courses[courseIndex] });
};

export const getCourses = async (_req, res) => {
  const courses = await readCourses();
  return res.json({ success: true, data: courses.map(toCourseSummary) });
};

export const getCourseById = async (req, res) => {
  const courses = await readCourses();
  const courseIndex = findCourseIndex(courses, req.params.slug || req.params.id);
  const course = courseIndex >= 0 ? courses[courseIndex] : null;

  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found." });
  }

  return res.json({ success: true, data: normalizeCourse(course, course.id) });
};

export const createCourse = async (req, res) => {
  console.log("Incoming body:", req.body);
  const courses = await readCourses();
  const course = normalizeCourse(req.body || {});
  const validationMessage = validateCourse(course);

  if (validationMessage) {
    return res.status(400).json({ success: false, message: validationMessage });
  }

  if (courses.some((item) => item.id === course.id || item.slug === course.slug)) {
    return res.status(409).json({ success: false, message: "A course with this slug already exists." });
  }

  const nextCourses = [course, ...courses];
  await writeCourses(nextCourses);
  return res.status(201).json({ success: true, data: course });
};

export const updateCourse = async (req, res) => {
  const courses = await readCourses();
  const targetIndex = courses.findIndex((item) => item.id === req.params.id);

  if (targetIndex === -1) {
    return res.status(404).json({ success: false, message: "Course not found." });
  }

  const existing = courses[targetIndex];
  const merged = normalizeCourse({ ...existing, ...req.body }, existing.id);
  const validationMessage = validateCourse(merged);

  if (validationMessage) {
    return res.status(400).json({ success: false, message: validationMessage });
  }

  if (courses.some((item, index) => index !== targetIndex && item.slug === merged.slug)) {
    return res.status(409).json({ success: false, message: "A course with this slug already exists." });
  }

  courses[targetIndex] = merged;
  await writeCourses(courses);

  return res.json({ success: true, data: merged });
};

export const addModule = async (req, res) =>
  withCourseMutation(req, res, (course) => {
    const nextModule = normalizeModule(req.body || {}, course.id, course.modules.length);
    return { course: { ...course, modules: [...course.modules, nextModule] } };
  });

export const updateModule = async (req, res) =>
  withCourseMutation(req, res, (course) => {
    const moduleIndex = course.modules.findIndex((module) => module.id === req.params.moduleId);
    if (moduleIndex < 0) return { error: "Module not found.", status: 404 };

    const merged = normalizeModule(
      { ...course.modules[moduleIndex], ...(req.body || {}), id: course.modules[moduleIndex].id },
      course.id,
      moduleIndex,
    );
    const modules = [...course.modules];
    modules[moduleIndex] = merged;
    return { course: { ...course, modules } };
  });

export const deleteModule = async (req, res) =>
  withCourseMutation(req, res, (course) => {
    const modules = course.modules.filter((module) => module.id !== req.params.moduleId);
    if (modules.length === course.modules.length) return { error: "Module not found.", status: 404 };
    return { course: { ...course, modules } };
  });

export const addLesson = async (req, res) =>
  withCourseMutation(req, res, (course) => {
    const moduleIndex = course.modules.findIndex((module) => module.id === req.params.moduleId);
    if (moduleIndex < 0) return { error: "Module not found.", status: 404 };

    const module = course.modules[moduleIndex];
    const nextLesson = normalizeLesson(req.body || {}, course.id, module.id, module.lessons.length);
    const modules = [...course.modules];
    modules[moduleIndex] = { ...module, lessons: [...module.lessons, nextLesson] };
    return { course: { ...course, modules } };
  });

export const updateLesson = async (req, res) =>
  withCourseMutation(req, res, (course) => {
    const moduleIndex = course.modules.findIndex((module) => module.id === req.params.moduleId);
    if (moduleIndex < 0) return { error: "Module not found.", status: 404 };

    const module = course.modules[moduleIndex];
    const lessonIndex = module.lessons.findIndex((lesson) => lesson.id === req.params.lessonId);
    if (lessonIndex < 0) return { error: "Lesson not found.", status: 404 };

    const lessons = [...module.lessons];
    lessons[lessonIndex] = normalizeLesson(
      { ...lessons[lessonIndex], ...(req.body || {}), id: lessons[lessonIndex].id },
      course.id,
      module.id,
      lessonIndex,
    );

    const modules = [...course.modules];
    modules[moduleIndex] = { ...module, lessons };
    return { course: { ...course, modules } };
  });

export const deleteLesson = async (req, res) =>
  withCourseMutation(req, res, (course) => {
    const moduleIndex = course.modules.findIndex((module) => module.id === req.params.moduleId);
    if (moduleIndex < 0) return { error: "Module not found.", status: 404 };

    const module = course.modules[moduleIndex];
    const lessons = module.lessons.filter((lesson) => lesson.id !== req.params.lessonId);
    if (lessons.length === module.lessons.length) return { error: "Lesson not found.", status: 404 };

    const modules = [...course.modules];
    modules[moduleIndex] = { ...module, lessons };
    return { course: { ...course, modules } };
  });

export const deleteCourse = async (req, res) => {
  const courses = await readCourses();
  const nextCourses = courses.filter((item) => item.id !== req.params.id);

  if (nextCourses.length === courses.length) {
    return res.status(404).json({ success: false, message: "Course not found." });
  }

  await writeCourses(nextCourses);
  return res.json({ success: true, data: nextCourses });
};
