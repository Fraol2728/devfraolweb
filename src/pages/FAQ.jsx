import { FAQSection } from "@/features/faq/FAQSection";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const FAQ = () => {
  useSeoMeta({
    title: "FAQ | Dev Fraol Academy",
    description: "Find answers about courses, enrollment, learning tracks, and support at Dev Fraol Academy.",
  });

  return <FAQSection />;
};
