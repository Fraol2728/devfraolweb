import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock3, Layers3 } from "lucide-react";

const moduleDescriptionTemplates = [
  "Build practical confidence as you apply this module's concepts through guided walkthroughs and exercises.",
  "Focus on core workflows and best practices that will help you ship cleaner, more reliable project outcomes.",
  "Develop hands-on understanding with realistic examples that connect foundational ideas to production work.",
  "Learn the key decisions, patterns, and implementation steps needed to move from theory into results.",
];

const lessonDurationPool = ["06 min", "08 min", "10 min", "12 min", "14 min", "16 min", "18 min"];
const moduleDurationPool = ["24 min", "30 min", "36 min", "42 min", "48 min", "55 min", "65 min"];

const toOutlineModules = (modules) => {
  if (!Array.isArray(modules) || modules.length === 0) return [];

  const targetCount = Math.min(15, Math.max(8, modules.length));

  return Array.from({ length: targetCount }, (_, index) => {
    const sourceModule = modules[index % modules.length];
    const sourceLessons = Array.isArray(sourceModule.lessons) ? sourceModule.lessons : [];
    const baseLessonCount = sourceLessons.length || 3;
    const lessonCount = Math.min(8, Math.max(3, baseLessonCount));

    const lessons = Array.from({ length: lessonCount }, (__unused, lessonIndex) => {
      const sourceLesson = sourceLessons[lessonIndex % Math.max(sourceLessons.length, 1)];
      return {
        id: `${sourceModule.id}-outline-lesson-${lessonIndex + 1}`,
        title:
          sourceLesson?.title ||
          `Lesson ${lessonIndex + 1}: ${sourceModule.title || "Core Topic"}`,
        duration: sourceLesson?.duration || lessonDurationPool[(index + lessonIndex) % lessonDurationPool.length],
      };
    });

    return {
      id: `${sourceModule.id}-outline-${index + 1}`,
      title: `Module ${index + 1}: ${sourceModule.title || "Learning Module"}`,
      description: moduleDescriptionTemplates[index % moduleDescriptionTemplates.length],
      duration: moduleDurationPool[index % moduleDurationPool.length],
      lessons,
    };
  });
};

export const CourseOutline = ({ modules, openModuleId, onToggleModule }) => {
  const outlineModules = useMemo(() => toOutlineModules(modules), [modules]);
  const expandedCount = outlineModules.filter((module) => module.id === openModuleId).length;

  return (
    <section className="rounded-3xl border border-white/15 bg-background/70 p-5 shadow-[0_18px_45px_rgba(15,20,35,0.28)] backdrop-blur-xl sm:p-7">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#ff8f87]">Course Outline</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">Course Outline</h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70 sm:text-base">
            See all modules and lessons included in this course.
          </p>
        </div>

        <aside className="rounded-2xl border border-white/15 bg-black/15 p-4 lg:sticky lg:top-20 lg:min-w-[220px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-foreground/80">
            <Layers3 className="h-3.5 w-3.5" />
            {outlineModules.length} modules
          </div>
          <p className="mt-3 text-sm text-foreground/70">Each module includes 3–8 focused lessons with guided flow.</p>
          <p className="mt-1 text-xs text-foreground/55">Expanded now: {expandedCount ? 1 : 0}</p>
        </aside>
      </div>

      <div className="space-y-3">
        {outlineModules.map((module) => {
          const isOpen = module.id === openModuleId;

          return (
            <article
              key={module.id}
              className={`rounded-2xl border transition ${
                isOpen
                  ? "border-[#ff6c63]/70 bg-[#ff6c63]/10"
                  : "border-white/10 bg-black/10"
              }`}
            >
              <button
                type="button"
                onClick={() => onToggleModule(isOpen ? null : module.id)}
                className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:px-5"
              >
                <div>
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">{module.title}</h3>
                  <p className="mt-1 text-sm text-foreground/70">{module.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs text-foreground/80">
                    <Clock3 className="h-3.5 w-3.5" /> {module.duration}
                  </div>
                </div>

                <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-foreground/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 px-4 pb-4 sm:px-5">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                        >
                          <span className="text-foreground/90">
                            {lessonIndex + 1}. {lesson.title}
                          </span>
                          <span className="text-xs text-foreground/65">{lesson.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
};
