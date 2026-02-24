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

export const useLayoutStore = create<LayoutState>((set) => ({
  terminalOpen: true,
  explorerOpen: true,
  leftWidth: 280,
  terminalHeight: 190,
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  toggleExplorer: () => set((s) => ({ explorerOpen: !s.explorerOpen })),
  setLeftWidth: (leftWidth) => set({ leftWidth }),
  setTerminalHeight: (terminalHeight) => set({ terminalHeight }),
}));
