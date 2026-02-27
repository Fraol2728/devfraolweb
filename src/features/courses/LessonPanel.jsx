import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LessonRenderer } from "@/features/courses/LessonRenderer";

export const LessonPanel = ({ lesson, isMobileOpen, onCloseMobile }) => {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    desktopRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    mobileRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [lesson?.id]);

  const content = lesson ? (
    <motion.article key={lesson.id} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-6">
      <header className="sticky top-0 z-10 -mx-6 mb-6 border-b border-white/10 bg-white/95 px-6 py-4 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">Lesson</p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900">{lesson.title}</h3>
        <p className="mt-2 text-gray-700 leading-relaxed">{lesson.definition}</p>
      </header>

      <div className="space-y-2 text-left">
        {lesson.content?.map((block, index) => (
          <LessonRenderer key={`${lesson.id}-${index}`} block={block} />
        ))}
      </div>
    </motion.article>
  ) : (
    <div className="flex h-full min-h-[360px] items-center justify-center p-8 text-gray-400">Pick a lesson to start learning.</div>
  );

  return (
    <>
      <section
        ref={desktopRef}
        className="hidden max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-white/10 bg-white/95 shadow-xl lg:sticky lg:top-24 lg:block"
      >
        {content}
      </section>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-black/70"
              aria-label="close lesson panel"
            />
            <motion.section
              ref={mobileRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed inset-0 z-50 overflow-y-auto bg-white lg:hidden"
            >
              <div className="sticky top-0 z-20 flex justify-end border-b border-white/10 bg-white/95 p-4">
                <button type="button" onClick={onCloseMobile} className="rounded-full border border-white/20 p-2 text-slate-900">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {content}
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
