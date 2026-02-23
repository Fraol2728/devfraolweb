import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { FeaturedApps } from "@/components/home/FeaturedApps";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { HERO_IMAGE, faqItems, mockApps, mockBlogs, mockCourses } from "@/data/homeData";

export const Home = () => {
  const [courses, setCourses] = useState([]);
  const [apps, setApps] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useSeoMeta(
    "Dev Fraol Academy – Learn, Code, Create",
    "Join Dev Fraol Academy to explore coding courses, apps, and blogs. Improve your skills, learn new technologies, and create projects.",
    {
      ogImage: HERO_IMAGE,
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setApps(mockApps);
      setBlogs(mockBlogs);
      setLoading(false);
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-950">
      <HeroSection backgroundImage={HERO_IMAGE} />
      <FeaturedCourses courses={courses} loading={loading} />
      <FeaturedApps apps={apps} loading={loading} />
      <BlogPreview posts={blogs} loading={loading} />
      <FAQSection faqs={faqItems} />
      <NewsletterSignup />
    </div>
  );
};
