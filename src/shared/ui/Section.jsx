import { cn } from "@/lib/utils";

export const Section = ({ className, children }) => (
  <section className={cn("py-6 md:py-8", className)}>{children}</section>
);
