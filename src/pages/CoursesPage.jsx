import { CourseCatalog } from "@/features/courses/CourseCatalog";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const CoursesPage = () => {
  useSeoMeta({
    title: "Course Catalog | Dev Fraol Academy",
    description: "Explore programming, graphics design, and computer operation courses with dynamic filters and search.",
  });

  return <CourseCatalog />;
};
