import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-[#FF3B30] text-white hover:bg-[#ff4f45] hover:shadow-[0_10px_24px_rgba(255,59,48,0.35)]",
  outline: "border border-white/20 text-foreground/90 hover:border-[#FF3B30]/60 hover:text-[#FF3B30]",
  pill: "rounded-full",
};

export const Button = ({ className, variant = "primary", type = "button", ...props }) => (
  <button
    type={type}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      variants[variant],
      className,
    )}
    {...props}
  />
);
