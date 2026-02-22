import { create } from "zustand";

type LayoutState = {
  leftOpen: boolean;
  rightOpen: boolean;
  terminalOpen: boolean;
  leftWidth: number;
  rightWidth: number;
  terminalHeight: number;
  toggleLeft: () => void;
  toggleRight: () => void;
  toggleTerminal: () => void;
  setLeftWidth: (w: number) => void;
  setRightWidth: (w: number) => void;
  setTerminalHeight: (h: number) => void;
};

const small = typeof window !== "undefined" ? window.innerWidth < 1024 : false;

export const useLayoutStore = create<LayoutState>((set) => ({
  leftOpen: true,
  rightOpen: !small,
  terminalOpen: true,
  leftWidth: 260,
  rightWidth: 360,
  terminalHeight: 180,
  toggleLeft: () => set((s) => ({ leftOpen: !s.leftOpen })),
  toggleRight: () => set((s) => ({ rightOpen: !s.rightOpen })),
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  setLeftWidth: (leftWidth) => set({ leftWidth }),
  setRightWidth: (rightWidth) => set({ rightWidth }),
  setTerminalHeight: (terminalHeight) => set({ terminalHeight }),
}));
