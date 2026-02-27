import { Layers3 } from "lucide-react";
import { ModuleAccordion } from "@/components/ui/ModuleAccordion";

export const CourseOutline = ({ modules, openModuleId, onToggleModule, activeLessonId, onSelectLesson }) => {
  const expandedCount = modules.filter((module) => module.id === openModuleId).length;

  return (
    <section className="rounded-3xl border border-white/15 bg-background/70 p-5 shadow-[0_18px_45px_rgba(15,20,35,0.28)] backdrop-blur-xl sm:p-7">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#ff8f87]">Course Outline</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">Course Outline</h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70 sm:text-base">
            Select a lesson to open the reading panel without leaving this page.
          </p>
        </div>

        <aside className="rounded-2xl border border-white/15 bg-black/15 p-4 lg:min-w-[220px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-foreground/80">
            <Layers3 className="h-3.5 w-3.5" />
            {modules.length} modules
          </div>
          <p className="mt-3 text-sm text-foreground/70">Click any lesson to slide in a structured lesson reading panel.</p>
          <p className="mt-1 text-xs text-foreground/55">Expanded now: {expandedCount ? 1 : 0}</p>
        </aside>
      </div>

      <div className="space-y-3">
        {modules.map((module) => (
          <ModuleAccordion
            key={module.id}
            module={module}
            isOpen={module.id === openModuleId}
            onToggle={() => onToggleModule(module.id === openModuleId ? null : module.id)}
            activeLessonId={activeLessonId}
            onLessonSelect={onSelectLesson}
          />
        ))}
      </div>
    </section>
  );
};
