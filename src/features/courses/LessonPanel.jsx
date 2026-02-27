import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LessonRenderer } from "@/features/courses/LessonRenderer";

export const LessonPanel = ({ lesson, isMobileOpen, onCloseMobile }) => {
  const panelBody = lesson ? (
    <AnimatePresence mode="wait">
      <motion.article
        key={lesson.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-left px-6 py-8"
      >
        <header className="mb-8 text-left">
          <h3 className="mb-4 text-3xl font-bold leading-tight text-white">{lesson.title}</h3>
          <p className="mb-8 border-l-4 border-cyan-300/60 pl-4 text-gray-300 leading-relaxed italic">{lesson.definition}</p>
        </header>

        <div className="text-left">
          {lesson.content?.map((block, index) => (
            <LessonRenderer key={`${lesson.id}-${block.type}-${index}`} block={block} />
          ))}
        </div>
      </motion.article>
    </AnimatePresence>
  ) : (
    <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-white/20 text-white/60">
      Select a lesson from the outline to view content.
    </div>
  );

  return (
    <>
      <section className="hidden max-h-[calc(100vh-12rem)] overflow-y-auto rounded-3xl border border-white/15 bg-[#0f172a]/80 shadow-[0_20px_50px_rgba(3,8,18,0.45)] backdrop-blur-xl lg:block">
        {panelBody}
      </section>

      <AnimatePresence>
        {isMobileOpen && lesson ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              aria-label="Close lesson content"
            />
            <motion.section
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed inset-0 z-50 overflow-y-auto bg-[#0b1220] lg:hidden"
            >
              <div className="sticky top-0 z-10 flex justify-end border-b border-white/10 bg-[#0b1220]/95 p-5 backdrop-blur">
                <button type="button" onClick={onCloseMobile} className="rounded-full border border-white/15 p-2 text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {panelBody}
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};
