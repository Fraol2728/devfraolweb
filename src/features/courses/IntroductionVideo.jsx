import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export const IntroductionVideo = ({ videoId, tagline }) => {
  return (
    <section className="mt-10 text-center">
      <h2 className="text-2xl font-bold text-white">Course Introduction</h2>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="group relative mx-auto mt-5 aspect-video max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-slate-900"
      >
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Course introduction video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition group-hover:opacity-100">
          <PlayCircle className="h-16 w-16 text-white/90" />
        </div>
      </motion.div>
      <p className="mt-3 text-sm text-gray-300">{tagline}</p>
    </section>
  );
};
