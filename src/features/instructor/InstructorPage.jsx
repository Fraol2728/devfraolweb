import { useEffect } from "react";
import { InstructorHero } from "@/features/instructor/InstructorHero";
import { InstructorBio } from "@/features/instructor/InstructorBio";
import { TeachingPhilosophy } from "@/features/instructor/TeachingPhilosophy";
import { Achievements } from "@/features/instructor/Achievements";
import { CTASection } from "@/features/instructor/CTASection";

const setMetaTag = (selector, attribute, value) => {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
};

export const InstructorPage = () => {
  useEffect(() => {
    document.title = "Instructor | Dev Fraol Academy";
    setMetaTag('meta[name="description"]', "content", "Meet Dev Fraol and explore the teaching approach behind practical web development and graphic design learning.");
    setMetaTag('meta[property="og:title"]', "content", "Instructor | Dev Fraol Academy");
    setMetaTag('meta[property="og:description"]', "content", "Discover Dev Fraol's mentorship style, tools, and methods for career-ready learning.");
  }, []);

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
