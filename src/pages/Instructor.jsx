import { Link, useParams } from "react-router-dom";
import { InstructorSection } from "@/features/instructor/Instructor";
import { useInstructor } from "@/features/instructor/hooks/useInstructor";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const Instructor = () => {
  const { id } = useParams();
  const { instructors = [], loading } = useInstructor();
  const selectedInstructor = id ? instructors.find((item) => item.id === id || item.slug === id) : instructors[0];

  useSeoMeta({
    title: "Instructors | Dev Fraol Academy",
    description: "Meet Dev Fraol Academy instructors and mentors guiding project-first learning paths.",
  });

  if (loading.list) return <section className="py-20 text-center text-muted-foreground">Loading instructor profile...</section>;
  if (!selectedInstructor) {
    return <section className="py-20 text-center text-muted-foreground">Instructor profile not found.<div className="mt-4"><Link to="/instructors" className="text-[#FF3B30]">Back to instructor page</Link></div></section>;
  }
  return <InstructorSection instructor={selectedInstructor} />;
};
