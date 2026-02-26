import { motion } from "framer-motion";

export const EnrollmentTrendChart = ({ data = [] }) => {
  const width = 460;
  const height = 200;
  const padding = 22;
  const maxY = Math.max(...data.map((point) => point.value), 1);

  const points = data.map((point, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y = height - padding - (point.value / maxY) * (height - padding * 2);
    return { ...point, x, y };
  });

  const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.16 }}
      className="rounded-2xl border border-white/10 bg-zinc-900/65 p-5 backdrop-blur-2xl"
    >
      <h3 className="text-base font-semibold text-white">Enrollment Trends</h3>
      <p className="mt-1 text-xs text-zinc-400">Estimated enrollments by month</p>

      <div className="mt-5 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-52 min-w-[430px] w-full">
          {[0, 1, 2, 3].map((tick) => {
            const y = padding + (tick * (height - padding * 2)) / 3;
            return <line key={tick} x1={padding} y1={y} x2={width - padding} y2={y} className="stroke-white/10" strokeDasharray="4 6" />;
          })}

          <motion.path
            d={pathData}
            fill="none"
            stroke="#FF3B30"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.7 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          {points.map((point, index) => (
            <motion.g key={point.label} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + index * 0.06 }}>
              <circle cx={point.x} cy={point.y} r="4" fill="#FF7C73" />
              <text x={point.x} y={height - 6} textAnchor="middle" className="fill-zinc-400 text-[10px]">
                {point.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
    </motion.article>
  );
};
