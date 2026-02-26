import { useEffect } from "react";
import { useAdminStore } from "@/pages/admin/store/useAdminStore";

export const useAdminCourses = () => {
  const courses = useAdminStore((state) => state.courses);
  const isLoadingCourses = useAdminStore((state) => state.isLoadingCourses);
  const isSavingCourse = useAdminStore((state) => state.isSavingCourse);
  const coursesError = useAdminStore((state) => state.coursesError);

  const fetchCourses = useAdminStore((state) => state.fetchCourses);
  const getCourseById = useAdminStore((state) => state.getCourseById);
  const createCourse = useAdminStore((state) => state.createCourse);
  const updateCourse = useAdminStore((state) => state.updateCourse);
  const deleteCourse = useAdminStore((state) => state.deleteCourse);

  useEffect(() => {
    if (!courses.length && !isLoadingCourses) {
      fetchCourses().catch(() => {});
    }
  }, [courses.length, fetchCourses, isLoadingCourses]);

  return {
    courses,
    isLoadingCourses,
    isSavingCourse,
    coursesError,
    fetchCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};
