import { Router } from "express";
import { getPublicApps, getPublicResources } from "../controllers/catalogController.js";

const router = Router();

router.get("/apps", getPublicApps);
router.get("/resources", getPublicResources);

export default router;
