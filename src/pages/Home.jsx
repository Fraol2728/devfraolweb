import { HeroSection } from "@/features/hero/Hero";
import { HomeCoursesSection } from "@/features/homeCourses/HomeCourses";

const learnItems = [
  "Frontend architecture with React + Vite",
  "Backend API workflows and deployment",
  "UI/UX systems for product-ready interfaces",
  "Brand identity thinking for creative projects",
];

export const Home = () => {
  return (
    <>
      <HeroSection />
      <section className="py-16 px-4 sm:px-6">
        <div className="container max-w-6xl mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-bold">What You Will Learn</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {learnItems.map((item) => (
              <div key={item} className="rounded-xl border border-border bg-card/70 p-4">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <HomeCoursesSection />
    </>
  );
};
