import { useParams } from "react-router-dom";
import { InstructorSection } from "@/features/instructor/Instructor";
import { useMockApi } from "@/context/MockApiContext";

export const Instructor = () => {
  const { id } = useParams();
  const { users = [], loading } = useMockApi();
  const instructor = id ? users.find((user) => user.id === id || user.name?.toLowerCase().replace(/\s+/g, "-") === id) : null;

  if (loading.list) {
    return <section className="py-20 text-center text-muted-foreground">Loading instructor profile...</section>;
  }

  if (id && !instructor) {
    return <section className="py-20 text-center text-muted-foreground">Instructor profile not found. Showing default profile.</section>;
  }

  return <InstructorSection />;
};
