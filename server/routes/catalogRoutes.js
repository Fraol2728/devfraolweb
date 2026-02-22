import { Router } from "express";
import { getPublicApps, getPublicCourses, getPublicResources } from "../controllers/catalogController.js";

const router = Router();

router.get("/courses", getPublicCourses);
router.get("/apps", getPublicApps);
router.get("/resources", getPublicResources);

export default router;
