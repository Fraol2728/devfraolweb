import { lazy, Suspense } from "react";
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
import logoDark from "@/assets/Logo dark.png";

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
const PythonCodeEditor = lazy(() => import("@/pages/CodeEditor").then((m) => ({ default: m.CodeEditor })));
const Admin = lazy(() => import("@/pages/Admin").then((m) => ({ default: m.Admin })));
const Login = lazy(() => import("@/pages/Login").then((m) => ({ default: m.Login })));
const Signup = lazy(() => import("@/pages/Signup").then((m) => ({ default: m.Signup })));
const AuthRedirectPlaceholder = lazy(() => import("@/pages/AuthRedirectPlaceholder"));
const SimplePlaceholderPage = lazy(() => import("@/pages/SimplePlaceholderPage").then((m) => ({ default: m.SimplePlaceholderPage })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

function App() {
  return (
    <AppProviders>
      <UserProvider>
        <ErrorBoundary>
          <CodeFlowBackground />
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut" }}>
            <ScrollToTop />
            <FixedAuthActions />
            <div className="pointer-events-none fixed right-2 top-2 z-50 rounded-2xl border border-[#FF3B30]/45 bg-[linear-gradient(145deg,rgba(255,59,48,0.2),rgba(40,10,10,0.45))] p-1.5 shadow-[0_0_24px_rgba(255,59,48,0.42),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl sm:right-3 sm:top-3 sm:p-2">
              <img
                src={logoDark}
                alt="Devfraol logo"
                className="block h-6 w-auto select-none drop-shadow-[0_0_10px_rgba(255,59,48,0.75)] sm:h-7"
              />
            </div>
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
                  <Route path="/devfraol-apps" element={<Navigate to="/apps" replace />} />
                  <Route path="/apps/qr-generator" element={<Navigate to="/apps/advanced-tools" replace />} />
                  <Route path="/apps/background-remover" element={<Navigate to="/apps/advanced-tools" replace />} />
                  <Route path="/apps/file-converter" element={<Navigate to="/apps/advanced-tools" replace />} />
                  <Route path="/apps/youtube-downloader" element={<Navigate to="/apps/video-downloaders" replace />} />
                  <Route path="/apps/tiktok-downloader" element={<Navigate to="/apps/video-downloaders" replace />} />
                  <Route path="/apps/instagram-downloader" element={<Navigate to="/apps/video-downloaders" replace />} />
                  <Route path="/apps/:id" element={<AppDetail />} />
                  <Route path="/apps/python-code-editor" element={<PythonCodeEditor />} />
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
        </ErrorBoundary>
      </UserProvider>
    </AppProviders>
  );
}

export default App;
