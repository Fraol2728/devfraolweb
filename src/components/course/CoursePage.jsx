import { useEffect, useMemo, useState } from "react";
import { Clock3, GraduationCap, Menu, PlayCircle, X } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { fetchCourseBySlug } from "@/lib/courseApi";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { LessonPlayer } from "@/components/course/LessonPlayer";
import { CurriculumSidebar } from "@/components/course/CurriculumSidebar";
import { WhatYouLearn } from "@/components/course/WhatYouLearn";
import { InstructorSection } from "@/components/course/InstructorSection";
import { RelatedCourses } from "@/components/course/RelatedCourses";

export const CoursePage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeLesson, setActiveLesson] = useState(null);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    setActiveLesson(null);

    fetchCourseBySlug(slug)
      .then((response) => {
        if (!mounted) {
          return;
        }
        setData(response);
        const preview = response.modules.flatMap((module) => module.lessons).find((lesson) => lesson.is_preview);
        setActiveLesson(preview ?? null);
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || "Failed to load course");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  useSeoMeta({
    title: data ? `${data.course.title} | Dev Fraol Academy` : "Course Detail | Dev Fraol Academy",
    description: data?.course.tagline || "Watch lessons and explore curriculum details.",
  });

  const isVideoLayout = Boolean(activeLesson);
  const lessonIds = useMemo(() => new Set(data?.modules.flatMap((module) => module.lessons).map((lesson) => lesson.id) ?? []), [data]);

  if (loading) {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-center text-foreground/70">Loading course...</div>;
  }

  if (error || !data) {
    return <Navigate to="/courses" replace />;
  }

  const { course, instructor, modules, relatedCourses } = data;

  const handleLessonSelect = (lesson) => {
    if (!lessonIds.has(lesson.id)) {
      return;
    }
    setActiveLesson(lesson);
    setOpenMobileSidebar(false);
  };

  const handleLockedLessonClick = () => {
    setShowLockedModal(true);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-10 sm:px-6 lg:px-8">
      <Link to="/courses" className="inline-flex text-sm font-medium text-[#ff6b63] transition hover:text-[#ff3b30]">← Back to courses</Link>

      <section className="grid gap-6 rounded-3xl border border-white/15 bg-gradient-to-r from-[#111827]/80 to-[#1f2937]/70 p-5 shadow-[0_20px_50px_rgba(8,12,28,0.4)] sm:p-8 lg:grid-cols-[1.3fr_380px]">
        <div>
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#ff9c95]">{course.level}</span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{course.title}</h1>
          <p className="mt-3 text-foreground/80">{course.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-foreground/70">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1"><Clock3 className="h-4 w-4" /> {course.duration}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1"><PlayCircle className="h-4 w-4" /> {course.total_lessons} lessons</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1"><GraduationCap className="h-4 w-4" /> Academy Program</span>
          </div>
        </div>

        <aside className="self-start rounded-2xl border border-white/15 bg-black/30 p-4 shadow-[0_16px_32px_rgba(2,6,23,0.35)]">
          <img src={course.thumbnail} alt={course.title} className="h-44 w-full rounded-xl object-cover" />
          <p className="mt-4 text-3xl font-bold text-[#ff9f98]">{course.price}</p>
          <button type="button" className="mt-3 w-full rounded-xl bg-gradient-to-r from-[#ff564c] to-[#ff3b30] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,59,48,0.38)]">Enroll Now</button>
        </aside>
      </section>

      <section className={`grid gap-5 ${isVideoLayout ? "lg:grid-cols-[1.3fr_380px]" : ""}`}>
        <div className="space-y-6">
          {isVideoLayout ? <LessonPlayer lesson={activeLesson} /> : null}

          {!isVideoLayout ? (
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <h2 className="text-2xl font-semibold">Course Curriculum</h2>
              <p className="mt-2 text-sm text-foreground/70">Preview lessons are free to access. Locked lessons require enrollment.</p>
              <div className="mt-4">
                <CurriculumSidebar
                  modules={modules}
                  currentLessonId={activeLesson?.id}
                  onLessonSelect={handleLessonSelect}
                  onLockedLessonClick={handleLockedLessonClick}
                />
              </div>
            </div>
          ) : null}

          <WhatYouLearn items={course.learn_items} />

          <section className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">About This Course</h2>
            <div className="mt-4 space-y-3 text-sm text-foreground/80 sm:text-base">
              {course.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <InstructorSection instructor={instructor} />

          <section className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Requirements</h2>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              {course.requirements.map((item) => (
                <li key={item} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#ff3b30]" />{item}</li>
              ))}
            </ul>
          </section>

          <RelatedCourses courses={relatedCourses} />
        </div>

        {isVideoLayout ? (
          <>
            <div className="hidden lg:block">
              <div className="sticky top-20">
                <CurriculumSidebar
                  modules={modules}
                  currentLessonId={activeLesson?.id}
                  onLessonSelect={handleLessonSelect}
                  onLockedLessonClick={handleLockedLessonClick}
                  showEnrollAction
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpenMobileSidebar(true)}
              className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#ff3b30] px-4 py-2 text-sm font-semibold text-white shadow-lg lg:hidden"
            >
              <Menu className="h-4 w-4" /> Curriculum
            </button>
          </>
        ) : null}
      </section>

      {openMobileSidebar ? (
        <div className="fixed inset-0 z-50 bg-black/60 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-hidden border-l border-white/10 bg-[#0b1220] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Course Curriculum</h3>
              <button type="button" onClick={() => setOpenMobileSidebar(false)}><X className="h-5 w-5" /></button>
            </div>
            <CurriculumSidebar
              modules={modules}
              currentLessonId={activeLesson?.id}
              onLessonSelect={handleLessonSelect}
              onLockedLessonClick={handleLockedLessonClick}
              showEnrollAction
            />
          </div>
        </div>
      ) : null}

      {showLockedModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0f172a] p-6 text-center shadow-2xl">
            <h3 className="text-xl font-semibold">This lesson is locked</h3>
            <p className="mt-2 text-sm text-foreground/70">Enroll now to unlock the full curriculum and watch all premium lessons.</p>
            <div className="mt-5 flex justify-center gap-3">
              <button type="button" onClick={() => setShowLockedModal(false)} className="rounded-xl border border-white/20 px-4 py-2 text-sm">Maybe later</button>
              <button type="button" className="rounded-xl bg-gradient-to-r from-[#ff564c] to-[#ff3b30] px-4 py-2 text-sm font-semibold text-white">Enroll Now</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
