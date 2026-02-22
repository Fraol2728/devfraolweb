import { Suspense, lazy } from "react";
import { Hero } from "@/features/home/Hero";
import { TracksOverview } from "@/features/home/TracksOverview";
import { FeaturedCourses } from "@/features/home/FeaturedCourses";
import { FeaturedApps } from "@/features/home/FeaturedApps";
import { CTA } from "@/features/home/CTA";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const FAQPreview = lazy(() => import("@/features/home/FAQPreview").then((m) => ({ default: m.FAQPreview })));
const BlogPreview = lazy(() => import("@/features/home/BlogPreview").then((m) => ({ default: m.BlogPreview })));
const Newsletter = lazy(() => import("@/features/home/Newsletter").then((m) => ({ default: m.Newsletter })));

const SectionSkeleton = () => <div className="mx-auto h-40 w-full max-w-6xl animate-pulse rounded-2xl border border-border/60 bg-card/40" />;

export const Home = () => {
  useSeoMeta({
    title: "Dev Fraol Academy | Web Development & Design Courses",
    description:
      "Master web development and graphic design with project-first courses, mentor support, and portfolio-ready outcomes at Dev Fraol Academy.",
  });

  return (
    <>
      <Hero />
      <TracksOverview />
      <FeaturedCourses />
      <FeaturedApps />
      <Suspense fallback={<SectionSkeleton />}>
        <BlogPreview />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQPreview />
      </Suspense>
      <CTA />
      <Suspense fallback={<SectionSkeleton />}>
        <Newsletter />
      </Suspense>
    </>
  );
};
