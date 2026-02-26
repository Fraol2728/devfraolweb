import { create } from "@/lib/zustand";

const TOAST_DURATION_MS = 4000;

const buildToast = ({ type = "info", message = "", duration = TOAST_DURATION_MS }) => ({
  id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  type,
  message,
  duration,
});

export const useToastStore = create((set, get) => ({
  toasts: [],
  addToast: ({ type = "info", message = "", duration = TOAST_DURATION_MS }) => {
    const toast = buildToast({ type, message, duration });
    set((state) => ({ toasts: [...state.toasts, toast] }));

    setTimeout(() => {
      const hasToast = get().toasts.some((item) => item.id === toast.id);
      if (hasToast) {
        get().removeToast(toast.id);
      }
    }, toast.duration);

    return toast.id;
  },
  removeToast: (toastId) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== toastId) }));
  },
}));
