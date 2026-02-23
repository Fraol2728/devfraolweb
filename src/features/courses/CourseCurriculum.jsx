import { CurriculumAccordion } from "@/features/courses/CurriculumAccordion";

const fallbackCurriculum = [
  {
    id: 1,
    title: "Introduction",
    duration: "45 min",
    lessons: [
      { id: 1, title: "Welcome", duration: "5 min" },
      { id: 2, title: "Environment Setup", duration: "15 min" },
      { id: 3, title: "Project Overview", duration: "25 min" },
    ],
  },
  {
    id: 2,
    title: "Core Concepts",
    duration: "1h 20m",
    lessons: [
      { id: 1, title: "State & Props", duration: "20 min" },
      { id: 2, title: "Component Architecture", duration: "30 min" },
      { id: 3, title: "Project Structure", duration: "30 min" },
    ],
  },
];

export const CourseCurriculum = ({ curriculum = [], courseId }) => {
  const curriculumData = curriculum.length ? curriculum : fallbackCurriculum;

  return <CurriculumAccordion data={curriculumData} courseId={courseId} />;
};
