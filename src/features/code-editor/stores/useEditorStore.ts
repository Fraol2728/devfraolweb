import { create } from "zustand";
import type { TerminalLog } from "@/features/code-editor/types";

type EditorState = {
  dirty: Record<string, boolean>;
  commandPaletteOpen: boolean;
  logs: TerminalLog[];
  markDirty: (id: string, dirty: boolean) => void;
  toggleCommandPalette: () => void;
  closeCommandPalette: () => void;
  appendOutput: (text: string, type?: "log" | "error") => void;
  clearLogs: () => void;
};

const splitLines = (text: string) => text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

export const useEditorStore = create<EditorState>((set) => ({
  dirty: {},
  commandPaletteOpen: false,
  logs: [{ id: "boot", text: "Terminal ready.", type: "log" }],
  markDirty: (id, isDirty) => set((s) => ({ dirty: { ...s.dirty, [id]: isDirty } })),
  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  appendOutput: (text, type = "log") => set((s) => ({
    logs: [
      ...s.logs,
      ...splitLines(text).filter(Boolean).map((line) => ({
        id: `${Date.now()}-${Math.random()}`,
        text: line,
        type,
      })),
    ],
  })),
  clearLogs: () => set({ logs: [] }),
}));
