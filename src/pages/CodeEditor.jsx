import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { EditorPane } from "@/features/code-editor/EditorPane";
import { PreviewPane, buildPreviewDocument } from "@/features/code-editor/PreviewPane";
import { TabBar } from "@/features/code-editor/TabBar";
import { Toolbar } from "@/features/code-editor/Toolbar";
import { createProjectFromCourse, getLanguageMeta, starterExamples, supportedLanguages } from "@/data/examples";

const STORAGE_KEY = "devfraol-editor-state-v2";
const DEFAULT_SPLIT = 54;

const copyToClipboard = async (content) => navigator.clipboard.writeText(content);

const downloadFile = (fileName, content) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
};

export const CodeEditor = () => {
  const editorActionsRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState(starterExamples);
  const [activeProjectId, setActiveProjectId] = useState(starterExamples[0].id);
  const [activeFileId, setActiveFileId] = useState(starterExamples[0].files[0].id);
  const [previewDoc, setPreviewDoc] = useState("");
  const [editorTheme, setEditorTheme] = useState("dark");
  const [split, setSplit] = useState(DEFAULT_SPLIT);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
        setProjects(parsed.projects);
        setActiveProjectId(parsed.activeProjectId || parsed.projects[0].id);
        setEditorTheme(parsed.editorTheme || "dark");
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects, activeProjectId, editorTheme }));
  }, [projects, activeProjectId, editorTheme]);

  useEffect(() => {
    const course = searchParams.get("course");
    if (!course) {
      return;
    }

    const courseProject = createProjectFromCourse(course);
    if (!courseProject) {
      return;
    }

    setProjects((prev) => {
      const existing = prev.find((project) => project.name.toLowerCase() === course.toLowerCase());
      if (existing) {
        setActiveProjectId(existing.id);
        setActiveFileId(existing.files[0]?.id || "");
        return prev;
      }

      return [courseProject, ...prev];
    });

    setActiveProjectId(courseProject.id);
    setActiveFileId(courseProject.files[0]?.id || "");
  }, [searchParams]);

  const activeProject = useMemo(() => projects.find((project) => project.id === activeProjectId) || projects[0], [projects, activeProjectId]);

  useEffect(() => {
    if (!activeProject?.files.find((file) => file.id === activeFileId)) {
      setActiveFileId(activeProject?.files[0]?.id || "");
    }
  }, [activeProject, activeFileId]);

  const activeFile = useMemo(() => {
    const file = activeProject?.files.find((item) => item.id === activeFileId) || activeProject?.files[0];
    if (!file) {
      return null;
    }

    return {
      ...file,
      monacoLanguage: getLanguageMeta(file.language).monaco,
    };
  }, [activeProject, activeFileId]);

  useEffect(() => {
    if (!activeProject || !activeFile) {
      return;
    }

    const timeout = setTimeout(() => {
      setPreviewDoc(buildPreviewDocument({ files: activeProject.files, activeLanguage: activeFile.language }));
    }, 180);

    return () => clearTimeout(timeout);
  }, [activeProject, activeFile]);

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
    if (!activeFile) {
      return;
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeProject.id
          ? {
              ...project,
              files: project.files.map((file) => (file.id === activeFile.id ? { ...file, content: code } : file)),
            }
          : project
      )
    );
  };

  const addProject = () => {
    const id = `project-${Date.now()}`;
    const newProject = {
      id,
      name: `Snippet ${projects.length + 1}`,
      files: [
        {
          id: `file-${Date.now()}`,
          name: "index.html",
          language: "html",
          content: "<main>\n  <h1>New project</h1>\n</main>",
        },
      ],
    };

    setProjects((prev) => [...prev, newProject]);
    setActiveProjectId(id);
    setActiveFileId(newProject.files[0].id);
  };

  const addFile = () => {
    const picked = supportedLanguages[(activeProject.files.length + 1) % supportedLanguages.length];
    const file = {
      id: `file-${Date.now()}`,
      name: `untitled${picked.extension}`,
      language: picked.id,
      content: "",
    };

    setProjects((prev) => prev.map((project) => (project.id === activeProject.id ? { ...project, files: [...project.files, file] } : project)));
    setActiveFileId(file.id);
  };

  const removeFile = (fileId) => {
    if (activeProject.files.length <= 1) {
      return;
    }

    const updatedFiles = activeProject.files.filter((file) => file.id !== fileId);
    setProjects((prev) => prev.map((project) => (project.id === activeProject.id ? { ...project, files: updatedFiles } : project)));

    if (activeFileId === fileId) {
      setActiveFileId(updatedFiles[0].id);
    }
  };

  if (!activeProject || !activeFile) {
    return null;
  }

  const isDarkMode = editorTheme === "dark";

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto w-[min(96%,1320px)] space-y-4 pb-36">
      <div className="rounded-2xl border border-[#FF3B30]/30 bg-[#1E1E1E] p-4 text-white shadow-[0_18px_45px_rgba(255,59,48,0.15)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Dev Fraol Code Editor</h1>
            <p className="text-sm text-white/65">Multi-language editor with live preview and VS Code-like toolbar.</p>
          </div>
          <button
            type="button"
            onClick={addProject}
            className="rounded-lg border border-[#FF3B30]/60 bg-[#FF3B30]/20 px-3 py-2 text-sm transition hover:bg-[#FF3B30]/35"
          >
            + New Snippet
          </button>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {projects.map((project) => {
            const active = project.id === activeProject.id;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs transition hover:border-[#FF3B30]/60 ${
                  active ? "border-[#FF3B30] bg-[#FF3B30]/20 text-white" : "border-white/10 bg-white/5 text-white/70"
                }`}
              >
                {project.name}
              </button>
            );
          })}
        </div>

        <Toolbar
          isDarkMode={isDarkMode}
          onToggleTheme={() => setEditorTheme(isDarkMode ? "light" : "dark")}
          onRun={() => setPreviewDoc(buildPreviewDocument({ files: activeProject.files, activeLanguage: activeFile.language }))}
          onUndo={() => editorActionsRef.current?.undo()}
          onRedo={() => editorActionsRef.current?.redo()}
          onCopy={() => copyToClipboard(activeFile.content)}
          onDownload={() => downloadFile(activeFile.name, activeFile.content)}
        />

        <div className="my-3">
          <TabBar files={activeProject.files} activeFileId={activeFile.id} onSelectFile={setActiveFileId} onAddFile={addFile} onRemoveFile={removeFile} />
        </div>

        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="min-w-0" style={{ flexBasis: `${split}%` }}>
            <EditorPane ref={editorActionsRef} activeFile={activeFile} onChange={updateCode} isDarkMode={isDarkMode} />
          </div>

          <div
            className="hidden w-2 cursor-col-resize rounded-full bg-white/10 transition hover:bg-[#FF3B30]/60 lg:block"
            onPointerDown={() => setIsDragging(true)}
            role="separator"
            aria-label="Resize panes"
          />

          <div className="min-w-0 flex-1" style={{ flexBasis: `${100 - split}%` }}>
            <PreviewPane srcDoc={previewDoc} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
