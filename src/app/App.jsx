import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import WelcomeScreen from "@/components/common/WelcomeScreen";
import { Analytics } from "@vercel/analytics/react";
import { AppProviders } from "@/app/providers";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { MainLayout } from "@/pages/MainLayout";
import { Home } from "@/pages/Home";
import { Courses } from "@/pages/Courses";
import { CourseDetail } from "@/pages/CourseDetail";
import { Instructor } from "@/pages/Instructor";
import { Testimonials } from "@/pages/Testimonials";
import { Contact } from "@/pages/Contact";
import { Blog } from "@/pages/Blog";
import { BlogDetail } from "@/pages/BlogDetail";
import { FAQ } from "@/pages/FAQ";
import { NotFound } from "@/pages/NotFound";
import { CodeEditor } from "@/pages/CodeEditor";
import { Apps } from "@/pages/Apps";
import { Admin } from "@/pages/Admin";

function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  return (
    <AppProviders>
      {!welcomeComplete ? (
        <WelcomeScreen onWelcomeComplete={() => setWelcomeComplete(true)} />
      ) : (
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/instructor" element={<Instructor />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/code-editor" element={<CodeEditor />} />
              <Route path="/admin" element={<Admin />} />
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
