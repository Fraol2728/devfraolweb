import { mockCourses } from "@/features/courses/mockCourses";
import { courses as fallbackCourses } from "@/data/courses";

const fallbackLessonBlocks = (lessonTitle, courseTitle) => [
  {
    type: "paragraph",
    text: `In this lesson, you will build practical understanding of ${lessonTitle}. Focus on small repeatable actions so you can apply this concept confidently inside ${courseTitle}.`,
  },
  { type: "h2", text: "Core ideas" },
  {
    type: "list",
    ordered: false,
    items: [
      "Understand the goal before touching tools.",
      "Break the workflow into clear steps.",
      "Validate results with quick checks.",
    ],
  },
  { type: "h3", text: "Quick workflow" },
  {
    type: "ordered-list",
    items: ["Read the lesson objective.", "Apply the exact sequence shown.", "Repeat once from memory."],
  },
  {
    type: "callout",
    text: "Tip: Move slowly for your first pass, then speed up on repetition. Progress comes from consistency.",
  },
  {
    type: "code",
    text: `# learning-checklist\n- define the objective\n- execute the process\n- review and improve`,
  },
  {
    type: "quote",
    text: "Clarity beats speed. Once your process is clear, speed arrives naturally.",
  },
];

const normalizeBlock = (block) => {
  if (!block || typeof block !== "object") return null;

  if (block.type === "heading") return { type: "h2", text: block.text ?? "" };
  if (block.type === "tip") return { type: "callout", text: block.text ?? "" };
  if (block.type === "code") return { type: "code", text: block.text ?? block.code ?? "" };

  if (block.type === "paragraph") return { type: "paragraph", text: block.text ?? "" };
  if (block.type === "quote") return { type: "quote", text: block.text ?? "" };
  if (block.type === "list") return { type: "list", items: block.items ?? [] };

  return { type: "paragraph", text: block.text ?? "" };
};

const normalizeCourse = (course) => {
  const modules = (course.modules ?? course.syllabus ?? []).map((module, moduleIndex) => {
    const sourceLessons = module.lessons ?? module.topics ?? [];

    return {
      id: module.id ?? `${course.id}-module-${moduleIndex + 1}`,
      title: module.title ?? `Module ${moduleIndex + 1}`,
      lessons: sourceLessons.map((lesson, lessonIndex) => {
        const lessonId = `${course.id}-lesson-${moduleIndex + 1}-${lessonIndex + 1}`;

        if (typeof lesson === "string") {
          return {
            id: lessonId,
            title: lesson,
            content: fallbackLessonBlocks(lesson, course.title),
          };
        }

        const normalizedContent = (lesson.content ?? []).map(normalizeBlock).filter(Boolean);

        return {
          id: lesson.id ?? lessonId,
          title: lesson.title ?? `Lesson ${lessonIndex + 1}`,
          content: normalizedContent.length ? normalizedContent : fallbackLessonBlocks(lesson.title ?? `Lesson ${lessonIndex + 1}`, course.title),
        };
      }),
    };
  });

  return {
    id: course.id,
    slug: course.slug ?? course.id,
    title: course.title,
    modules,
  };
};

export const getLearningCourse = (slug) => {
  const normalizedSlug = String(slug ?? "").toLowerCase();

  const mockMatch = mockCourses.find((course) => String(course.slug).toLowerCase() === normalizedSlug);
  if (mockMatch) return normalizeCourse(mockMatch);

  const fallbackMatch = fallbackCourses.find((course) => String(course.id).toLowerCase() === normalizedSlug);
  return fallbackMatch ? normalizeCourse(fallbackMatch) : null;
};
