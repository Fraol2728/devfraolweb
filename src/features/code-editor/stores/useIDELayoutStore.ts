import { create } from "zustand";

type ActivityTab = "explorer" | "search" | "git" | "extensions";

type IDELayoutState = {
  isSidePanelOpen: boolean;
  isBottomPanelOpen: boolean;
  activeActivityTab: ActivityTab;
  sidePanelWidth: number;
  bottomPanelHeight: number;
  toggleSidePanel: () => void;
  toggleBottomPanel: () => void;
  setActiveActivityTab: (tab: ActivityTab) => void;
  setSidePanelWidth: (width: number) => void;
  setBottomPanelHeight: (height: number) => void;
};

type PersistedLayoutState = Pick<
  IDELayoutState,
  "isSidePanelOpen" | "isBottomPanelOpen" | "activeActivityTab" | "sidePanelWidth" | "bottomPanelHeight"
>;

const STORAGE_KEY = "ide-layout-store";
const SIDE_PANEL_MIN = 180;
const SIDE_PANEL_MAX = 600;
const BOTTOM_PANEL_MIN = 120;
const DEFAULT_BOTTOM_PANEL_MAX = 420;

const clampSidePanelWidth = (width: number) => Math.max(SIDE_PANEL_MIN, Math.min(SIDE_PANEL_MAX, width));
const getBottomPanelMax = () => {
  if (typeof window === "undefined") return DEFAULT_BOTTOM_PANEL_MAX;
  return Math.floor(window.innerHeight * 0.5);
};
const clampBottomPanelHeight = (height: number) => Math.max(BOTTOM_PANEL_MIN, Math.min(getBottomPanelMax(), height));

const defaultState: PersistedLayoutState = {
  isSidePanelOpen: true,
  isBottomPanelOpen: true,
  activeActivityTab: "explorer",
  sidePanelWidth: 260,
  bottomPanelHeight: 220,
};

const getInitialState = (): PersistedLayoutState => {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<PersistedLayoutState>;
    return {
      isSidePanelOpen: parsed.isSidePanelOpen ?? defaultState.isSidePanelOpen,
      isBottomPanelOpen: parsed.isBottomPanelOpen ?? defaultState.isBottomPanelOpen,
      activeActivityTab: parsed.activeActivityTab ?? defaultState.activeActivityTab,
      sidePanelWidth: clampSidePanelWidth(parsed.sidePanelWidth ?? defaultState.sidePanelWidth),
      bottomPanelHeight: clampBottomPanelHeight(parsed.bottomPanelHeight ?? defaultState.bottomPanelHeight),
    };
  } catch {
    return defaultState;
  }
};

export const useIDELayoutStore = create<IDELayoutState>((set, get) => {
  const persistState = () => {
    if (typeof window === "undefined") return;
    const state = get();
    const snapshot: PersistedLayoutState = {
      isSidePanelOpen: state.isSidePanelOpen,
      isBottomPanelOpen: state.isBottomPanelOpen,
      activeActivityTab: state.activeActivityTab,
      sidePanelWidth: state.sidePanelWidth,
      bottomPanelHeight: state.bottomPanelHeight,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  };

  const initialState = getInitialState();

  return {
    ...initialState,
    toggleSidePanel: () => {
      set((state) => ({ isSidePanelOpen: !state.isSidePanelOpen }));
      persistState();
    },
    toggleBottomPanel: () => {
      set((state) => ({ isBottomPanelOpen: !state.isBottomPanelOpen }));
      persistState();
    },
    setActiveActivityTab: (tab) => {
      set({ activeActivityTab: tab });
      persistState();
    },
    setSidePanelWidth: (width) => {
      set({ sidePanelWidth: clampSidePanelWidth(width) });
      persistState();
    },
    setBottomPanelHeight: (height) => {
      set({ bottomPanelHeight: clampBottomPanelHeight(height) });
      persistState();
    },
  };
});
