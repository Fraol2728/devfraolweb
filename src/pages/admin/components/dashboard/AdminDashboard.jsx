import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, BookOpen, GraduationCap, UserPlus } from "lucide-react";
import { SummaryWidget } from "@/pages/admin/components/dashboard/SummaryWidget";
import { CategoryChart } from "@/pages/admin/components/dashboard/CategoryChart";
import { EnrollmentTrendChart } from "@/pages/admin/components/dashboard/EnrollmentTrendChart";
import { CompletionChart } from "@/pages/admin/components/dashboard/CompletionChart";
import { useDashboardData } from "@/pages/admin/hooks/useDashboardData";

const normalizeCategory = (course) => course.category || "Uncategorized";

export const AdminDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const {
    courses,
    users,
    categories,
    categoryBreakdown,
    enrollmentTrendData,
    completionData,
    recentCourses,
    recentActivities,
    registrationsThisMonth,
    isLoading,
  } = useDashboardData(activeCategory);

  const widgets = useMemo(
    () => [
      {
        title: "Total Courses",
        value: courses.length,
        subtitle: `${categoryBreakdown.length} categories tracked`,
        icon: BookOpen,
        gradientFrom: "from-[#FF3B30]/30",
        gradientTo: "to-[#FF3B30]/5",
      },
      {
        title: "Total Students",
        value: users.length,
        subtitle: "Active learner accounts",
        icon: GraduationCap,
        gradientFrom: "from-indigo-500/35",
        gradientTo: "to-indigo-500/5",
      },
      {
        title: "Recent Activity",
        value: recentActivities.length,
        subtitle: "Latest CRUD actions",
        icon: Activity,
        gradientFrom: "from-amber-500/35",
        gradientTo: "to-amber-500/5",
      },
      {
        title: "New Registrations",
        value: registrationsThisMonth,
        subtitle: "Estimated this month",
        icon: UserPlus,
        gradientFrom: "from-emerald-500/35",
        gradientTo: "to-emerald-500/5",
      },
    ],
    [categoryBreakdown.length, courses.length, recentActivities.length, registrationsThisMonth, users.length],
  );

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {widgets.map((widget, index) => (
          <SummaryWidget key={widget.title} delay={index * 0.07} {...widget} />
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Graphs & Analytics</h2>
            <p className="text-xs text-zinc-400">Interactive analytics for admin insights</p>
          </div>
          <select
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            className="rounded-xl border border-white/15 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-200 outline-none transition hover:border-[#FF3B30]/40"
          >
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <motion.div layout className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <CategoryChart data={categoryBreakdown} />
          <EnrollmentTrendChart data={enrollmentTrendData} />
          <CompletionChart data={completionData} />
        </motion.div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.26 }}
          className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-2xl"
        >
          <h3 className="text-base font-semibold text-white">Recent Courses</h3>
          <div className="mt-4 space-y-2.5">
            {recentCourses.length ? (
              recentCourses.map((course) => (
                <div key={course.id || course.slug} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200">
                  <p className="font-medium">{course.title || "Untitled course"}</p>
                  <p className="text-xs text-zinc-400">{normalizeCategory(course)}</p>
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-8 text-center text-sm text-zinc-400">No courses available.</p>
            )}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32 }}
          className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-2xl"
        >
          <h3 className="text-base font-semibold text-white">Recent Activities</h3>
          <div className="mt-4 space-y-2.5">
            <AnimatePresence mode="popLayout">
              {recentActivities.length ? (
                recentActivities.map((entry) => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <p className="text-sm font-medium text-zinc-100">{entry.title}</p>
                    <p className="text-xs text-zinc-400">{entry.detail}</p>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-8 text-center text-sm text-zinc-400"
                >
                  No recent activity yet.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.article>
      </section>

      {isLoading ? <p className="text-xs text-zinc-500">Syncing dashboard data…</p> : null}
    </div>
  );
};
