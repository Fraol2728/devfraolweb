import { motion } from "framer-motion";
import { Clock3, PlayCircle } from "lucide-react";

export const LessonPlayer = ({ lesson, courseTitle }) => {
  if (!lesson) {
    return (
      <div className="rounded-3xl border border-white/15 bg-black/20 p-6 text-sm text-foreground/70">
        Choose a lesson to start learning.
      </div>
    );
  }

  return (
    <motion.section
      key={lesson.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="space-y-4"
    >
      <div className="overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_24px_50px_rgba(0,0,0,0.35)]">
        <div className="aspect-video w-full">
          <iframe
            title={`${courseTitle} - ${lesson.title}`}
            src={`https://www.youtube.com/embed/${lesson.youtube_video_id}?rel=0&modestbranding=1`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/15 bg-background/60 p-5 backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{lesson.title}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-foreground/70">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1">
            <PlayCircle className="h-4 w-4" />
            Lesson video
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1">
            <Clock3 className="h-4 w-4" />
            {lesson.duration}
          </span>
          <span className={`rounded-full px-3 py-1 ${lesson.is_preview ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
            {lesson.is_preview ? "Preview" : "Locked"}
          </span>
        </div>
      </div>
    </motion.section>
  );
};
