import { X } from "lucide-react";
import { ModuleAccordion } from "@/features/learning/components/ModuleAccordion";

const ModulesList = ({ modules, openModuleIds, onToggleModule, activeLessonId, completedLessonIds, onSelectLesson }) => (
  <div className="space-y-3">
    {modules.map((module, index) => (
      <ModuleAccordion
        key={module.id}
        module={module}
        moduleIndex={index}
        isOpen={openModuleIds.includes(module.id)}
        onToggle={() => onToggleModule(module.id)}
        activeLessonId={activeLessonId}
        completedLessonIds={completedLessonIds}
        onSelectLesson={onSelectLesson}
      />
    ))}
  </div>
);

export const SidebarModules = ({
  modules,
  openModuleIds,
  onToggleModule,
  activeLessonId,
  completedLessonIds,
  onSelectLesson,
  isMobileOpen,
  onCloseMobile,
}) => (
  <>
    <aside className="hidden h-screen w-[320px] flex-col border-r border-[#232326] bg-[#111113] md:flex">
      <div className="border-b border-[#232326] px-4 py-4">
        <h1 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#A1A1AA]">Course Lessons</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <ModulesList
          modules={modules}
          openModuleIds={openModuleIds}
          onToggleModule={onToggleModule}
          activeLessonId={activeLessonId}
          completedLessonIds={completedLessonIds}
          onSelectLesson={onSelectLesson}
        />
      </div>
    </aside>

    <div className={`fixed inset-0 z-40 bg-black/60 transition-opacity md:hidden ${isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <aside
        className={`h-full w-[88vw] max-w-[330px] border-r border-[#232326] bg-[#111113] transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#232326] px-4 py-4">
          <h1 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#A1A1AA]">Course Lessons</h1>
          <button type="button" onClick={onCloseMobile} className="rounded-md p-2 text-[#A1A1AA] hover:bg-[#19191d] hover:text-white" aria-label="Close lessons panel">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="h-[calc(100%-65px)] overflow-y-auto px-3 py-3">
          <ModulesList
            modules={modules}
            openModuleIds={openModuleIds}
            onToggleModule={onToggleModule}
            activeLessonId={activeLessonId}
            completedLessonIds={completedLessonIds}
            onSelectLesson={(lessonId) => {
              onSelectLesson(lessonId);
              onCloseMobile();
            }}
          />
        </div>
      </aside>
    </div>
  </>
);
