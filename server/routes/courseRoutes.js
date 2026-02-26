import { Router } from "express";
import { getCourseBySlug, getCourses } from "../controllers/courseController.js";

const router = Router();

router.get("/", getCourses);
router.get("/:slug", getCourseBySlug);

export default router;
