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
    title: "Dev Fraol Academy | Web Development, Design Courses & Devfraol Apps",
    description:
      "Dev Fraol Academy helps you master web development, graphic design, and digital skills through project-first courses and Devfraol Apps.",
    keywords: [
      "Dev Fraol Academy",
      "Devfraol Apps",
      "web development courses",
      "graphic design courses",
      "learn coding online",
      "digital marketing tools",
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Dev Fraol Academy",
          url: "https://devfraol.com",
          logo: "https://devfraol.com/logo.png",
        },
        {
          "@type": "WebSite",
          name: "Dev Fraol Academy",
          url: "https://devfraol.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://devfraol.com/apps",
            "query-input": "required name=search_term_string",
          },
        },
      ],
    },
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
