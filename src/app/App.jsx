import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import { AboutPage } from "@/pages/AboutPage";
import { SkillsPage } from "@/pages/SkillsPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { TestimonialsPage } from "@/pages/TestimonialsPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFound } from "@/pages/NotFound";
import WelcomeScreen from "@/components/common/WelcomeScreen";
import { Analytics } from "@vercel/analytics/react";
import { AppProviders } from "@/app/providers";
import { MainLayout } from "@/pages/MainLayout";

function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  return (
    <AppProviders>
      {!welcomeComplete ? (
        <WelcomeScreen onWelcomeComplete={() => setWelcomeComplete(true)} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Analytics />
        </BrowserRouter>
      )}
    </AppProviders>
  );
}

export default App;
