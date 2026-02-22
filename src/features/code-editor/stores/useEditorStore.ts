import { create } from "zustand";
import type { TerminalLog } from "@/features/code-editor/types";

type EditorState = {
  dirty: Record<string, boolean>;
  commandPaletteOpen: boolean;
  logs: TerminalLog[];
  markDirty: (id: string, dirty: boolean) => void;
  toggleCommandPalette: () => void;
  closeCommandPalette: () => void;
  pushLog: (text: string) => void;
  clearLogs: () => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  dirty: {},
  commandPaletteOpen: false,
  logs: [{ id: "boot", text: "Terminal ready." }],
  markDirty: (id, isDirty) => set((s) => ({ dirty: { ...s.dirty, [id]: isDirty } })),
  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  pushLog: (text) => set((s) => ({ logs: [...s.logs, { id: `${Date.now()}-${Math.random()}`, text }] })),
  clearLogs: () => set({ logs: [] }),
}));
