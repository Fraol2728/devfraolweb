import { motion } from "framer-motion";

const palette = ["#FF3B30", "#FF7C73", "#F59E0B", "#A855F7", "#22C55E", "#06B6D4"];

export const CategoryChart = ({ data = [] }) => {
  const maxCount = Math.max(...data.map((item) => item.count), 1);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-2xl"
    >
      <h3 className="text-base font-semibold text-white">Course Distribution by Category</h3>
      <p className="mt-1 text-xs text-zinc-400">Category performance snapshot</p>

      {data.length ? (
        <>
          <div className="mt-5 space-y-3">
            {data.map((item, index) => {
              const width = `${Math.max(8, Math.round((item.count / maxCount) * 100))}%`;
              const color = palette[index % palette.length];

              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-200">{item.name}</span>
                    <span className="text-zinc-400">{item.count} courses</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10">
                    <motion.div
                      key={`${item.name}-${item.count}`}
                      initial={{ width: 0 }}
                      animate={{ width }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      title={`${item.name}: ${item.count} courses`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-zinc-300">
            {data.map((item, index) => (
              <span key={`${item.name}-legend`} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1" title={`${item.name}: ${item.count}`}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                {item.name}
              </span>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-6 rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-8 text-center text-sm text-zinc-400">No category data available.</p>
      )}
    </motion.article>
  );
};
