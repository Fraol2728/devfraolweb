import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PageHeader = ({ eyebrow = "Dev Fraol Academy", title, description, className }) => (
  <motion.header
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    className={cn("glass-panel rounded-3xl px-6 py-10 text-left", className)}
  >
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF3B30]">{eyebrow}</p>
    <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{title}</h1>
    {description ? <p className="mt-4 max-w-3xl text-foreground/75">{description}</p> : null}
  </motion.header>
);
