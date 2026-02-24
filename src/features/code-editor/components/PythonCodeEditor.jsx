import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "@/hooks/useToastStore";
import { MenuBar } from "@/features/code-editor/components/MenuBar";
import { FileExplorer } from "@/features/code-editor/components/FileExplorer";
import { EditorPane } from "@/features/code-editor/components/EditorPane";
import { Terminal } from "@/features/code-editor/components/Terminal";
import { ResizablePanels } from "@/features/code-editor/components/ResizablePanels";
import { useFilesStore, selectFiles } from "@/features/code-editor/stores/useFilesStore";
import { useLayoutStore } from "@/features/code-editor/stores/useLayoutStore";
import { useEditorStore } from "@/features/code-editor/stores/useEditorStore";
import { installPackageForProject } from "@/features/code-editor/PackageManager";
import { DebuggerPanel } from "@/features/code-editor/components/DebuggerPanel";
import { SidePanel } from "@/features/code-editor/components/SidePanel";
import { exportProjectAsJson, exportProjectAsZip, importProjectFromFile } from "@/features/code-editor/ProjectManager";
import "@/features/code-editor/codeEditor.css";

const PYODIDE_SCRIPT_ID = "pyodide-cdn-script";

export const PythonCodeEditor = () => {
  const tree = useFilesStore((s) => s.tree);
  const projects = useFilesStore((s) => s.projects);
  const currentProjectId = useFilesStore((s) => s.currentProjectId);
  const openTabs = useFilesStore((s) => s.openTabs);
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);
  const closeTab = useFilesStore((s) => s.closeTab);
  const reorderTabs = useFilesStore((s) => s.reorderTabs);
  const updateContent = useFilesStore((s) => s.updateContent);
  const createFile = useFilesStore((s) => s.createFile);
  const createProject = useFilesStore((s) => s.createProject);
  const importProject = useFilesStore((s) => s.importProject);
  const setCurrentProject = useFilesStore((s) => s.setCurrentProject);
  const saveAllFiles = useFilesStore((s) => s.saveAllFiles);
  const installedPackages = useFilesStore((s) => s.installedPackages);
  const addInstalledPackage = useFilesStore((s) => s.addInstalledPackage);

  const logs = useEditorStore((s) => s.logs);
  const appendOutput = useEditorStore((s) => s.appendOutput);
  const clearLogs = useEditorStore((s) => s.clearLogs);
  const addCommandHistory = useEditorStore((s) => s.addCommandHistory);
  const navigateCommandHistory = useEditorStore((s) => s.navigateCommandHistory);
  const autoScrollTerminal = useEditorStore((s) => s.autoScrollTerminal);
  const toggleAutoScrollTerminal = useEditorStore((s) => s.toggleAutoScrollTerminal);

  const terminalOpen = useLayoutStore((s) => s.terminalOpen);
  const explorerOpen = useLayoutStore((s) => s.explorerOpen);
  const toggleTerminal = useLayoutStore((s) => s.toggleTerminal);
  const toggleExplorer = useLayoutStore((s) => s.toggleExplorer);

  const [isPyodideReady, setIsPyodideReady] = useState(Boolean(window.__pyodide));
  const [runtimeLoading, setRuntimeLoading] = useState(false);
  const [debuggerState, setDebuggerState] = useState({ currentLine: null, variables: {}, traceback: "" });
  const editorRef = useRef(null);
  const saveDebounceRef = useRef();

  const files = useMemo(() => selectFiles(tree), [tree]);
  const activeFile = files.find((item) => item.id === activeFileId) ?? null;
  const tabs = openTabs.map((tabId) => files.find((item) => item.id === tabId)).filter(Boolean);

  const initializePyodide = async () => {
    if (window.__pyodide) {
      setIsPyodideReady(true);
      return window.__pyodide;
    }
    setRuntimeLoading(true);
    try {
      if (!window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const existing = document.getElementById(PYODIDE_SCRIPT_ID);
          if (existing) {
            existing.addEventListener("load", resolve, { once: true });
            existing.addEventListener("error", reject, { once: true });
            return;
          }
          const script = document.createElement("script");
          script.id = PYODIDE_SCRIPT_ID;
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }
      window.__pyodide = await window.loadPyodide();
      setIsPyodideReady(true);
      appendOutput("Pyodide runtime initialized.");
      return window.__pyodide;
    } catch {
      appendOutput("Failed to load Pyodide runtime.", "error");
      return null;
    } finally {
      setRuntimeLoading(false);
    }
  };

  const runPythonCode = async () => {
    if (!activeFile) return;
    addCommandHistory(activeFile.name);
    const pyodide = await initializePyodide();
    if (!pyodide) return;
    setRuntimeLoading(true);
    appendOutput(`Running ${activeFile.name} ...`);
    try {
      const pyFiles = files.filter((file) => file.name.endsWith(".py"));
      pyodide.FS.mkdirTree("/project");
      for (const file of pyFiles) {
        pyodide.FS.writeFile(`/project/${file.name}`, file.content ?? "", { encoding: "utf8" });
      }
      pyodide.runPython("import sys; sys.path.append('/project')");
      pyodide.setStdout({ batched: (text) => appendOutput(text, "log") });
      pyodide.setStderr({ batched: (text) => appendOutput(text, "error") });
      await pyodide.runPythonAsync(activeFile.content ?? "");
      appendOutput("Execution completed.");
    } catch (error) {
      appendOutput(String(error), "error");
    } finally {
      setRuntimeLoading(false);
    }
  };

  const startDebugSession = async () => {
    if (!activeFile) return;
    const pyodide = await initializePyodide();
    if (!pyodide) return;
    setRuntimeLoading(true);
    setDebuggerState({ currentLine: null, variables: {}, traceback: "" });
    window.__debugHooks = {
      onLine: (line, vars) => setDebuggerState({ currentLine: line, variables: vars, traceback: "" }),
    };
    try {
      pyodide.registerJsModule("debug_hooks", window.__debugHooks);
      pyodide.globals.set("__debug_code", activeFile.content ?? "");
      await pyodide.runPythonAsync(`
import json, sys, debug_hooks

def tracer(frame, event, arg):
    if event == 'line':
        tracked = {k: str(v) for k, v in frame.f_locals.items() if not k.startswith('__')}
        debug_hooks.onLine(frame.f_lineno, tracked)
    return tracer

sys.settrace(tracer)
try:
    exec(__debug_code, {})
finally:
    sys.settrace(None)
`);
    } catch (error) {
      setDebuggerState((prev) => ({ ...prev, traceback: String(error) }));
      appendOutput(String(error), "error");
    } finally {
      setRuntimeLoading(false);
    }
  };

  const installPackage = async (packageName) => {
    const pyodide = await initializePyodide();
    try {
      const installed = await installPackageForProject({
        pyodide,
        projectId: currentProjectId,
        packageName,
        installedByProject: installedPackages,
        onInstalled: (pkg) => addInstalledPackage(currentProjectId, pkg),
      });
      appendOutput(installed ? `Installed ${packageName}` : `${packageName} already installed`);
    } catch (error) {
      appendOutput(String(error), "error");
    }
  };

  const runSnippet = async (command) => {
    if (!command?.trim()) return;
    addCommandHistory(command);
    const pyodide = await initializePyodide();
    try {
      pyodide.setStdout({ batched: (text) => appendOutput(text, "log") });
      pyodide.setStderr({ batched: (text) => appendOutput(text, "error") });
      await pyodide.runPythonAsync(command);
    } catch (error) {
      appendOutput(String(error), "error");
    }
  };

  const saveFile = () => {
    saveAllFiles();
    toast({ title: "Saved", description: "Files saved locally." });
  };

  const handleMenuAction = (action) => {
    if (action === "file-new") {
      createFile(null, `script-${Date.now()}.py`);
      appendOutput("Created a new Python file.");
      return;
    }
    if (action === "file-save" || action === "file-save-as" || action === "file-save-all") {
      saveFile();
      return;
    }
    if (action === "file-new-project") {
      const name = window.prompt("Project name", "project");
      if (name) createProject(name);
      return;
    }
    if (action === "file-export-json") {
      exportProjectAsJson(projects[currentProjectId]);
      return;
    }
    if (action === "file-export-zip") {
      initializePyodide().then((pyodide) => exportProjectAsZip(projects[currentProjectId], pyodide));
      return;
    }
    if (action === "file-import-project") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json,.zip";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        const project = await importProjectFromFile(file, window.__pyodide);
        importProject(project);
      };
      input.click();
      return;
    }
    if (action === "view-toggle-terminal") {
      toggleTerminal();
      return;
    }
    if (action === "view-toggle-explorer") {
      toggleExplorer();
      return;
    }
    if (action === "run-python") {
      runPythonCode();
      return;
    }
    if (action === "run-debug") {
      startDebugSession();
      return;
    }
    if (action === "edit-undo") editorRef.current?.trigger("keyboard", "undo", null);
    if (action === "edit-redo") editorRef.current?.trigger("keyboard", "redo", null);
    if (action === "edit-find") editorRef.current?.getAction("actions.find")?.run();
  };

  const handleEditorChange = (fileId, value) => {
    updateContent(fileId, value);
    window.clearTimeout(saveDebounceRef.current);
    saveDebounceRef.current = window.setTimeout(() => saveAllFiles(), 450);
  };

  useEffect(() => {
    useFilesStore.getState().loadProjectFromLocalStorage();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.ctrlKey) return;
      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (event.shiftKey) handleMenuAction("file-save-as");
        else handleMenuAction("file-save");
      }
      if (event.key.toLowerCase() === "n") {
        event.preventDefault();
        handleMenuAction("file-new");
      }
      if (event.key === "Enter") {
        event.preventDefault();
        handleMenuAction("run-python");
      }
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        handleMenuAction("edit-find");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeFile]);

  const copyOutput = async () => {
    await navigator.clipboard.writeText(logs.map((line) => line.text).join("\n"));
    toast({ title: "Copied", description: "Terminal output copied." });
  };

  return (
    <section className="py-root">
      <MenuBar onAction={handleMenuAction} />
      <div className="py-status-bar">
        <label>
          Project:
          <select value={currentProjectId} onChange={(event) => setCurrentProject(event.target.value)}>
            {Object.values(projects).map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
          </select>
        </label>
        <span>{runtimeLoading ? "Runtime busy..." : isPyodideReady ? "Pyodide ready" : "Pyodide not loaded"}</span>
      </div>
      <ResizablePanels
        explorer={<FileExplorer />}
        editor={<EditorPane activeFile={activeFile} highlightedLine={debuggerState.currentLine} tabs={tabs} onTabSwitch={setActiveFile} onTabClose={closeTab} onTabReorder={reorderTabs} onChange={handleEditorChange} onEditorReady={(editor) => { editorRef.current = editor; }} />}
        terminal={<Terminal logs={logs} onClear={clearLogs} onCopy={copyOutput} autoScroll={autoScrollTerminal} onToggleAutoScroll={toggleAutoScrollTerminal} onCommand={runSnippet} onHistory={navigateCommandHistory} />}
        terminalVisible={terminalOpen}
        explorerVisible={explorerOpen}
      />
      <div className="py-lower-panels">
        <DebuggerPanel debuggerState={debuggerState} />
        <SidePanel installedPackages={installedPackages[currentProjectId] ?? []} onInstallPackage={installPackage} />
      </div>
    </section>
  );
};
