import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { mockCourses } from "@/features/courses/mockCourses";
import { courses as fallbackCourses } from "@/data/courses";
import { HeroSection } from "@/features/courses/HeroSection";
import { IntroductionVideo } from "@/features/courses/IntroductionVideo";
import { CourseOutline } from "@/features/courses/CourseOutline";
import { LessonPanel } from "@/features/courses/LessonPanel";
import { InstructorCard } from "@/features/courses/InstructorCard";
import { RelatedCourses } from "@/features/courses/RelatedCourses";
import { CourseFAQ } from "@/features/courses/CourseFAQ";

const getFirstLesson = (course) => course?.modules?.[0]?.lessons?.find((lesson) => lesson.unlocked !== false) ?? null;

const normalizeCourse = (course) => {
  const modules = (course.modules ?? course.syllabus ?? []).map((module, moduleIndex) => {
    const sourceLessons = module.lessons ?? module.topics ?? [];

    return {
      id: module.id ?? `${course.id}-module-${moduleIndex + 1}`,
      title: module.title ?? `Module ${moduleIndex + 1}`,
      lessons: sourceLessons.map((lesson, lessonIndex) => {
        if (typeof lesson === "string") {
          return {
            id: `${course.id}-lesson-${moduleIndex + 1}-${lessonIndex + 1}`,
            title: lesson,
            duration: "12 min",
            unlocked: lessonIndex < 3,
            definition: `This lesson introduces ${lesson.toLowerCase()} in ${course.title}.`,
            content: [
              { type: "heading", text: lesson },
              { type: "paragraph", text: course.description },
              { type: "tip", text: "Take notes and practice each concept with a mini challenge." },
            ],
          };
        }

        return {
          ...lesson,
          unlocked: lesson.unlocked ?? true,
        };
      }),
    };
  });

  const lessonCount = modules.reduce((total, module) => total + module.lessons.length, 0);

  return {
    ...course,
    slug: course.slug ?? course.id,
    modules,
    introVideoId: course.introVideoId ?? "dQw4w9WgXcQ",
    videoTagline: course.videoTagline ?? "Get a quick tour of your learning journey before diving in.",
    instructor: course.instructor ?? {
      name: "Dev Fraol",
      title: "Instructor",
      bio: "Helping learners grow practical digital skills through engaging, project-based lessons.",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80",
      socials: [
        { type: "github", url: "https://github.com" },
        { type: "linkedin", url: "https://linkedin.com" },
      ],
    },
    faqs: course.faqs ?? [
      { question: "Do I need prior experience?", answer: "No. The course starts from fundamentals and gradually increases in depth." },
      { question: "How long will this course take?", answer: "Most learners complete it in 4 to 6 weeks at a steady pace." },
    ],
    stats: [
      { label: "Modules", value: String(modules.length) },
      { label: "Lessons", value: String(lessonCount) },
      { label: "Duration", value: `${Math.max(lessonCount * 12, 60)} mins` },
    ],
  };
};

export const CourseDetail = () => {
  const { slug } = useParams();
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [isMobileLessonOpen, setIsMobileLessonOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const normalizedSlug = String(slug ?? "").toLowerCase();

  const course = useMemo(() => {
    const match = mockCourses.find((item) => String(item.slug).toLowerCase() === normalizedSlug);
    if (match) return normalizeCourse(match);

    const fallback = fallbackCourses.find((item) => String(item.id).toLowerCase() === normalizedSlug);
    return fallback ? normalizeCourse(fallback) : null;
  }, [normalizedSlug]);

  useEffect(() => {
    setIsLoading(true);
    const id = window.setTimeout(() => setIsLoading(false), 160);
    return () => window.clearTimeout(id);
  }, [normalizedSlug]);

  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id })));
  }, [course]);

  const activeLesson = allLessons.find((lesson) => lesson.id === activeLessonId) ?? null;

  useEffect(() => {
    const firstLesson = getFirstLesson(course);
    setActiveModuleId(course?.modules?.[0]?.id ?? null);
    setActiveLessonId(firstLesson?.id ?? null);
    setIsMobileLessonOpen(false);
  }, [course]);

  const handleSelectLesson = (lesson, moduleId) => {
    if (lesson.unlocked === false) return;
    setActiveModuleId(moduleId);
    setActiveLessonId(lesson.id);
    setIsMobileLessonOpen(true);
  };

  if (isLoading) {
    return <div className="mx-auto mt-6 h-72 w-full max-w-[1280px] animate-pulse rounded-3xl border border-white/10 bg-white/5" />;
  }

  if (!course) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="rounded-3xl border border-white/10 bg-[#121826]/80 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">Course Not Found — The requested course does not exist.</h1>
          <Link to="/courses" className="mt-5 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900">
            Back to Courses
          </Link>
        </div>
      </section>
    );
  }

  const relatedCourses = mockCourses.filter((item) => item.slug !== course.slug).slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        <motion.div key={course.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <HeroSection course={course} stats={course.stats} />
          <IntroductionVideo videoId={course.introVideoId} tagline={course.videoTagline} />

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(300px,34%)_minmax(0,66%)] lg:items-start">
            <CourseOutline
              modules={course.modules}
              activeModuleId={activeModuleId}
              activeLessonId={activeLessonId}
              onToggleModule={setActiveModuleId}
              onSelectLesson={handleSelectLesson}
            />
            <LessonPanel lesson={activeLesson} isMobileOpen={isMobileLessonOpen} onCloseMobile={() => setIsMobileLessonOpen(false)} />
          </div>

          <InstructorCard instructor={course.instructor} />
          <RelatedCourses courses={relatedCourses} />
          <CourseFAQ faqs={course.faqs} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
