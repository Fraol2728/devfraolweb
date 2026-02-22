import { InstructorHero } from "@/features/instructor/InstructorHero";
import { InstructorBio } from "@/features/instructor/InstructorBio";
import { TeachingPhilosophy } from "@/features/instructor/TeachingPhilosophy";
import { Achievements } from "@/features/instructor/Achievements";
import { CTASection } from "@/features/instructor/CTASection";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const InstructorPage = () => {
  useSeoMeta({
    title: "Instructor | Dev Fraol Academy",
    description: "Meet Dev Fraol and explore the teaching approach behind practical web development and graphic design learning.",
    ogDescription: "Discover Dev Fraol's mentorship style, tools, and methods for career-ready learning.",
  });

  return (
    <section className="px-4 pb-16 sm:px-6" aria-label="Instructor page">
      <div className="container mx-auto max-w-6xl">
        <InstructorHero />
        <InstructorBio />
        <TeachingPhilosophy />
        <Achievements />
        <CTASection />
      </div>
    </section>
  );
};
