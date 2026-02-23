import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { AppProviders } from "@/app/providers";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { MainLayout } from "@/pages/MainLayout";
import { UserProvider } from "@/context/UserContext";
import { FixedAuthActions } from "@/features/auth/FixedAuthActions";
import { CodeFlowBackground } from "@/components/common/CodeFlowBackground";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

const WelcomePage = lazy(() => import("@/pages/WelcomePage").then((m) => ({ default: m.WelcomePage })));
const Home = lazy(() => import("@/pages/Home").then((m) => ({ default: m.Home })));
const Courses = lazy(() => import("@/pages/Courses").then((m) => ({ default: m.Courses })));
const CourseDetail = lazy(() => import("@/pages/CourseDetail").then((m) => ({ default: m.CourseDetail })));
const CourseLearning = lazy(() => import("@/pages/CourseLearning").then((m) => ({ default: m.CourseLearning })));
const Instructor = lazy(() => import("@/pages/Instructor").then((m) => ({ default: m.Instructor })));
const InstructorDetail = lazy(() => import("@/pages/InstructorDetail").then((m) => ({ default: m.InstructorDetail })));
const Testimonials = lazy(() => import("@/pages/Testimonials").then((m) => ({ default: m.Testimonials })));
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));
const FAQ = lazy(() => import("@/pages/FAQ").then((m) => ({ default: m.FAQ })));
const Blog = lazy(() => import("@/pages/Blog").then((m) => ({ default: m.Blog })));
const BlogDetail = lazy(() => import("@/pages/BlogDetail").then((m) => ({ default: m.BlogDetail })));
const Apps = lazy(() => import("@/pages/Apps").then((m) => ({ default: m.Apps })));
const AppDetail = lazy(() => import("@/pages/AppDetail").then((m) => ({ default: m.AppDetail })));
const CodeEditor = lazy(() => import("@/pages/CodeEditor").then((m) => ({ default: m.CodeEditor })));
const Admin = lazy(() => import("@/pages/Admin").then((m) => ({ default: m.Admin })));
const Login = lazy(() => import("@/pages/Login").then((m) => ({ default: m.Login })));
const Signup = lazy(() => import("@/pages/Signup").then((m) => ({ default: m.Signup })));
const AuthRedirectPlaceholder = lazy(() => import("@/pages/AuthRedirectPlaceholder"));
const SimplePlaceholderPage = lazy(() => import("@/pages/SimplePlaceholderPage").then((m) => ({ default: m.SimplePlaceholderPage })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

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
            <Suspense fallback={<div className="flex min-h-[30vh] items-center justify-center"><LoadingSpinner label="Loading page..." /></div>}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:slug" element={<CourseDetail />} />
                  <Route path="/courses/:slug/enroll" element={<CourseLearning />} />
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
            </Suspense>
            <Analytics />
          </motion.div>

          {!welcomeComplete ? (
            <Suspense fallback={null}>
              <WelcomePage onWelcomeComplete={() => setWelcomeComplete(true)} />
            </Suspense>
          ) : null}
        </ErrorBoundary>
      </UserProvider>
    </AppProviders>
  );
}

export default App;
