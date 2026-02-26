import { motion } from "framer-motion";

export const CompletionChart = ({ data = [] }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: 0.22 }}
    className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-2xl"
  >
    <h3 className="text-base font-semibold text-white">Completion Rates</h3>
    <p className="mt-1 text-xs text-zinc-400">Completion health by category</p>

    {data.length ? (
      <div className="mt-5 space-y-3">
        {data.map((item, index) => (
          <div key={item.name}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-zinc-200">{item.name}</span>
              <span className="font-medium text-zinc-300">{item.rate}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                key={`${item.name}-${item.rate}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.rate}%` }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF3B30] to-[#FF7C73]"
                title={`${item.name} completion: ${item.rate}%`}
              />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="mt-6 rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-8 text-center text-sm text-zinc-400">No completion data available.</p>
    )}
  </motion.article>
);
