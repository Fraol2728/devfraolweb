export const LessonPlayer = ({ lesson }) => {
  if (!lesson) {
    return (
      <div className="flex min-h-[340px] items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/20 text-sm text-foreground/70">
        Select a lesson to start learning.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_20px_45px_rgba(10,10,25,0.35)]">
        <div className="relative w-full overflow-hidden pt-[56.25%]">
          <iframe
            title={lesson.title}
            src={`https://www.youtube.com/embed/${lesson.youtube_video_id}?rel=0&modestbranding=1`}
            className="absolute left-0 top-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-foreground">{lesson.title}</h2>
        <p className="mt-1 text-sm text-foreground/65">Duration: {lesson.duration}</p>
      </div>
    </div>
  );
};
