import { create } from "zustand";
import type { FileNode } from "@/features/code-editor/types";

const id = () => Math.random().toString(36).slice(2, 10);

const lang = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "ts" || ext === "tsx") return "typescript";
  if (ext === "js" || ext === "jsx") return "javascript";
  if (ext === "css") return "css";
  if (ext === "html") return "html";
  if (ext === "json") return "json";
  return "plaintext";
};

const seed: FileNode[] = [
  { id: id(), type: "folder", name: "src", children: [
    { id: id(), type: "file", name: "index.html", language: "html", content: "<h1>Hello IDE</h1>" },
    { id: id(), type: "file", name: "styles.css", language: "css", content: "body { background: #111; color: #eee; }" },
    { id: id(), type: "file", name: "main.ts", language: "typescript", content: "console.log('Ready');" },
  ] },
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

const remove = (nodes: FileNode[], targetId: string): FileNode[] => nodes.filter((n) => n.id !== targetId).map((n) => (
  n.children ? { ...n, children: remove(n.children, targetId) } : n
));

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

type FilesState = {
  tree: FileNode[];
  activeFileId: string | null;
  openTabs: string[];
  expanded: string[];
  setActiveFile: (id: string) => void;
  toggleFolder: (id: string) => void;
  createFile: (parentId: string | null, name: string) => void;
  createFolder: (parentId: string | null, name: string) => void;
  renameNode: (id: string, name: string) => void;
  deleteNode: (id: string) => void;
  updateContent: (id: string, content: string) => void;
  closeTab: (id: string) => void;
};

const initialFiles = walkFiles(seed);

export const useFilesStore = create<FilesState>((set, get) => ({
  tree: seed,
  activeFileId: initialFiles[0]?.id ?? null,
  openTabs: initialFiles[0] ? [initialFiles[0].id] : [],
  expanded: [seed[0].id],
  setActiveFile: (id) => set((s) => ({ activeFileId: id, openTabs: s.openTabs.includes(id) ? s.openTabs : [...s.openTabs, id] })),
  toggleFolder: (id) => set((s) => ({ expanded: s.expanded.includes(id) ? s.expanded.filter((x) => x !== id) : [...s.expanded, id] })),
  createFile: (parentId, name) => {
    const next = { id: id(), type: "file" as const, name, language: lang(name), content: "" };
    set((s) => ({ tree: insert(s.tree, parentId, next), activeFileId: next.id, openTabs: [...s.openTabs, next.id] }));
  },
  createFolder: (parentId, name) => {
    const next = { id: id(), type: "folder" as const, name, children: [] };
    set((s) => ({ tree: insert(s.tree, parentId, next), expanded: [...s.expanded, next.id] }));
  },
  renameNode: (nodeId, name) => set((s) => ({ tree: updateTree(s.tree, nodeId, (n) => ({ ...n, name, language: n.type === "file" ? lang(name) : n.language })) })),
  deleteNode: (nodeId) => {
    const state = get();
    const node = find(state.tree, nodeId);
    if (!node) return;
    const removed = collectIds(node);
    const tree = remove(state.tree, nodeId);
    const files = walkFiles(tree);
    const active = removed.includes(state.activeFileId ?? "") ? files[0]?.id ?? null : state.activeFileId;
    set({ tree, activeFileId: active, openTabs: state.openTabs.filter((t) => !removed.includes(t)) });
  },
  updateContent: (nodeId, content) => set((s) => ({ tree: updateTree(s.tree, nodeId, (n) => (n.type === "file" ? { ...n, content } : n)) })),
  closeTab: (tabId) => {
    const s = get();
    const openTabs = s.openTabs.filter((t) => t !== tabId);
    set({ openTabs, activeFileId: s.activeFileId === tabId ? openTabs[0] ?? null : s.activeFileId });
  },
}));

export const selectFiles = (tree: FileNode[]) => walkFiles(tree);
