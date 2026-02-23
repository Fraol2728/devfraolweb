import { motion } from "framer-motion";
import { Award, BookOpenText, Clock3, Layers3, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { OutcomeCard } from "@/features/courses/OutcomeCard";
import { ModuleAccordion } from "@/features/courses/ModuleAccordion";
import { TestimonialCarousel } from "@/features/courses/TestimonialCarousel";
import { testimonials as globalTestimonials } from "@/data/testimonials";

const badgeConfig = [
  { key: "category", icon: Layers3, label: "Category" },
  { key: "level", icon: Award, label: "Level" },
  { key: "duration", icon: Clock3, label: "Duration" },
];

export const CourseDetail = ({ course }) => {
  const modules = course.modules ?? course.curriculum ?? [];
  const categoryToken = (course.category ?? "").toLowerCase().split(" ")[0];
  const courseTestimonials =
    course.testimonials ??
    globalTestimonials
      .filter((item) => {
        const target = `${item.course ?? ""} ${item.review ?? ""}`.toLowerCase();
        return categoryToken ? target.includes(categoryToken) : true;
      })
      .slice(0, 4)
      .map((item) => ({
        name: item.name,
        quote: item.review,
        avatar: item.avatar,
        role: item.course,
      }));

  const fallbackTestimonials = globalTestimonials.slice(0, 3).map((item) => ({
    name: item.name,
    quote: item.review,
    avatar: item.avatar,
    role: item.course,
  }));

  const testimonialsToRender = courseTestimonials.length ? courseTestimonials : fallbackTestimonials;

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-black via-gray-900 to-red-950 p-6 shadow-xl transition-colors duration-300 dark:border-gray-800"
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FF3B30]/20 blur-3xl" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200">Dev Fraol Academy</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">{course.title}</h1>

          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }} className="mt-6 flex flex-wrap gap-3">
            {badgeConfig.map(({ key, icon: Icon, label }) => (
              <motion.span
                key={key}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm text-white"
              >
                <Icon className="h-4 w-4 text-[#FF3B30]" aria-hidden="true" />
                <span className="font-medium">{label}:</span>
                {course[key]}
              </motion.span>
            ))}
          </motion.div>

          <Link to="/contact" className="mt-7 inline-flex rounded-lg bg-[#FF3B30] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_24px_rgba(255,59,48,0.48)]">
            Enroll Now
          </Link>
        </motion.header>

        <section className="rounded-2xl border border-gray-200 bg-white/70 p-5 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60">
          <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">Course Overview</h2>
          <p className="mt-3 text-gray-700 transition-colors duration-300 dark:text-gray-300">{course.overview ?? course.description}</p>
          <div className="mt-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#FF3B30]"><BookOpenText className="h-5 w-5" aria-hidden="true" />You will learn</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {(course.keySkills ?? []).map((skill) => (
                <li key={skill} className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors duration-300 dark:border-gray-700 dark:text-gray-300">{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">Learning Outcomes</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(course.outcomes ?? []).map((outcome, index) => <OutcomeCard key={outcome} outcome={outcome} index={index} />)}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">Curriculum Modules</h2>
            <span className="rounded-full border border-[#FF3B30]/35 bg-[#FF3B30]/10 px-3 py-1 text-xs font-medium text-[#FF3B30]">Progress tracking: Pro Mode soon</span>
          </div>
          <div className="space-y-3">
            {modules.map((module, index) => <ModuleAccordion key={module.module} module={module} index={index} />)}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white/70 p-5 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white"><Wrench className="h-5 w-5 text-[#FF3B30]" aria-hidden="true" />Requirements</h2>
          <ul className="mt-4 space-y-2">
            {(course.requirements ?? []).map((requirement) => (
              <li key={requirement} className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors duration-300 dark:border-gray-700 dark:text-gray-300">
                {requirement}
              </li>
            ))}
          </ul>
        </section>

        <TestimonialCarousel testimonials={testimonialsToRender} />

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="rounded-2xl border border-[#FF3B30]/30 bg-gradient-to-r from-red-900/30 to-black/60 p-5 text-center"
        >
          <h2 className="text-2xl font-extrabold text-white">Ready to start this course?</h2>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-5">
            <Link to="/contact" className="inline-flex w-full justify-center rounded-xl border border-[#FF3B30]/50 bg-[#FF3B30]/90 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#FF3B30] hover:shadow-[0_0_24px_rgba(255,59,48,0.5)] sm:w-auto">
              Enroll Now
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
};
