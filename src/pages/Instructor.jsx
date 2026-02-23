import { Link, useParams } from "react-router-dom";
import { InstructorSection } from "@/features/instructor/Instructor";
import { useMockApi } from "@/context/MockApiContext";

export const Instructor = () => {
  const { id } = useParams();
  const { instructors = [], loading } = useMockApi();
  const selectedInstructor = id
    ? instructors.find((item) => item.id === id || item.slug === id)
    : instructors[0];

  if (loading.list) {
    return <section className="py-20 text-center text-muted-foreground">Loading instructor profile...</section>;
  }

  if (!selectedInstructor) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        Instructor profile not found.
        <div className="mt-4">
          <Link to="/instructors" className="text-[#FF3B30]">Back to instructor page</Link>
        </div>
      </section>
    );
  }

  return <InstructorSection instructor={selectedInstructor} />;
};
