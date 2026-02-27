import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "devfraol-code-editor-fs-v1";

const languageByExtension = {
  html: "html",
  css: "css",
  js: "javascript",
  php: "php",
  py: "python",
};

const getLanguageFromName = (name: string) => {
  const extension = name.split(".").pop()?.toLowerCase() || "";
  return languageByExtension[extension as keyof typeof languageByExtension] || "plaintext";
};

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const defaultProject = [
  { id: createId(), type: "file", name: "index.html", content: "<main>\n  <h1>Dev Fraol Academy</h1>\n</main>", language: "html" },
  { id: createId(), type: "file", name: "style.css", content: "body {\n  font-family: sans-serif;\n}", language: "css" },
  { id: createId(), type: "file", name: "script.js", content: "console.log('Editor ready');", language: "javascript" },
];

type FileNode = {
  id: string;
  type: "file" | "folder";
  name: string;
  content?: string;
  language?: string;
  children?: FileNode[];
};

const walk = (nodes: FileNode[], fn: (node: FileNode) => void) => {
  for (const node of nodes) {
    fn(node);
    if (node.type === "folder" && node.children) {
      walk(node.children, fn);
    }
  }
};

const findNode = (nodes: FileNode[], id: string): FileNode | null => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.type === "folder" && node.children) {
      const found = findNode(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

const updateNodeTree = (nodes: FileNode[], id: string, updater: (node: FileNode) => FileNode): FileNode[] =>
  nodes.map((node) => {
    if (node.id === id) {
      return updater(node);
    }
    if (node.type === "folder" && node.children) {
      return { ...node, children: updateNodeTree(node.children, id, updater) };
    }
    return node;
  });

const insertIntoFolder = (nodes: FileNode[], parentId: string | null, newNode: FileNode): FileNode[] => {
  if (!parentId) {
    return [...nodes, newNode];
  }

  return nodes.map((node) => {
    if (node.id === parentId && node.type === "folder") {
      return { ...node, children: [...(node.children || []), newNode] };
    }

    if (node.type === "folder" && node.children) {
      return { ...node, children: insertIntoFolder(node.children, parentId, newNode) };
    }

    return node;
  });
};

const removeNodeFromTree = (nodes: FileNode[], id: string): FileNode[] =>
  nodes
    .filter((node) => node.id !== id)
    .map((node) => {
      if (node.type === "folder" && node.children) {
        return { ...node, children: removeNodeFromTree(node.children, id) };
      }
      return node;
    });

export const useFileSystem = () => {
  const [nodes, setNodes] = useState<FileNode[]>(defaultProject);
  const [activeFileId, setActiveFileId] = useState<string>(defaultProject[0].id);
  const [openTabs, setOpenTabs] = useState<string[]>([defaultProject[0].id]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed?.nodes) && parsed.nodes.length > 0) {
        setNodes(parsed.nodes);
        setActiveFileId(parsed.activeFileId || parsed.nodes[0].id);
        setOpenTabs(parsed.openTabs || [parsed.nodes[0].id]);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, activeFileId, openTabs }));
  }, [nodes, activeFileId, openTabs]);

  const files = useMemo(() => {
    const collected: FileNode[] = [];
    walk(nodes, (node) => {
      if (node.type === "file") {
        collected.push(node);
      }
    });
    return collected;
  }, [nodes]);

  const activeFile = useMemo(() => files.find((file) => file.id === activeFileId) || files[0] || null, [files, activeFileId]);

  useEffect(() => {
    if (!activeFile && files[0]) {
      setActiveFileId(files[0].id);
    }
  }, [activeFile, files]);

  const setActiveFile = useCallback((id: string) => {
    setActiveFileId(id);
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const createFile = useCallback((parentId: string | null, name: string, content = "") => {
    const nextFile: FileNode = { id: createId(), type: "file", name, content, language: getLanguageFromName(name) };
    setNodes((prev) => insertIntoFolder(prev, parentId, nextFile));
    setActiveFile(nextFile.id);
    return nextFile;
  }, [setActiveFile]);

  const createFolder = useCallback((parentId: string | null, name: string) => {
    const nextFolder: FileNode = { id: createId(), type: "folder", name, children: [] };
    setNodes((prev) => insertIntoFolder(prev, parentId, nextFolder));
    return nextFolder;
  }, []);

  const renameNode = useCallback((id: string, name: string) => {
    setNodes((prev) =>
      updateNodeTree(prev, id, (node) => ({
        ...node,
        name,
        ...(node.type === "file" ? { language: getLanguageFromName(name) } : {}),
      }))
    );
  }, []);

  const deleteNode = useCallback(
    (id: string) => {
      const target = findNode(nodes, id);
      if (!target) {
        return;
      }

      const removedIds: string[] = [];
      if (target.type === "file") {
        removedIds.push(target.id);
      } else {
        walk([target], (node) => {
          if (node.type === "file") {
            removedIds.push(node.id);
          }
        });
      }

      setNodes((prev) => removeNodeFromTree(prev, id));
      setOpenTabs((prev) => prev.filter((tabId) => !removedIds.includes(tabId)));
      if (removedIds.includes(activeFileId)) {
        const nextFile = files.find((file) => !removedIds.includes(file.id));
        if (nextFile) {
          setActiveFile(nextFile.id);
        }
      }
    },
    [nodes, activeFileId, files, setActiveFile]
  );

  const updateFileContent = useCallback((id: string, content: string) => {
    setNodes((prev) => updateNodeTree(prev, id, (node) => (node.type === "file" ? { ...node, content } : node)));
  }, []);

  const closeTab = useCallback(
    (id: string) => {
      setOpenTabs((prev) => prev.filter((tabId) => tabId !== id));
      if (activeFileId === id) {
        const next = openTabs.find((tabId) => tabId !== id) || files.find((file) => file.id !== id)?.id;
        if (next) {
          setActiveFile(next);
        }
      }
    },
    [activeFileId, files, openTabs, setActiveFile]
  );

  const tabFiles = useMemo(
    () => openTabs.map((tabId) => files.find((file) => file.id === tabId)).filter(Boolean) as FileNode[],
    [openTabs, files]
  );

  return {
    nodes,
    files,
    activeFile,
    activeFileId,
    tabFiles,
    setActiveFile,
    closeTab,
    createFile,
    createFolder,
    renameNode,
    deleteNode,
    updateFileContent,
  };
};
