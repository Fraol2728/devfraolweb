import { create } from "zustand";

export type Log = {
  id: string;
  type: "info" | "error";
  message: string;
};

type TerminalState = {
  logs: Log[];
  addLog: (type: Log["type"], message: string) => void;
  clear: () => void;
};

const createLogId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useTerminalStore = create<TerminalState>((set) => ({
  logs: [],
  addLog: (type, message) => {
    const normalized = message.trim();
    if (!normalized) return;
    set((state) => ({
      logs: [...state.logs, { id: createLogId(), type, message: normalized }],
    }));
  },
  clear: () => set({ logs: [] }),
}));
