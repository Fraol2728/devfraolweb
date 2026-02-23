import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { InstructorDetail } from "@/pages/InstructorDetail";
import AuthRedirectPlaceholder from "@/pages/AuthRedirectPlaceholder";
import { UserProvider } from "@/context/UserContext";
import { SimplePlaceholderPage } from "@/pages/SimplePlaceholderPage";
import { FixedAuthActions } from "@/features/auth/FixedAuthActions";
import { CodeFlowBackground } from "@/components/common/CodeFlowBackground";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  useEffect(() => {
    if (welcomeComplete) return undefined;

    const fallbackTimer = window.setTimeout(() => setWelcomeComplete(true), 9000);
    return () => window.clearTimeout(fallbackTimer);
  }, [welcomeComplete]);

  return (
    <AppProviders>
      <UserProvider>
        <ErrorBoundary>
          <CodeFlowBackground />
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut" }}>
            <ScrollToTop />
            <FixedAuthActions />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/courses/:id/enroll" element={<CourseLearning />} />
                <Route path="/learn/:courseId" element={<CourseLearning />} />
                <Route path="/instructors" element={<Instructor />} />
                <Route path="/instructors/:id" element={<InstructorDetail />} />
                <Route path="/instructor" element={<Navigate to="/instructors" replace />} />
                <Route path="/instructor/:id" element={<Instructor />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/blogs/:slug" element={<BlogDetail />} />
                <Route path="/blog" element={<Navigate to="/blogs" replace />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/apps/:id" element={<AppDetail />} />
                <Route path="/code-editor" element={<CodeEditor />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth/google" element={<AuthRedirectPlaceholder />} />
                <Route path="/auth/github" element={<AuthRedirectPlaceholder />} />
                <Route path="/my-courses" element={<SimplePlaceholderPage title="My Courses" />} />
                <Route path="/settings" element={<SimplePlaceholderPage title="Settings" />} />
              </Route>
              <Route path="/admin" element={<Admin />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Analytics />
          </motion.div>

          {!welcomeComplete ? <WelcomePage onWelcomeComplete={() => setWelcomeComplete(true)} /> : null}
        </ErrorBoundary>
      </UserProvider>
    </AppProviders>
  );
}

export default App;
