import { create } from "zustand";

export type Log = {
  id: string;
  type: "info" | "error";
  message: string;
};

type TerminalState = {
  logs: Log[];
  appendLog: (entry: Omit<Log, "id">) => void;
  clearLogs: () => void;
  runCode: () => void;
};

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useTerminalStore = create<TerminalState>((set) => ({
  logs: [],
  appendLog: (entry) => set((state) => ({ logs: [...state.logs, { id: makeId(), ...entry }] })),
  clearLogs: () => set({ logs: [] }),
  runCode: () => {
    set((state) => ({ logs: [...state.logs, { id: makeId(), type: "info", message: "Running..." }] }));
    window.setTimeout(() => {
      set((state) => ({ logs: [...state.logs, { id: makeId(), type: "info", message: "Execution finished." }] }));
    }, 500);
  },
}));
