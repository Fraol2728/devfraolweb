import { ContactPage } from "@/features/contact/ContactPage";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const Contact = () => {
  useSeoMeta({
    title: "Contact Dev Fraol Academy | Get in Touch",
    description: "Have questions about courses, enrollment, or mentorship at Dev Fraol Academy? Send us a message and our team will respond quickly.",
  });

  return <ContactPage />;
};
