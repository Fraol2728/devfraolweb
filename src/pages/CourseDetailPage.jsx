import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { courses } from "@/data/courses";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const CourseDetailPage = () => {
  const { courseId } = useParams();
  const course = useMemo(() => courses.find((item) => item.id === courseId), [courseId]);
  const [activeSection, setActiveSection] = useState(0);

  useSeoMeta(
    course
      ? {
          title: `${course.title} | Dev Fraol Academy Courses`,
          description: course.description,
        }
      : {
          title: "Course not found | Dev Fraol Academy",
          description: "The requested course is unavailable.",
        },
  );

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 pb-8 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Link to="/courses" className="text-sm font-medium text-[#ff6b63] transition hover:text-[#ff3b30]">
          ← Back to courses
        </Link>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel overflow-hidden rounded-3xl border border-white/20"
      >
        <img src={course.thumbnail} alt={course.title} className="h-64 w-full object-cover sm:h-72" />
        <div className="space-y-4 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/70">
            <span className="rounded-full border border-white/20 px-2 py-1">{course.category}</span>
            <span className="rounded-full border border-white/20 px-2 py-1">{course.level}</span>
            <span>{course.duration}</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">{course.title}</h1>
          <p className="text-sm text-foreground/75 sm:text-base">Instructor: {course.instructor}</p>
          <p className="max-w-3xl text-sm text-foreground/80 sm:text-base">{course.description}</p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-xl bg-gradient-to-r from-[#ff564c] to-[#ff3b30] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,48,0.35)]"
          >
            Enroll Now
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="glass-panel rounded-2xl border border-white/15 p-5 sm:p-6"
      >
        <h2 className="text-2xl font-semibold">Syllabus</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {course.syllabus.map((section, index) => {
            const selected = index === activeSection;
            return (
              <motion.button
                key={section.title}
                type="button"
                onClick={() => setActiveSection(index)}
                whileTap={{ scale: 0.96 }}
                className={`relative rounded-full px-4 py-2 text-sm font-medium ${selected ? "text-white" : "text-foreground/70"}`}
              >
                {selected ? (
                  <motion.span
                    layoutId="active-syllabus-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#ff564c] to-[#ff3b30]"
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  />
                ) : null}
                {section.title}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={course.syllabus[activeSection].title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-lg font-semibold">{course.syllabus[activeSection].title}</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75">
            {course.syllabus[activeSection].topics.map((topic) => (
              <li key={topic} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff3b30]" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.section>
    </div>
  );
};
