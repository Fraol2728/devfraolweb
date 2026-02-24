import { create } from "zustand";

type LayoutState = {
  terminalOpen: boolean;
  leftWidth: number;
  terminalHeight: number;
  toggleTerminal: () => void;
  setLeftWidth: (w: number) => void;
  setTerminalHeight: (h: number) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  terminalOpen: true,
  leftWidth: 280,
  terminalHeight: 190,
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  setLeftWidth: (leftWidth) => set({ leftWidth }),
  setTerminalHeight: (terminalHeight) => set({ terminalHeight }),
}));
