import { useMemo, useState } from "react";
import { ChevronDown, Lock } from "lucide-react";

export const CurriculumSidebar = ({ modules, currentLessonId, onLessonSelect, onLockedLessonClick, showEnrollAction = false }) => {
  const [openModules, setOpenModules] = useState(() => modules.map((module) => module.id));

  const lessonCount = useMemo(
    () => modules.reduce((sum, module) => sum + module.lessons.length, 0),
    [modules],
  );

  const toggleModule = (moduleId) => {
    setOpenModules((prev) => (prev.includes(moduleId) ? prev.filter((item) => item !== moduleId) : [...prev, moduleId]));
  };

  return (
    <aside className="rounded-2xl border border-white/15 bg-background/80 p-4 shadow-[0_16px_38px_rgba(10,10,25,0.28)] backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Curriculum</h3>
        <span className="text-xs text-foreground/60">{lessonCount} lessons</span>
      </div>

      <div className="max-h-[72vh] space-y-2 overflow-y-auto pr-1">
        {modules.map((module) => {
          const expanded = openModules.includes(module.id);
          return (
            <div key={module.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold"
              >
                <span>{module.title}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>

              <div className={`grid transition-all duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <ul className="min-h-0 space-y-1 overflow-hidden px-2 pb-2">
                  {module.lessons.map((lesson) => {
                    const locked = !lesson.is_preview;
                    const active = lesson.id === currentLessonId;
                    return (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          onClick={() => (locked ? onLockedLessonClick(lesson) : onLessonSelect(lesson))}
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition ${
                            active
                              ? "bg-[#ff3b30]/25 text-white ring-1 ring-[#ff3b30]/55"
                              : "text-foreground/80 hover:bg-white/10"
                          }`}
                        >
                          <span className="line-clamp-1">{lesson.title}</span>
                          <span className="ml-2 flex shrink-0 items-center gap-1 text-xs text-foreground/65">
                            {locked ? <Lock className="h-3.5 w-3.5" /> : <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px]">Preview</span>}
                            <span>{lesson.duration}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {showEnrollAction ? (
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#ff564c] to-[#ff3b30] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,59,48,0.36)]"
        >
          Enroll to Unlock Lessons
        </button>
      ) : null}
    </aside>
  );
};
