import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coursesPath = path.resolve(__dirname, "../data/courses.json");

const readCourses = async () => {
  const raw = await fs.readFile(coursesPath, "utf-8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
};

const sortCourses = (courses, sortBy) => {
  if (sortBy === "category") {
    return [...courses].sort((a, b) => a.category.localeCompare(b.category));
  }

  if (sortBy === "featured") {
    return [...courses].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }

  return courses;
};

export const getCourses = async (req, res, next) => {
  try {
    const courses = await readCourses();
    const sorted = sortCourses(courses, req.query.sort);
    return res.json({
      success: true,
      data: sorted,
    });
  } catch (error) {
    return next(error);
  }
};

export const getCourseBySlug = async (req, res, next) => {
  try {
    const courses = await readCourses();
    const course = courses.find((item) => item.slug === req.params.slug);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    return next(error);
  }
};
