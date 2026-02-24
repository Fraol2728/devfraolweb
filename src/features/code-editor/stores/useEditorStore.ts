import { create } from "zustand";
import type { TerminalLog } from "@/features/code-editor/types";

type EditorState = {
  dirty: Record<string, boolean>;
  commandPaletteOpen: boolean;
  logs: TerminalLog[];
  commandHistory: string[];
  historyIndex: number;
  autoScrollTerminal: boolean;
  markDirty: (id: string, dirty: boolean) => void;
  toggleCommandPalette: () => void;
  closeCommandPalette: () => void;
  appendOutput: (text: string, type?: "log" | "error") => void;
  clearLogs: () => void;
  addCommandHistory: (command: string) => void;
  navigateCommandHistory: (dir: "up" | "down") => string;
  toggleAutoScrollTerminal: () => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  dirty: {},
  commandPaletteOpen: false,
  logs: [{ id: "boot", text: "Terminal ready.", type: "log" }],
  commandHistory: [],
  historyIndex: -1,
  autoScrollTerminal: true,
  markDirty: (id, isDirty) => set((s) => ({ dirty: { ...s.dirty, [id]: isDirty } })),
  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  appendOutput: (text, type = "log") => set((s) => ({ logs: [...s.logs, { id: `${Date.now()}-${Math.random()}`, text, type }] })),
  clearLogs: () => set({ logs: [] }),
  addCommandHistory: (command) => set((s) => {
    const normalized = command.trim();
    if (!normalized) return s;
    const deduped = s.commandHistory[s.commandHistory.length - 1] === normalized ? s.commandHistory : [...s.commandHistory, normalized];
    return { commandHistory: deduped, historyIndex: deduped.length };
  }),
  navigateCommandHistory: (dir) => {
    const s = get();
    if (!s.commandHistory.length) return "";
    const nextIndex = dir === "up"
      ? Math.max(0, s.historyIndex - 1)
      : Math.min(s.commandHistory.length, s.historyIndex + 1);
    set({ historyIndex: nextIndex });
    return nextIndex >= s.commandHistory.length ? "" : s.commandHistory[nextIndex];
  },
  toggleAutoScrollTerminal: () => set((s) => ({ autoScrollTerminal: !s.autoScrollTerminal })),
}));
