import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Download, Play, Plus, RotateCcw } from "lucide-react";
import { EditorPane } from "@/features/code-editor/EditorPane";
import { PreviewPane, buildPreviewDocument } from "@/features/code-editor/PreviewPane";
import { TabBar } from "@/features/code-editor/TabBar";
import { starterExamples } from "@/data/examples";

const STORAGE_KEY = "devfraol-editor-projects-v1";
const DEFAULT_SPLIT = 52;

const copyToClipboard = async (content) => {
  await navigator.clipboard.writeText(content);
};

const downloadFile = (filename, content) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

export const CodeEditor = () => {
  const [projects, setProjects] = useState(starterExamples);
  const [activeProjectId, setActiveProjectId] = useState(starterExamples[0].id);
  const [activeTab, setActiveTab] = useState("html");
  const [previewDoc, setPreviewDoc] = useState("");
  const [split, setSplit] = useState(DEFAULT_SPLIT);
  const [isDragging, setIsDragging] = useState(false);
  const [editorTheme, setEditorTheme] = useState("dark");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.projects) && parsed.projects.length > 0) {
        setProjects(parsed.projects);
        setActiveProjectId(parsed.activeProjectId || parsed.projects[0].id);
        setEditorTheme(parsed.editorTheme || "dark");
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        projects,
        activeProjectId,
        editorTheme,
      })
    );
  }, [projects, activeProjectId, editorTheme]);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) || projects[0],
    [projects, activeProjectId]
  );

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    setPreviewDoc(buildPreviewDocument(activeProject.files));
  }, [activeProject]);

  useEffect(() => {
    const onPointerMove = (event) => {
      if (!isDragging) {
        return;
      }

      const percentage = Math.min(70, Math.max(30, (event.clientX / window.innerWidth) * 100));
      setSplit(percentage);
    };

    const onPointerUp = () => setIsDragging(false);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging]);

  const updateCode = (code) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeProject.id
          ? {
              ...project,
              files: {
                ...project.files,
                [activeTab]: code,
              },
            }
          : project
      )
    );
  };

  const refreshPreview = () => setPreviewDoc(buildPreviewDocument(activeProject.files));

  const addProject = () => {
    const id = `custom-${Date.now()}`;
    const newProject = {
      id,
      name: `Snippet ${projects.length + 1}`,
      files: {
        html: "<main>\n  <h1>New Project</h1>\n</main>",
        css: "body {\n  margin: 0;\n  font-family: Inter, sans-serif;\n}",
        js: "console.log('Start coding!');",
      },
    };

    setProjects((prev) => [...prev, newProject]);
    setActiveProjectId(id);
  };

  const isDarkMode = editorTheme === "dark";

  return (
    <section className="mx-auto w-[min(96%,1300px)] space-y-4 pb-36">
      <div className="rounded-2xl border border-[#FF3B30]/30 bg-black/50 p-4 shadow-[0_20px_50px_rgba(255,59,48,0.12)] backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Code Editor</h1>
            <p className="text-sm text-white/60">Write HTML, CSS, and JavaScript with instant preview.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEditorTheme(isDarkMode ? "light" : "dark")}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:border-[#FF3B30]/60"
            >
              Theme: {isDarkMode ? "Dark" : "Light"}
            </button>
            <button
              type="button"
              onClick={addProject}
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF3B30] px-3 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              <Plus className="h-4 w-4" /> New Snippet
            </button>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {projects.map((project) => {
            const active = project.id === activeProject.id;
            return (
              <motion.button
                key={project.id}
                type="button"
                whileHover={{ y: -1 }}
                className={`rounded-lg border px-3 py-1.5 text-xs md:text-sm ${
                  active ? "border-[#FF3B30] bg-[#FF3B30]/15 text-white" : "border-white/10 bg-white/5 text-white/60"
                }`}
                onClick={() => setActiveProjectId(project.id)}
              >
                {project.name}
              </motion.button>
            );
          })}
        </div>

        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-3 flex flex-wrap gap-2">
          <motion.button whileHover={{ scale: 1.02 }} type="button" onClick={refreshPreview} className="inline-flex items-center gap-2 rounded-lg border border-[#FF3B30]/50 bg-[#FF3B30]/15 px-3 py-2 text-sm text-white">
            <Play className="h-4 w-4" /> Run
          </motion.button>
          <button type="button" onClick={refreshPreview} className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80">
            <RotateCcw className="h-4 w-4" /> Refresh
          </button>
          <button type="button" onClick={() => copyToClipboard(activeProject.files[activeTab])} className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80">
            <Copy className="h-4 w-4" /> Copy
          </button>
          <button
            type="button"
            onClick={() => downloadFile(`${activeProject.name}-${activeTab}.${activeTab === "js" ? "js" : activeTab}`, activeProject.files[activeTab])}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80"
          >
            <Download className="h-4 w-4" /> Download
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id + activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-3 lg:flex-row"
        >
          <motion.div animate={{ width: `${split}%` }} transition={{ type: "spring", stiffness: 130, damping: 22 }} className="w-full lg:w-auto">
            <EditorPane value={activeProject.files[activeTab]} language={activeTab} onChange={updateCode} isDarkMode={isDarkMode} />
          </motion.div>

          <div
            role="separator"
            aria-label="Resize panes"
            onPointerDown={() => setIsDragging(true)}
            className="hidden w-2 cursor-col-resize rounded-full bg-[#FF3B30]/30 transition hover:bg-[#FF3B30]/80 lg:block"
          />

          <motion.div animate={{ width: `${100 - split}%` }} transition={{ type: "spring", stiffness: 130, damping: 22 }} className="w-full lg:w-auto">
            <PreviewPane srcDoc={previewDoc} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
