export const ProgressBar = ({ progress = 0 }) => (
  <div className="sticky top-0 z-30 border-b border-[#232326] bg-[#151518] px-6 py-2 sm:px-10" aria-label="Lesson reading progress">
    <progress
      className="h-1 w-full overflow-hidden rounded-none [&::-moz-progress-bar]:bg-[#E10600] [&::-webkit-progress-bar]:bg-[#232326] [&::-webkit-progress-value]:bg-[#E10600]"
      max="100"
      value={Math.min(100, Math.max(0, progress))}
    >
      {progress}%
    </progress>
  </div>
);
