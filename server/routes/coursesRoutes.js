import { Router } from "express";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controllers/coursesController.js";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
