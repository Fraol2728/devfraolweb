import { Suspense, lazy } from "react";
import { Hero } from "@/features/home/Hero";
import { TracksOverview } from "@/features/home/TracksOverview";
import { FeaturedCourses } from "@/features/home/FeaturedCourses";
import { WhyLearn } from "@/features/home/WhyLearn";
import { CTA } from "@/features/home/CTA";

const TestimonialsPreview = lazy(() => import("@/features/home/TestimonialsPreview").then((m) => ({ default: m.TestimonialsPreview })));
const FAQPreview = lazy(() => import("@/features/home/FAQPreview").then((m) => ({ default: m.FAQPreview })));
const BlogPreview = lazy(() => import("@/features/home/BlogPreview").then((m) => ({ default: m.BlogPreview })));
const Newsletter = lazy(() => import("@/features/home/Newsletter").then((m) => ({ default: m.Newsletter })));

const SectionSkeleton = () => <div className="mx-auto h-40 w-full max-w-6xl animate-pulse rounded-2xl border border-border/60 bg-card/40" />;

export const Home = () => {
  return (
    <>
      <Hero />
      <TracksOverview />
      <FeaturedCourses />
      <WhyLearn />
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsPreview />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQPreview />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <BlogPreview />
      </Suspense>
      <CTA />
      <Suspense fallback={<SectionSkeleton />}>
        <Newsletter />
      </Suspense>
    </>
  );
};
