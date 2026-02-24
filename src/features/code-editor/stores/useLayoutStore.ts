import { create } from "zustand";

type LayoutState = {
  terminalOpen: boolean;
  explorerOpen: boolean;
  leftWidth: number;
  terminalHeight: number;
  toggleTerminal: () => void;
  toggleExplorer: () => void;
  setLeftWidth: (w: number) => void;
  setTerminalHeight: (h: number) => void;
};

const SIDEBAR_MIN = 200;
const SIDEBAR_MAX = 520;
const TERMINAL_MIN = 120;
const TERMINAL_MAX = 420;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const useLayoutStore = create<LayoutState>((set) => ({
  terminalOpen: true,
  explorerOpen: true,
  leftWidth: 280,
  terminalHeight: 190,
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  toggleExplorer: () => set((s) => ({ explorerOpen: !s.explorerOpen })),
  setLeftWidth: (leftWidth) => set({ leftWidth: clamp(leftWidth, SIDEBAR_MIN, SIDEBAR_MAX) }),
  setTerminalHeight: (terminalHeight) => set({ terminalHeight: clamp(terminalHeight, TERMINAL_MIN, TERMINAL_MAX) }),
}));
