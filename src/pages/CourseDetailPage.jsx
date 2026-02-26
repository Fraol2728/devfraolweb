import { Navigate, useParams } from "react-router-dom";

export const CourseDetailPage = () => {
  const { courseId } = useParams();
  return <Navigate to={`/course/${courseId}`} replace />;
};
