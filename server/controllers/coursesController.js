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
  await fs.writeFile(coursesPath, `${JSON.stringify(courses, null, 2)}\n`, "utf-8");
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
      ? payload.modules.map((module, moduleIndex) => ({
          id: String(module?.id || `${id}-m${moduleIndex + 1}`),
          title: String(module?.title || "").trim(),
          description: String(module?.description || "").trim(),
          duration: String(module?.duration || "").trim(),
          lessons: Array.isArray(module?.lessons)
            ? module.lessons.map((lesson, lessonIndex) => ({
                id: String(lesson?.id || `${id}-m${moduleIndex + 1}-l${lessonIndex + 1}`),
                title: String(lesson?.title || "").trim(),
                description: String(lesson?.description || "").trim(),
                duration: String(lesson?.duration || "").trim(),
                youtubeVideoId: String(lesson?.youtubeVideoId || lesson?.youtube_video_id || "").trim(),
                isPreview: Boolean(lesson?.isPreview ?? lesson?.is_preview ?? lessonIndex === 0),
              }))
            : [],
        }))
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

export const getCourses = async (_req, res) => {
  const courses = await readCourses();
  return res.json({ success: true, data: courses.map(toCourseSummary) });
};

export const getCourseById = async (req, res) => {
  const courses = await readCourses();
  const lookup = String(req.params.id || "").trim().toLowerCase();
  const course = courses.find((item) => item.id === lookup || item.slug.toLowerCase() === lookup || item.id.toLowerCase() === lookup);

  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found." });
  }

  return res.json({ success: true, data: normalizeCourse(course, course.id) });
};

export const createCourse = async (req, res) => {
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

export const deleteCourse = async (req, res) => {
  const courses = await readCourses();
  const nextCourses = courses.filter((item) => item.id !== req.params.id);

  if (nextCourses.length === courses.length) {
    return res.status(404).json({ success: false, message: "Course not found." });
  }

  await writeCourses(nextCourses);
  return res.json({ success: true, data: nextCourses });
};
