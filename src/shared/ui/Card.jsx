import { cn } from "@/lib/utils";

export const Card = ({ className, children }) => (
  <article className={cn("rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(255,59,48,0.18)]", className)}>{children}</article>
);
