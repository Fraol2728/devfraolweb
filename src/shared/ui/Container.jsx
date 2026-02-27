import { cn } from "@/lib/utils";

export const Container = ({ className, children }) => (
  <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
);
