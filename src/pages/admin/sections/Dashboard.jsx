import { motion } from "framer-motion";

const mockStats = {
  apps: 7,
  users: 124,
  courses: 12,
  blogs: 6,
};

const statCards = [
  { label: "Total Apps", value: mockStats.apps },
  { label: "Total Users", value: mockStats.users },
  { label: "Total Courses", value: mockStats.courses },
  { label: "Total Blogs", value: mockStats.blogs },
];

const recentActivity = [
  { id: 1, action: "New course draft created: React Mastery" },
  { id: 2, action: "User role updated to Instructor" },
  { id: 3, action: "App status changed: Background Remover" },
  { id: 4, action: "Blog post published: Learn Tailwind v4" },
];

export const Dashboard = () => (
  <div className="space-y-6">
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card, index) => (
        <motion.article
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
          whileHover={{ y: -3, scale: 1.02 }}
          className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 backdrop-blur-xl transition hover:border-[#FF3B30]/55 hover:shadow-[0_0_24px_rgba(255,59,48,0.3)]"
        >
          <p className="text-sm text-zinc-400">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
        </motion.article>
      ))}
    </section>

    <section className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-xl">
      <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
      <div className="space-y-3">
        {recentActivity.map((entry) => (
          <div
            key={entry.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200 transition hover:border-[#FF3B30]/40 hover:bg-[#FF3B30]/10"
          >
            {entry.action}
          </div>
        ))}
      </div>
    </section>
  </div>
);
