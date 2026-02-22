import { Navbar } from "@/features/navbar/Navbar";
import { StarBackground } from "@/components/common/Background";
import { HeroSection } from "@/features/hero/Hero";
import { AboutSection } from "@/features/about/About";
import { SkillsSection } from "@/features/skills/Skills";
import { ProjectsSection } from "@/features/projects/Projects";
import { TestimonialSection } from "@/features/testimonials/Testimonials";
import { ContactSection } from "@/features/contact/Contact";
import { Footer } from "@/features/footer/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
