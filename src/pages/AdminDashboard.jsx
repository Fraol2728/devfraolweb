import { motion } from "framer-motion";

const stats = {
  apps: 7,
  users: 124,
  categories: 5,
  websites: 86,
};

const statCards = [
  { label: "Total Apps", value: stats.apps },
  { label: "Total Users", value: stats.users },
  { label: "Total Categories", value: stats.categories },
  { label: "Total Websites", value: stats.websites },
];

const activities = [
  "New user registered",
  "YouTube Downloader updated",
  "New website added to Download category",
  "Admin settings modified",
];

const actions = ["Add New App", "Add Website", "Manage Users"];

export const AdminDashboard = ({ activeSection }) => {
  return (
    <div className="space-y-6">
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card, index) => (
            <motion.article
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 backdrop-blur-2xl transition hover:border-[#FF3B30]/45 hover:shadow-[0_0_24px_rgba(255,59,48,0.28)]"
            >
              <p className="text-sm text-zinc-400">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-2xl"
        >
          <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200 transition hover:border-[#FF3B30]/45 hover:bg-[#FF3B30]/10"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-2xl"
        >
          <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
              <motion.button
                key={action}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border border-[#FF3B30]/50 bg-[#FF3B30]/15 px-4 py-2 text-sm font-medium text-[#FF7C73] transition hover:bg-[#FF3B30]/25 hover:text-white hover:shadow-[0_0_18px_rgba(255,59,48,0.36)]"
              >
                {action}
              </motion.button>
            ))}
          </div>

          {activeSection !== "dashboard" && (
            <p className="mt-5 text-sm text-zinc-400">
              Preview mode for <span className="text-[#FF3B30]">{activeSection}</span> is ready for backend integration.
            </p>
          )}
        </motion.article>
      </section>
    </div>
  );
};
