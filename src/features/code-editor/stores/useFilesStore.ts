import { create } from "zustand";
import type { FileNode } from "@/features/code-editor/types";

const id = () => Math.random().toString(36).slice(2, 10);

const lang = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "py") return "python";
  if (ext === "md") return "markdown";
  if (ext === "json") return "json";
  if (ext === "txt") return "plaintext";
  return "python";
};

const createSeedProject = (name = "project"): FileNode[] => [
  {
    id: id(),
    type: "folder",
    name,
    children: [
      {
        id: id(),
        type: "folder",
        name: "src",
        children: [
          { id: id(), type: "file", name: "main.py", language: "python", content: "def greet(name):\n    return f'Hello, {name}'\n\nprint(greet('Dev Fraol'))\n" },
          { id: id(), type: "file", name: "utils.py", language: "python", content: "def add(a, b):\n    return a + b\n" },
        ],
      },
      { id: id(), type: "file", name: "README.md", language: "markdown", content: "# Python editor\n\nUse the explorer to manage files." },
    ],
  },
];

const walkFiles = (nodes: FileNode[], out: FileNode[] = []) => {
  nodes.forEach((n) => {
    if (n.type === "file") out.push(n);
    if (n.children) walkFiles(n.children, out);
  });
  return out;
};

const updateTree = (nodes: FileNode[], targetId: string, fn: (n: FileNode) => FileNode): FileNode[] => nodes.map((n) => {
  if (n.id === targetId) return fn(n);
  if (n.children) return { ...n, children: updateTree(n.children, targetId, fn) };
  return n;
});

const insert = (nodes: FileNode[], parentId: string | null, node: FileNode): FileNode[] => {
  if (!parentId) return [...nodes, node];
  return nodes.map((n) => {
    if (n.id === parentId && n.type === "folder") return { ...n, children: [...(n.children ?? []), node] };
    if (n.children) return { ...n, children: insert(n.children, parentId, node) };
    return n;
  });
};

const remove = (nodes: FileNode[], targetId: string): FileNode[] => nodes
  .filter((n) => n.id !== targetId)
  .map((n) => (n.children ? { ...n, children: remove(n.children, targetId) } : n));

const collectIds = (node: FileNode, out: string[] = []) => {
  if (node.type === "file") out.push(node.id);
  node.children?.forEach((c) => collectIds(c, out));
  return out;
};

const find = (nodes: FileNode[], targetId: string): FileNode | null => {
  for (const n of nodes) {
    if (n.id === targetId) return n;
    if (n.children) {
      const found = find(n.children, targetId);
      if (found) return found;
    }
  }
  return null;
};

type ProjectState = {
  id: string;
  name: string;
  tree: FileNode[];
  activeFileId: string | null;
  openTabs: string[];
  expanded: string[];
};

type FilesState = {
  projects: Record<string, ProjectState>;
  currentProjectId: string;
  tree: FileNode[];
  activeFileId: string | null;
  openTabs: string[];
  expanded: string[];
  installedPackages: Record<string, string[]>;
  setActiveFile: (id: string) => void;
  toggleFolder: (id: string) => void;
  createFile: (parentId: string | null, name: string) => void;
  createFolder: (parentId: string | null, name: string) => void;
  renameNode: (id: string, name: string) => void;
  deleteNode: (id: string) => void;
  updateContent: (id: string, content: string) => void;
  closeTab: (id: string) => void;
  reorderTabs: (from: number, to: number) => void;
  saveAllFiles: () => void;
  loadProjectFromLocalStorage: () => void;
  createProject: (name: string) => void;
  setCurrentProject: (projectId: string) => void;
  addInstalledPackage: (projectId: string, packageName: string) => void;
  importProject: (project: { name: string; tree: FileNode[] }) => void;
};

const createProjectState = (name: string): ProjectState => {
  const tree = createSeedProject(name);
  const initialFiles = walkFiles(tree);
  return {
    id: id(),
    name,
    tree,
    activeFileId: initialFiles[0]?.id ?? null,
    openTabs: initialFiles[0] ? [initialFiles[0].id] : [],
    expanded: [tree[0].id],
  };
};

const baseProject = createProjectState("project");

export const useFilesStore = create<FilesState>((set, get) => {
  const initialProjects = { [baseProject.id]: baseProject };

  const cloneWithIds = (nodes: FileNode[]): FileNode[] => nodes.map((node) => ({
    ...node,
    id: id(),
    children: node.children ? cloneWithIds(node.children) : undefined,
  }));

  return {
    projects: initialProjects,
    currentProjectId: baseProject.id,
    tree: baseProject.tree,
    activeFileId: baseProject.activeFileId,
    openTabs: baseProject.openTabs,
    expanded: baseProject.expanded,
    installedPackages: {},
    setActiveFile: (nodeId) => set((s) => ({
      ...s,
      activeFileId: nodeId,
      openTabs: s.openTabs.includes(nodeId) ? s.openTabs : [...s.openTabs, nodeId],
      projects: {
        ...s.projects,
        [s.currentProjectId]: {
          ...s.projects[s.currentProjectId],
          activeFileId: nodeId,
          openTabs: s.openTabs.includes(nodeId) ? s.openTabs : [...s.openTabs, nodeId],
        },
      },
    })),
    toggleFolder: (folderId) => set((s) => {
      const expanded = s.expanded.includes(folderId) ? s.expanded.filter((x) => x !== folderId) : [...s.expanded, folderId];
      return {
        ...s,
        expanded,
        projects: { ...s.projects, [s.currentProjectId]: { ...s.projects[s.currentProjectId], expanded } },
      };
    }),
    createFile: (parentId, name) => set((s) => {
      const nextNode = { id: id(), type: "file" as const, name, language: lang(name), content: "" };
      const tree = insert(s.tree, parentId, nextNode);
      const openTabs = [...s.openTabs, nextNode.id];
      return {
        ...s,
        tree,
        activeFileId: nextNode.id,
        openTabs,
        projects: { ...s.projects, [s.currentProjectId]: { ...s.projects[s.currentProjectId], tree, activeFileId: nextNode.id, openTabs } },
      };
    }),
    createFolder: (parentId, name) => set((s) => {
      const nextNode = { id: id(), type: "folder" as const, name, children: [] };
      const tree = insert(s.tree, parentId, nextNode);
      const expanded = [...s.expanded, nextNode.id];
      return {
        ...s,
        tree,
        expanded,
        projects: { ...s.projects, [s.currentProjectId]: { ...s.projects[s.currentProjectId], tree, expanded } },
      };
    }),
    renameNode: (nodeId, name) => set((s) => {
      const tree = updateTree(s.tree, nodeId, (n) => ({ ...n, name, language: n.type === "file" ? lang(name) : n.language }));
      return { ...s, tree, projects: { ...s.projects, [s.currentProjectId]: { ...s.projects[s.currentProjectId], tree } } };
    }),
    deleteNode: (nodeId) => {
      const state = get();
      const node = find(state.tree, nodeId);
      if (!node) return;
      const removed = collectIds(node);
      const tree = remove(state.tree, nodeId);
      const files = walkFiles(tree);
      const activeFileId = removed.includes(state.activeFileId ?? "") ? files[0]?.id ?? null : state.activeFileId;
      const openTabs = state.openTabs.filter((t) => !removed.includes(t));
      set((s) => ({
        ...s,
        tree,
        activeFileId,
        openTabs,
        projects: { ...s.projects, [s.currentProjectId]: { ...s.projects[s.currentProjectId], tree, activeFileId, openTabs } },
      }));
    },
    updateContent: (nodeId, content) => set((s) => {
      const tree = updateTree(s.tree, nodeId, (n) => (n.type === "file" ? { ...n, content } : n));
      return { ...s, tree, projects: { ...s.projects, [s.currentProjectId]: { ...s.projects[s.currentProjectId], tree } } };
    }),
    closeTab: (tabId) => set((s) => {
      const openTabs = s.openTabs.filter((t) => t !== tabId);
      const activeFileId = s.activeFileId === tabId ? openTabs[0] ?? null : s.activeFileId;
      return { ...s, openTabs, activeFileId, projects: { ...s.projects, [s.currentProjectId]: { ...s.projects[s.currentProjectId], openTabs, activeFileId } } };
    }),
    reorderTabs: (from, to) => set((s) => {
      if (from === to || from < 0 || to < 0 || from >= s.openTabs.length || to >= s.openTabs.length) return s;
      const openTabs = [...s.openTabs];
      const [tab] = openTabs.splice(from, 1);
      openTabs.splice(to, 0, tab);
      return { ...s, openTabs, projects: { ...s.projects, [s.currentProjectId]: { ...s.projects[s.currentProjectId], openTabs } } };
    }),
    saveAllFiles: () => {},
    loadProjectFromLocalStorage: () => {},
    createProject: (name) => set((s) => {
      const project = createProjectState(name);
      const projects = { ...s.projects, [project.id]: project };
      return { ...s, projects, currentProjectId: project.id, tree: project.tree, activeFileId: project.activeFileId, openTabs: project.openTabs, expanded: project.expanded };
    }),
    setCurrentProject: (projectId) => set((s) => {
      const project = s.projects[projectId];
      if (!project) return s;
      return { ...s, currentProjectId: projectId, tree: project.tree, activeFileId: project.activeFileId, openTabs: project.openTabs, expanded: project.expanded };
    }),
    addInstalledPackage: (projectId, packageName) => set((s) => {
      const list = s.installedPackages[projectId] ?? [];
      if (list.includes(packageName)) return s;
      return { ...s, installedPackages: { ...s.installedPackages, [projectId]: [...list, packageName] } };
    }),
    importProject: (project) => set((s) => {
      const created = createProjectState(project.name || "imported-project");
      created.tree = cloneWithIds(project.tree);
      const files = walkFiles(created.tree);
      created.activeFileId = files[0]?.id ?? null;
      created.openTabs = created.activeFileId ? [created.activeFileId] : [];
      const projects = { ...s.projects, [created.id]: created };
      return { ...s, projects, currentProjectId: created.id, tree: created.tree, activeFileId: created.activeFileId, openTabs: created.openTabs, expanded: created.expanded };
    }),
  };
});

export const selectFiles = (tree: FileNode[]) => walkFiles(tree);
