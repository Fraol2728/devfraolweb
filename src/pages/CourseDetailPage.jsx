import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Clock3, Globe, Menu, Star, X } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { courses } from "@/data/courses";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { LessonPlayer } from "@/components/ui/LessonPlayer";
import { CurriculumSidebar } from "@/components/ui/CurriculumSidebar";
import { WhatYouLearn } from "@/components/ui/WhatYouLearn";
import { InstructorSection } from "@/components/ui/InstructorSection";
import { RelatedCourses } from "@/components/ui/RelatedCourses";

const fallbackInstructor = {
  id: "dev-fraol",
  name: "Dev Fraol",
  bio: "Dev Fraol helps learners turn fundamentals into real-world projects with practical and modern workflows.",
  profile_image: "/profile-logo.png",
};

const buildFallbackData = (slug) => {
  const baseCourse = courses.find((course) => (course.slug || course.id) === slug || course.id === slug);
  if (!baseCourse) {
    return null;
  }

  const modules = baseCourse.syllabus.map((module, moduleIndex) => ({
    id: `${baseCourse.id}-module-${moduleIndex + 1}`,
    title: module.title,
    lessons: module.topics.map((topic, lessonIndex) => ({
      id: `${baseCourse.id}-lesson-${moduleIndex + 1}-${lessonIndex + 1}`,
      module_id: `${baseCourse.id}-module-${moduleIndex + 1}`,
      title: topic,
      youtube_video_id: "dQw4w9WgXcQ",
      duration: "08:30",
      is_preview: lessonIndex === 0,
    })),
  }));

  return {
    course: {
      ...baseCourse,
      slug: baseCourse.slug || baseCourse.id,
      short_description: baseCourse.description,
      full_description:
        "This course is designed to move you from theory into practical implementation, guided by modern best practices and production-ready examples.",
      language: "English",
      total_lessons: modules.reduce((sum, module) => sum + module.lessons.length, 0),
      rating: 4.8,
      price: baseCourse.price || "$49",
    },
    instructor: fallbackInstructor,
    modules,
    lessons: modules.flatMap((module) => module.lessons),
  };
};

const mapApiCoursePayload = (payload, slug) => {
  if (!payload?.course) {
    return buildFallbackData(slug);
  }

  const modulesMap = new Map();
  const lessons = payload.lessons ?? [];

  lessons.forEach((lesson) => {
    if (!modulesMap.has(lesson.module_id)) {
      modulesMap.set(lesson.module_id, { id: lesson.module_id, title: lesson.module_title || "Module", lessons: [] });
    }
    modulesMap.get(lesson.module_id).lessons.push(lesson);
  });

  const modules = Array.from(modulesMap.values());

  return {
    course: {
      ...payload.course,
      total_lessons: lessons.length,
      language: payload.course.language || "English",
      rating: payload.course.rating || 4.9,
      price: payload.course.price || "$49",
    },
    instructor: payload.instructor || fallbackInstructor,
    modules,
    lessons,
  };
};

export const CourseDetailPage = () => {
  const { slug, courseId } = useParams();
  const routeSlug = slug || courseId;

  const [isLoading, setIsLoading] = useState(true);
  const [courseBundle, setCourseBundle] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [openModuleId, setOpenModuleId] = useState(null);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        const payload = await apiFetch(`/api/courses/${routeSlug}`);
        if (!isCancelled) {
          setCourseBundle(mapApiCoursePayload(payload, routeSlug));
        }
      } catch {
        if (!isCancelled) {
          setCourseBundle(buildFallbackData(routeSlug));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchCourse();

    return () => {
      isCancelled = true;
    };
  }, [routeSlug]);

  useEffect(() => {
    if (!courseBundle?.modules?.length) return;
    setOpenModuleId(courseBundle.modules[0].id);
    const firstPreview = courseBundle.lessons.find((lesson) => lesson.is_preview);
    setActiveLesson(firstPreview || courseBundle.lessons[0]);
  }, [courseBundle]);

  useSeoMeta(
    courseBundle?.course
      ? {
          title: `${courseBundle.course.title} | Dev Fraol Academy Courses`,
          description: courseBundle.course.short_description || courseBundle.course.description,
        }
      : {
          title: "Course detail | Dev Fraol Academy",
          description: "Dive into modules, lesson previews, and instructor-guided course details.",
        },
  );

  const relatedCourses = useMemo(() => {
    if (!courseBundle?.course) return [];
    return courses
      .filter((course) => course.category === "Programming" && (course.slug || course.id) !== (courseBundle.course.slug || courseBundle.course.id))
      .slice(0, 3);
  }, [courseBundle]);

  if (!isLoading && !courseBundle?.course) {
    return <Navigate to="/courses" replace />;
  }

  const selectLesson = (lesson) => {
    setOpenModuleId(lesson.module_id);
    if (!lesson.is_preview) {
      setShowLockedModal(true);
      return;
    }
    setActiveLesson(lesson);
    setIsDrawerOpen(false);
  };

  const learningOutcomes = [
    "Build practical projects from real lesson workflows",
    "Understand concepts with clear, structured modules",
    "Practice modern techniques used in production",
    "Develop confidence through guided exercises",
    "Apply best practices for maintainable code",
    "Prepare for professional-level project delivery",
  ];

  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-8 px-4 pb-14 sm:px-6 lg:px-8">
      <Link to="/courses" className="inline-flex pt-2 text-sm font-medium text-[#ff7d74] transition hover:text-[#ff4d43]">
        ← Back to courses
      </Link>

      {isLoading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-sm text-foreground/70">Loading course details...</div>
      ) : (
        <>
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#1f2432]/90 via-[#1a1f2f]/80 to-[#131722]/90 p-6 shadow-[0_30px_60px_rgba(5,8,18,0.45)] lg:grid-cols-[1.2fr_360px] lg:p-8"
          >
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#ff8f87]">Course detail</p>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{courseBundle.course.title}</h1>
              <p className="max-w-2xl text-sm text-white/75 sm:text-base">{courseBundle.course.short_description}</p>

              <div className="flex flex-wrap gap-2 text-xs text-white/80">
                <span className="rounded-full bg-white/10 px-3 py-1.5">{courseBundle.course.level}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5"><Clock3 className="h-3.5 w-3.5" />{courseBundle.course.duration}</span>
                <span className="rounded-full bg-white/10 px-3 py-1.5">{courseBundle.course.total_lessons} lessons</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5"><Globe className="h-3.5 w-3.5" />{courseBundle.course.language}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5"><Star className="h-3.5 w-3.5 text-amber-300" />{courseBundle.course.rating}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/20 bg-black/30 p-4 backdrop-blur-xl">
              <img src={courseBundle.course.thumbnail} alt={courseBundle.course.title} className="h-44 w-full rounded-2xl object-cover" />
              <p className="mt-4 text-3xl font-bold text-white">{courseBundle.course.price}</p>
              <button type="button" className="mt-3 w-full rounded-xl bg-gradient-to-r from-[#ff5d52] to-[#ff3b30] py-3 text-sm font-semibold text-white">Enroll Now</button>
              <button type="button" className="mt-2 w-full rounded-xl border border-white/20 py-3 text-sm font-medium text-white/85">Add to Wishlist</button>
            </div>
          </motion.section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_370px]">
            <div className="space-y-5">
              <LessonPlayer lesson={activeLesson} courseTitle={courseBundle.course.title} />
            </div>

            <div className="hidden lg:block">
              <CurriculumSidebar
                course={courseBundle.course}
                modules={courseBundle.modules}
                openModuleId={openModuleId}
                onToggleModule={setOpenModuleId}
                activeLessonId={activeLesson?.id}
                onSelectLesson={selectLesson}
                showEnroll={Boolean(activeLesson && !activeLesson.is_preview)}
              />
            </div>
          </section>

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-background/70 px-4 py-2 text-sm font-semibold text-foreground"
            >
              <Menu className="h-4 w-4" /> Curriculum
            </button>
          </div>

          <AnimatePresence>
            {isDrawerOpen ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/60 p-4 lg:hidden">
                <motion.div initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }} className="ml-auto max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl">
                  <div className="mb-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsDrawerOpen(false)}
                      className="rounded-full border border-white/20 bg-black/30 p-2 text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <CurriculumSidebar
                    course={courseBundle.course}
                    modules={courseBundle.modules}
                    openModuleId={openModuleId}
                    onToggleModule={setOpenModuleId}
                    activeLessonId={activeLesson?.id}
                    onSelectLesson={selectLesson}
                    showEnroll={Boolean(activeLesson && !activeLesson.is_preview)}
                  />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <WhatYouLearn outcomes={learningOutcomes} />

          <section className="grid gap-5 xl:grid-cols-2">
            <article className="rounded-3xl border border-white/15 bg-background/70 p-6 shadow-[0_18px_40px_rgba(12,18,30,0.25)] backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-semibold text-foreground">About This Course</h2>
              <p className="mt-4 text-sm text-foreground/75">{courseBundle.course.full_description}</p>
              <p className="mt-3 text-sm text-foreground/75">Ideal for learners who want a guided path from foundations to practical outcomes with clear module progression.</p>
              <p className="mt-3 text-sm text-foreground/75">You&apos;ll finish with hands-on confidence and a structure you can reuse in your own projects.</p>
            </article>

            <article className="rounded-3xl border border-white/15 bg-background/70 p-6 shadow-[0_18px_40px_rgba(12,18,30,0.25)] backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-semibold text-foreground">Requirements</h2>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                <li>• Basic computer literacy and internet access</li>
                <li>• Curiosity to practice consistently</li>
                <li>• A laptop/desktop for coding or project work</li>
                <li>• Commitment to complete each module exercise</li>
              </ul>
            </article>
          </section>

          <InstructorSection instructor={courseBundle.instructor} totalCourses={courses.length} />
          <RelatedCourses courses={relatedCourses} />

          <AnimatePresence>
            {showLockedModal ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[80] flex items-center justify-center bg-black/65 px-4"
              >
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-md rounded-2xl border border-white/15 bg-[#131722] p-6 text-white shadow-2xl">
                  <h3 className="text-xl font-semibold">This lesson is locked</h3>
                  <p className="mt-2 text-sm text-white/75">Enroll now to unlock all modules, downloadable resources, and guided lesson flow.</p>
                  <div className="mt-5 flex gap-2">
                    <button type="button" onClick={() => setShowLockedModal(false)} className="flex-1 rounded-xl border border-white/20 px-4 py-2 text-sm">Close</button>
                    <button type="button" className="flex-1 rounded-xl bg-gradient-to-r from-[#ff5d52] to-[#ff3b30] px-4 py-2 text-sm font-semibold">Enroll Now</button>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
