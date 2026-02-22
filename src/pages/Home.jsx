import { Hero } from "@/features/home/Hero";
import { TracksOverview } from "@/features/home/TracksOverview";
import { FeaturedCourses } from "@/features/home/FeaturedCourses";
import { WhyLearn } from "@/features/home/WhyLearn";
import { TestimonialsPreview } from "@/features/home/TestimonialsPreview";
import { FAQPreview } from "@/features/home/FAQPreview";
import { BlogPreview } from "@/features/home/BlogPreview";
import { CTA } from "@/features/home/CTA";
import { Newsletter } from "@/features/home/Newsletter";

export const Home = () => {
  return (
    <>
      <Hero />
      <TracksOverview />
      <FeaturedCourses />
      <WhyLearn />
      <TestimonialsPreview />
      <FAQPreview />
      <BlogPreview />
      <CTA />
      <Newsletter />
    </>
  );
};
