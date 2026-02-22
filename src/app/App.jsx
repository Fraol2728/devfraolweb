import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import { TestimonialsPage } from "@/pages/TestimonialsPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFound } from "@/pages/NotFound";
import WelcomeScreen from "@/components/common/WelcomeScreen";
import { Analytics } from "@vercel/analytics/react";
import { AppProviders } from "@/app/providers";
import { MainLayout } from "@/pages/MainLayout";
import { CoursesPage } from "@/pages/CoursesPage";
import { CourseDetailPage } from "@/pages/CourseDetailPage";
import { InstructorPage } from "@/pages/InstructorPage";

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
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:slug" element={<CourseDetailPage />} />
              <Route path="/instructor" element={<InstructorPage />} />
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
