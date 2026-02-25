import { create } from "zustand";

type LayoutState = {
  sidebarOpen: boolean;
  bottomPanelOpen: boolean;
  sidebarWidth: number;
  bottomPanelHeight: number;
  toggleSidebar: () => void;
  toggleBottomPanel: () => void;
  setSidebarWidth: (width: number) => void;
  setBottomPanelHeight: (height: number) => void;
};

const clampSidebar = (width: number) => Math.max(180, Math.min(600, width));
const clampBottomPanel = (height: number) => Math.max(120, Math.min(500, height));

export const useLayoutStore = create<LayoutState>((set) => ({
  sidebarOpen: true,
  bottomPanelOpen: false,
  sidebarWidth: 260,
  bottomPanelHeight: 200,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleBottomPanel: () => set((state) => ({ bottomPanelOpen: !state.bottomPanelOpen })),
  setSidebarWidth: (width) => set({ sidebarWidth: clampSidebar(width) }),
  setBottomPanelHeight: (height) => set({ bottomPanelHeight: clampBottomPanel(height) }),
}));
