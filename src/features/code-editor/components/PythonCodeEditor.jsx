import { useMemo } from "react";
import { toast } from "@/hooks/useToastStore";
import { MenuBar } from "@/features/code-editor/components/MenuBar";
import { FileExplorer } from "@/features/code-editor/components/FileExplorer";
import { EditorPane } from "@/features/code-editor/components/EditorPane";
import { Terminal } from "@/features/code-editor/components/Terminal";
import { ResizablePanels } from "@/features/code-editor/components/ResizablePanels";
import { useFilesStore, selectFiles } from "@/features/code-editor/stores/useFilesStore";
import { useLayoutStore } from "@/features/code-editor/stores/useLayoutStore";
import { useEditorStore } from "@/features/code-editor/stores/useEditorStore";
import "@/features/code-editor/codeEditor.css";

export const PythonCodeEditor = () => {
  const tree = useFilesStore((s) => s.tree);
  const openTabs = useFilesStore((s) => s.openTabs);
  const activeFileId = useFilesStore((s) => s.activeFileId);
  const setActiveFile = useFilesStore((s) => s.setActiveFile);
  const closeTab = useFilesStore((s) => s.closeTab);
  const updateContent = useFilesStore((s) => s.updateContent);
  const createFile = useFilesStore((s) => s.createFile);

  const logs = useEditorStore((s) => s.logs);
  const pushLog = useEditorStore((s) => s.pushLog);
  const clearLogs = useEditorStore((s) => s.clearLogs);

  const terminalOpen = useLayoutStore((s) => s.terminalOpen);
  const toggleTerminal = useLayoutStore((s) => s.toggleTerminal);

  const files = useMemo(() => selectFiles(tree), [tree]);
  const activeFile = files.find((item) => item.id === activeFileId) ?? null;
  const tabs = openTabs.map((tabId) => files.find((item) => item.id === tabId)).filter(Boolean);

  const placeholderToast = (action) => {
    toast({ title: action, description: "Feature coming soon" });
  };

  const handleMenuAction = (action) => {
    if (action === "file-new") {
      createFile(null, `script-${Date.now()}.py`);
      pushLog("Created a new Python file.");
      return;
    }

    if (action === "view-toggle-terminal") {
      toggleTerminal();
      pushLog("Toggled terminal visibility.");
      return;
    }

    if (action === "run-python") {
      pushLog("Run requested. Python execution backend is not connected yet.");
      placeholderToast("Run Python");
      return;
    }

    placeholderToast(action.replaceAll("-", " "));
  };

  return (
    <section className="py-root">
      <MenuBar onAction={handleMenuAction} />
      <ResizablePanels
        explorer={<FileExplorer />}
        editor={<EditorPane activeFile={activeFile} tabs={tabs} onTabSwitch={setActiveFile} onTabClose={closeTab} onChange={updateContent} />}
        terminal={<Terminal logs={logs} onClear={clearLogs} />}
        terminalVisible={terminalOpen}
      />
    </section>
  );
};
