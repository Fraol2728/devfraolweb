import { Router } from "express";
import {
  addLesson,
  addModule,
  createCourse,
  deleteCourse,
  deleteLesson,
  deleteModule,
  getCourseById,
  getCourses,
  updateCourse,
  updateLesson,
  updateModule,
} from "../controllers/coursesController.js";

const router = Router();

router.get("/", getCourses);
router.get("/slug/:slug", getCourseById);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);

router.post("/:id/modules", addModule);
router.put("/:id/modules/:moduleId", updateModule);
router.delete("/:id/modules/:moduleId", deleteModule);

router.post("/:id/modules/:moduleId/lessons", addLesson);
router.put("/:id/modules/:moduleId/lessons/:lessonId", updateLesson);
router.delete("/:id/modules/:moduleId/lessons/:lessonId", deleteLesson);

router.delete("/:id", deleteCourse);

export default router;
