import { mockCourses } from "@/features/courses/mockCourses";
import { courses as fallbackCourses } from "@/data/courses";
import { microsoftWindowsCourseContent } from "@/data/microsoftWindowsCourseContent";
import { networkingInternetBasicsCourseContent } from "@/data/networkingInternetBasicsCourseContent";
import { operatingSystemsFundamentalsCourseContent } from "@/data/operatingSystemsFundamentalsCourseContent";
import rj45Image from "@/assets/rj45.png";
import windowsDesktopImage from "@/assets/windows-desktop.svg";

const lessonImageMap = {
  rj45: rj45Image,
  windowsDesktop: windowsDesktopImage,
};

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
  if (block.type === "image") return { type: "image", src: block.src ?? "", alt: block.alt ?? "Lesson image" };

  return { type: "paragraph", text: block.text ?? "" };
};

const toListBlock = (items = [], ordered = false) => {
  const normalizedItems = items.filter(Boolean);
  if (!normalizedItems.length) return [];

  return [
    {
      type: ordered ? "ordered-list" : "list",
      ordered,
      items: normalizedItems,
    },
  ];
};

const lessonSectionsToBlocks = (lesson) => {
  if (!lesson || typeof lesson !== "object") return [];

  const blocks = [];

  if (lesson.overview) blocks.push({ type: "paragraph", text: lesson.overview });

  if (lesson.definition) {
    blocks.push({ type: "h2", text: "Definition" });
    blocks.push({ type: "paragraph", text: lesson.definition });

    if (lesson.definitionImageKey && lessonImageMap[lesson.definitionImageKey]) {
      blocks.push({
        type: "image",
        src: lessonImageMap[lesson.definitionImageKey],
        alt: lesson.definitionImageAlt ?? "Definition reference image",
      });
    }
  }

  if (lesson.examples?.length) {
    blocks.push({ type: "h2", text: "Examples" });
    blocks.push(...toListBlock(lesson.examples));
  }

  if (lesson.keyPoints?.length) {
    blocks.push({ type: "h2", text: "Key Points" });
    blocks.push(...toListBlock(lesson.keyPoints));
  }

  if (lesson.howToUse?.length) {
    blocks.push({ type: "h2", text: "How to Use (Simple Steps)" });
    blocks.push(...toListBlock(lesson.howToUse, true));

    if (lesson.howToUseVideoUrl) {
      blocks.push({
        type: "video",
        title: lesson.howToUseVideoTitle ?? "How-to video",
        url: lesson.howToUseVideoUrl,
      });
    }

    if (lesson.howToUseImageKey && lessonImageMap[lesson.howToUseImageKey]) {
      blocks.push({
        type: "image",
        src: lessonImageMap[lesson.howToUseImageKey],
        alt: lesson.howToUseImageAlt ?? "How to use reference image",
      });
    }
  }

  if (lesson.tips?.length) {
    blocks.push({ type: "h2", text: "Tips" });
    blocks.push({ type: "tips-list", items: lesson.tips.filter(Boolean) });
  }

  if (lesson.commonMistakes?.length) {
    blocks.push({ type: "h2", text: "Common Mistakes" });
    blocks.push(...toListBlock(lesson.commonMistakes));
  }

  if (lesson.quickSummary) {
    blocks.push({ type: "h2", text: "Quick Summary" });
    blocks.push({ type: "paragraph", text: lesson.quickSummary });
  }

  if (lesson.practiceTasks?.length) {
    blocks.push({ type: "h2", text: "Practice Task" });
    blocks.push(...toListBlock(lesson.practiceTasks));
  }

  if (lesson.quiz?.length) {
    blocks.push({ type: "h2", text: "Quiz" });
    blocks.push(...toListBlock(lesson.quiz));
  }

  return blocks;
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
        const structuredBlocks = lessonSectionsToBlocks(lesson);
        const content = normalizedContent.length ? normalizedContent : structuredBlocks;

        return {
          id: lesson.id ?? lessonId,
          title: lesson.title ?? `Lesson ${lessonIndex + 1}`,
          exam: lesson.exam,
          content: content.length ? content : fallbackLessonBlocks(lesson.title ?? `Lesson ${lessonIndex + 1}`, course.title),
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

  const windowsMatch = microsoftWindowsCourseContent.find((course) => String(course.slug).toLowerCase() === normalizedSlug);
  if (windowsMatch) return normalizeCourse(windowsMatch);

  const networkingMatch = networkingInternetBasicsCourseContent.find(
    (course) => String(course.slug).toLowerCase() === normalizedSlug,
  );
  if (networkingMatch) return normalizeCourse(networkingMatch);

  const operatingSystemsMatch = operatingSystemsFundamentalsCourseContent.find(
    (course) => String(course.slug).toLowerCase() === normalizedSlug,
  );
  if (operatingSystemsMatch) return normalizeCourse(operatingSystemsMatch);

  const mockMatch = mockCourses.find((course) => String(course.slug).toLowerCase() === normalizedSlug);
  if (mockMatch) return normalizeCourse(mockMatch);

  const fallbackMatch = fallbackCourses.find((course) => String(course.id).toLowerCase() === normalizedSlug);
  return fallbackMatch ? normalizeCourse(fallbackMatch) : null;
};
