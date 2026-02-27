import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const renderSection = (section, index) => {
  if (section.type === "paragraph") {
    return (
      <section key={index} className="space-y-2">
        <h4 className="text-lg font-semibold text-white">{section.heading}</h4>
        <p className="leading-7 text-white/75">{section.content}</p>
      </section>
    );
  }

  if (section.type === "list") {
    return (
      <section key={index} className="space-y-3">
        <h4 className="text-lg font-semibold text-white">{section.heading}</h4>
        <ul className="list-disc space-y-2 pl-5 text-white/75 marker:text-cyan-300">
          {section.items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    );
  }

  if (section.type === "tip") {
    return (
      <section key={index} className="rounded-2xl border border-cyan-200/20 bg-cyan-300/10 p-4 text-cyan-100">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200/80">Tip</p>
        <p className="mt-2 leading-7">{section.content}</p>
      </section>
    );
  }

  if (section.type === "code") {
    return (
      <section key={index} className="space-y-3">
        {section.heading ? <h4 className="text-lg font-semibold text-white">{section.heading}</h4> : null}
        <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0b1120] p-4 text-sm text-cyan-100">
          <code>{section.content}</code>
        </pre>
      </section>
    );
  }

  return null;
};

export const LessonPanel = ({ lesson, isMobileOpen, onCloseMobile }) => {
  const panelBody = lesson ? (
    <motion.div
      key={lesson.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      <header className="space-y-4">
        <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{lesson.title}</h3>
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 leading-7 text-white/70">{lesson.definition}</p>
      </header>

      {lesson.sections?.map((section, index) => renderSection(section, index))}
    </motion.div>
  ) : (
    <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-white/20 text-white/60">
      Select a lesson from the outline to view content.
    </div>
  );

  return (
    <>
      <section className="hidden rounded-3xl border border-white/15 bg-[#0f172a]/80 p-6 shadow-[0_20px_50px_rgba(3,8,18,0.45)] backdrop-blur-xl lg:block xl:p-8">
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
              className="fixed inset-0 z-50 overflow-y-auto bg-[#0b1220] p-5 lg:hidden"
            >
              <div className="mb-5 flex justify-end">
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
