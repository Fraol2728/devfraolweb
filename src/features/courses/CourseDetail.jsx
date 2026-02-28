import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Check, BookOpen, Clock3, FileText } from "lucide-react";
import { mockCourses } from "@/features/courses/mockCourses";
import { courses as fallbackCourses } from "@/data/courses";
import { CourseDetailModules } from "@/features/courses/CourseDetailModules";

const getFirstLesson = (course) => course?.modules?.[0]?.lessons?.find((lesson) => lesson.unlocked !== false) ?? null;

const durationToMinutes = (duration = "") => {
  const result = Number.parseInt(duration, 10);
  return Number.isNaN(result) ? 12 : result;
};

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
            completed: lessonIndex === 0,
          };
        }

        return {
          ...lesson,
          unlocked: lesson.unlocked ?? true,
          completed: lesson.completed ?? lessonIndex === 0,
        };
      }),
    };
  });

  const lessonCount = modules.reduce((total, module) => total + module.lessons.length, 0);
  const totalMinutes = modules.reduce((total, module) => total + module.lessons.reduce((sum, lesson) => sum + durationToMinutes(lesson.duration), 0), 0);
  const modulesCount = modules.length;
  const level = course.level ?? "Intermediate";

  return {
    ...course,
    slug: course.slug ?? course.id,
    modules,
    lessonCount,
    totalMinutes,
    modulesCount,
    level,
    rating: course.rating ?? 4.8,
    students: course.students ?? 18240,
    category: course.category ?? "Programming",
    thumbnail:
      course.thumbnail ??
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    instructor: course.instructor ?? {
      name: course.instructor ?? "Dev Fraol",
      title: "Senior Instructor",
      bio: "Mentor focused on practical workflows, production-ready habits, and portfolio outcomes for modern developers.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
    },
  };
};

const formatDuration = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${String(mins).padStart(2, "0")}m`;
};

const buildLearningPoints = (modules) =>
  modules
    .flatMap((module) => module.lessons.slice(0, 2).map((lesson) => `Confidently apply ${lesson.title.toLowerCase()} in real scenarios.`))
    .slice(0, 8);

const requirements = [
  "A laptop or desktop with stable internet access",
  "Basic familiarity with browsing and installing tools",
  "Consistency: at least 3 focused sessions per week",
  "A notebook (or digital notes) for implementation checklists",
];

export const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openModuleId, setOpenModuleId] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);

  const normalizedSlug = String(slug ?? "").toLowerCase();

  const course = useMemo(() => {
    const match = mockCourses.find((item) => String(item.slug).toLowerCase() === normalizedSlug);
    if (match) return normalizeCourse(match);

    const fallback = fallbackCourses.find((item) => String(item.id).toLowerCase() === normalizedSlug);
    return fallback ? normalizeCourse(fallback) : null;
  }, [normalizedSlug]);

  useEffect(() => {
    setOpenModuleId(course?.modules?.[0]?.id ?? null);
    setActiveLessonId(course?.modules?.[0]?.lessons?.[0]?.id ?? null);
  }, [course]);

  if (!course) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[1240px] items-center justify-center px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-[#232326] bg-[#151518] p-8 text-center">
          <h1 className="text-3xl font-bold text-white">Course not found.</h1>
          <Link to="/courses" className="mt-4 inline-flex rounded-xl border border-[#E10600] px-4 py-2 text-sm font-medium text-[#E10600]">
            Back to courses
          </Link>
        </div>
      </section>
    );
  }

  const firstLesson = getFirstLesson(course);
  const learningPoints = buildLearningPoints(course.modules);
  const metaRow = `${course.modulesCount} Modules • ${course.lessonCount} Lessons • ${formatDuration(course.totalMinutes)} • ${course.level}`;

  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-28 pt-8 text-left sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="space-y-8">
          <header className="rounded-[24px] border border-[#232326] bg-[#151518] p-6 sm:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <span className="inline-flex rounded-full bg-[#E10600]/20 px-3 py-1 text-sm font-medium text-[#ff8f8b]">{course.category}</span>
                <h1 className="mt-4 text-4xl font-bold tracking-[-0.02em] text-white sm:text-[44px]">{course.title}</h1>
                <p className="mt-4 max-w-2xl text-base font-medium leading-8 text-[#A1A1AA]">{course.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[#A1A1AA]">
                  <span>By {course.instructor.name}</span>
                  <span className="inline-flex items-center gap-1 text-[#E10600]">
                    <Star className="h-4 w-4 fill-current" /> {course.rating}
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => navigate(`/courses/${course.slug}/learn`)}
                    className="rounded-xl bg-[#E10600] px-5 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_22px_rgba(225,6,0,0.35)]"
                  >
                    Enroll Now
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="rounded-xl border border-[#E10600] px-5 py-3 text-sm font-semibold text-[#E10600] transition hover:bg-[#E10600]/10"
                  >
                    Preview Syllabus
                  </motion.button>
                </div>
              </div>

              <article className="rounded-2xl border border-[#232326] bg-[#0E0E10] p-4 shadow-[0_10px_34px_rgba(0,0,0,0.28)]">
                <img src={course.thumbnail} alt={course.title} className="h-56 w-full rounded-xl object-cover" />
              </article>
            </div>
          </header>

          <div className="rounded-2xl border border-[#232326] bg-[#151518] px-6 py-4 text-sm text-[#A1A1AA]">{metaRow}</div>

          <CourseDetailModules
            modules={course.modules}
            openModuleId={openModuleId}
            onToggleModule={(moduleId) => setOpenModuleId((prev) => (prev === moduleId ? null : moduleId))}
            activeLessonId={activeLessonId}
            onSelectLesson={setActiveLessonId}
          />

          <section className="rounded-2xl border border-[#232326] bg-[#151518] p-6">
            <h2 className="text-2xl font-semibold text-white">Instructor</h2>
            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <p className="text-lg font-bold text-white">{course.instructor.name}</p>
                  <p className="text-sm text-[#A1A1AA]">{course.instructor.title}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#E10600]"><Star className="h-4 w-4 fill-current" /> {course.instructor.rating ?? 4.9}</p>
                </div>
              </div>

              <div className="max-w-xl">
                <p className="line-clamp-4 text-sm leading-7 text-[#A1A1AA]">{course.instructor.bio}</p>
                <button type="button" className="mt-4 rounded-xl border border-[#E10600] px-4 py-2 text-sm font-medium text-[#E10600] transition hover:bg-[#E10600]/10">
                  View Profile
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">What You&apos;ll Learn</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {learningPoints.map((point) => (
                <article key={point} className="rounded-xl border border-[#232326] bg-[#151518] p-4">
                  <p className="flex items-start gap-3 text-sm text-[#A1A1AA]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E10600]" />
                    <span>{point}</span>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#232326] bg-[#151518] p-6">
            <h2 className="text-2xl font-semibold text-white">Requirements</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-[#A1A1AA]">
              {requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

        </div>

        <aside className="hidden lg:block lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[#232326] bg-[#151518] p-6">
            <p className="text-sm text-[#A1A1AA]">Full access</p>
            <p className="mt-1 text-4xl font-bold text-white">Free</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate(`/courses/${course.slug}/learn`)}
              className="mt-5 w-full rounded-xl bg-[#E10600] px-4 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_24px_rgba(225,6,0,0.35)]"
            >
              Enroll Now
            </motion.button>
            <button type="button" className="mt-3 w-full rounded-xl border border-[#E10600] px-4 py-3 text-sm font-semibold text-[#E10600] transition hover:bg-[#E10600]/10">
              Add to Wishlist
            </button>

            <ul className="mt-6 space-y-3 text-sm text-[#A1A1AA]">
              <li className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#E10600]" /> Lifetime access</li>
              <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#E10600]" /> Text-based lesson notes</li>
              <li className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#E10600]" /> {formatDuration(course.totalMinutes)} self-paced content</li>
            </ul>

            {firstLesson ? <p className="mt-6 text-xs text-[#A1A1AA]">Start with: {firstLesson.title}</p> : null}
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#232326] bg-[#151518] p-3 lg:hidden">
        <div className="mx-auto flex w-full max-w-[1240px] items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-[#A1A1AA]">Premium access</p>
            <p className="text-lg font-bold text-white">Free</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => navigate(`/courses/${course.slug}/learn`)}
            className="rounded-xl bg-[#E10600] px-4 py-3 text-sm font-semibold text-white"
          >
            Enroll Now
          </motion.button>
        </div>
      </div>
    </section>
  );
};
