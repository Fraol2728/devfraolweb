import { create } from "zustand";

type ContextMenuType = "explorer" | "editor" | null;

type ContextMenuState = {
  visible: boolean;
  x: number;
  y: number;
  type: ContextMenuType;
  targetId: string | null;
  open: (x: number, y: number, type: Exclude<ContextMenuType, null>, targetId?: string) => void;
  close: () => void;
};

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  visible: false,
  x: 0,
  y: 0,
  type: null,
  targetId: null,
  open: (x, y, type, targetId = null) => set({ visible: true, x, y, type, targetId }),
  close: () => set({ visible: false, type: null, targetId: null }),
}));
