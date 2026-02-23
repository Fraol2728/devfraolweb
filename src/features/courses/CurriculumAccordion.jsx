import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ModuleItem } from "@/features/courses/ModuleItem";
import { useMockApi } from "@/context/MockApiContext";

const normalizeLesson = (lesson, index) => {
  if (typeof lesson === "string") {
    return { id: index + 1, title: lesson, duration: "10 min" };
  }

  return {
    id: lesson.id ?? index + 1,
    title: lesson.title,
    duration: lesson.duration ?? "10 min",
  };
};

const normalizeModule = (module, index) => ({
  id: module.id ?? index + 1,
  title: module.title ?? module.module ?? `Module ${index + 1}`,
  duration: module.duration ?? "45 min",
  lessons: (module.lessons ?? []).map(normalizeLesson),
});

export const CurriculumAccordion = ({ data = [], courseId = "default-course" }) => {
  const modules = useMemo(() => data.map(normalizeModule), [data]);
  const { expandedCourseModules, toggleCourseModule, toggleAllCourseModules } = useMockApi();
  const [openModules, setOpenModules] = useState(expandedCourseModules[courseId] ?? []);

  const totalLessons = useMemo(() => modules.reduce((sum, module) => sum + module.lessons.length, 0), [modules]);

  useEffect(() => {
    setOpenModules(expandedCourseModules[courseId] ?? []);
  }, [expandedCourseModules, courseId]);

  const toggleModule = (id) => {
    toggleCourseModule(courseId, id);
  };

  const allExpanded = modules.length > 0 && openModules.length === modules.length;

  const handleExpandToggle = () => {
    toggleAllCourseModules(courseId, modules.map((module) => module.id));
  };

  return (
    <section className="text-left">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Curriculum / Modules</h2>
          <p className="mt-1 text-sm text-gray-300">
            {modules.length} modules · {totalLessons} lessons
          </p>
        </div>

        <button
          type="button"
          onClick={handleExpandToggle}
          className="rounded-full border border-[#FF3B30]/50 bg-[#FF3B30]/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#FF6A61] transition-colors duration-300 hover:bg-[#FF3B30]/20"
        >
          {allExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="grid gap-4"
      >
        {modules.map((module) => (
          <motion.div key={module.id} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <ModuleItem module={module} isOpen={openModules.includes(module.id)} onToggle={() => toggleModule(module.id)} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
