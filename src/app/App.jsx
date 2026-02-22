import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { WelcomePage } from "@/pages/WelcomePage";
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
import { AppDetail } from "@/pages/AppDetail";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { CourseLearning } from "@/pages/CourseLearning";
import AuthRedirectPlaceholder from "@/pages/AuthRedirectPlaceholder";

function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  return (
    <AppProviders>
      {!welcomeComplete ? (
        <WelcomePage onWelcomeComplete={() => setWelcomeComplete(true)} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut" }}>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:slug" element={<CourseDetail />} />
                <Route path="/learn/:courseId" element={<CourseLearning />} />
                <Route path="/instructor" element={<Instructor />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/apps/youtube-downloader" element={<AppDetail appId="youtube-downloader" />} />
                <Route path="/apps/tiktok-downloader" element={<AppDetail appId="tiktok-downloader" />} />
                <Route path="/apps/instagram-downloader" element={<AppDetail appId="instagram-downloader" />} />
                <Route path="/apps/background-remover" element={<AppDetail appId="background-remover" />} />
                <Route path="/apps/code-editor" element={<AppDetail appId="code-editor" />} />
                <Route path="/apps/file-converter" element={<AppDetail appId="file-converter" />} />
                <Route path="/apps/web-recommended" element={<AppDetail appId="web-recommended" />} />
                <Route path="/code-editor" element={<CodeEditor />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth/google" element={<AuthRedirectPlaceholder />} />
                <Route path="/auth/github" element={<AuthRedirectPlaceholder />} />
              </Route>
              <Route path="/admin" element={<Admin />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Analytics />
          </BrowserRouter>
        </motion.div>
      )}
    </AppProviders>
  );
}

export default App;
