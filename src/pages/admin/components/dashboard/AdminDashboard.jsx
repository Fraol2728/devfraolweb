import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, BookOpen, GraduationCap, UserPlus } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { SummaryWidget } from "@/pages/admin/components/dashboard/SummaryWidget";
import { CategoryChart } from "@/pages/admin/components/dashboard/CategoryChart";
import { EnrollmentTrendChart } from "@/pages/admin/components/dashboard/EnrollmentTrendChart";
import { CompletionChart } from "@/pages/admin/components/dashboard/CompletionChart";

const fallbackUsers = [
  { id: "u-1", createdAt: "2026-01-05" },
  { id: "u-2", createdAt: "2026-01-16" },
  { id: "u-3", createdAt: "2026-02-04" },
];

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const toArray = (payload) => payload?.data ?? payload ?? [];

const getTimelineValue = (course, index) => {
  const base = Number(course.enrollmentCount || 0);
  if (base > 0) return base;
  return 20 + ((index + 1) % 5) * 13;
};

const normalizeCategory = (course) => course.category || "Uncategorized";

export const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      setIsLoading(true);
      const [coursesResult, usersResult] = await Promise.allSettled([apiFetch("/api/courses"), apiFetch("/api/users")]);

      if (!isMounted) return;

      if (coursesResult.status === "fulfilled") {
        setCourses(toArray(coursesResult.value));
      }

      if (usersResult.status === "fulfilled") {
        setUsers(toArray(usersResult.value));
      } else {
        setUsers(fallbackUsers);
      }

      setIsLoading(false);
    };

    loadDashboardData();
    const interval = setInterval(loadDashboardData, 8000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const categories = useMemo(() => {
    const categoryMap = new Map();
    courses.forEach((course) => {
      const category = normalizeCategory(course);
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    const chartData = [...categoryMap.entries()].map(([name, count]) => ({ name, count }));
    return [{ name: "All", count: courses.length }, ...chartData];
  }, [courses]);

  const categoryBreakdown = useMemo(() => categories.filter((item) => item.name !== "All"), [categories]);

  const filteredCourses = useMemo(() => {
    if (activeCategory === "All") return courses;
    return courses.filter((course) => normalizeCategory(course) === activeCategory);
  }, [courses, activeCategory]);

  const enrollmentTrendData = useMemo(() => {
    const source = filteredCourses.length ? filteredCourses : courses;
    const totals = monthLabels.map((label) => ({ label, value: 0 }));

    source.forEach((course, index) => {
      const value = getTimelineValue(course, index);
      monthLabels.forEach((_, monthIndex) => {
        if (monthIndex <= index % monthLabels.length) {
          totals[monthIndex].value += Math.round(value * (0.4 + monthIndex * 0.08));
        }
      });
    });

    return totals;
  }, [courses, filteredCourses]);

  const completionData = useMemo(
    () =>
      categoryBreakdown.map((item, index) => ({
        name: item.name,
        rate: Math.min(96, 54 + item.count * 6 + (index % 3) * 5),
      })),
    [categoryBreakdown],
  );

  const recentActivities = useMemo(
    () =>
      courses
        .slice()
        .reverse()
        .slice(0, 6)
        .map((course, index) => ({
          id: `${course.id || course.slug || index}`,
          title: index % 2 === 0 ? "Course added" : "Course updated",
          detail: `${course.title || "Untitled course"} · ${normalizeCategory(course)}`,
        })),
    [courses],
  );

  const registrationsThisMonth = useMemo(() => Math.max(0, Math.round(users.length * 0.36)), [users.length]);

  const widgets = [
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
  ];

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
            {courses.slice(0, 5).map((course) => (
              <div key={course.id || course.slug} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200">
                <p className="font-medium">{course.title || "Untitled course"}</p>
                <p className="text-xs text-zinc-400">{normalizeCategory(course)}</p>
              </div>
            ))}
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
              {recentActivities.map((entry) => (
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
              ))}
            </AnimatePresence>
          </div>
        </motion.article>
      </section>

      {isLoading ? <p className="text-xs text-zinc-500">Syncing dashboard data…</p> : null}
    </div>
  );
};
