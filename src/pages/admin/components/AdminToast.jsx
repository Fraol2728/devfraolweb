import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { useToastStore } from "@/pages/admin/store/useToastStore";

const toastStyles = {
  success: {
    panel: "border-emerald-400/50 bg-emerald-500/15 text-emerald-50",
    icon: CircleCheck,
    iconClass: "text-emerald-300",
    live: "polite",
  },
  error: {
    panel: "border-rose-400/50 bg-rose-500/15 text-rose-50",
    icon: CircleAlert,
    iconClass: "text-rose-300",
    live: "assertive",
  },
  info: {
    panel: "border-sky-400/50 bg-sky-500/15 text-sky-50",
    icon: Info,
    iconClass: "text-sky-300",
    live: "polite",
  },
};

export const AdminToast = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="pointer-events-none absolute right-2 top-2 z-[70] w-[min(92vw,24rem)] sm:right-4 sm:top-4">
      <AnimatePresence>
        {toasts.map((toast) => {
          const variant = toastStyles[toast.type] ?? toastStyles.info;
          const Icon = variant.icon;

          return (
            <motion.div
              key={toast.id}
              role="status"
              aria-live={variant.live}
              initial={{ opacity: 0, x: 56 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 56 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={`pointer-events-auto mb-3 rounded-xl border px-3 py-3 shadow-xl backdrop-blur ${variant.panel}`}
            >
              <div className="flex items-start gap-2.5 pr-5">
                <Icon size={18} className={`mt-0.5 shrink-0 ${variant.iconClass}`} aria-hidden="true" />
                <p className="text-sm font-medium">{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="absolute right-2 top-2 rounded-md p-1 text-white/80 transition hover:bg-black/20 hover:text-white"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
