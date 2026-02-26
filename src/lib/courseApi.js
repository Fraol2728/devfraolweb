import { courseDetailTable, instructorTable, lessonsTable, modulesTable } from "@/data/courseDetailData";

const wait = (ms = 220) => new Promise((resolve) => {
  window.setTimeout(resolve, ms);
});

export const fetchCourseBySlug = async (slug) => {
  await wait();

  const course = courseDetailTable.find((item) => item.slug === slug || item.id === slug);
  if (!course) {
    throw new Error("Course not found");
  }

  const modules = modulesTable
    .filter((module) => module.course_id === course.slug)
    .map((module) => ({
      ...module,
      lessons: lessonsTable.filter((lesson) => lesson.module_id === module.id),
    }));

  const instructor = instructorTable.find((item) => item.id === course.instructor_id);
  const relatedCourses = courseDetailTable
    .filter((item) => item.slug !== course.slug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      tagline: item.tagline,
      level: item.level,
      thumbnail: item.thumbnail,
      duration: item.duration,
    }));

  return { course, modules, instructor, relatedCourses };
};
