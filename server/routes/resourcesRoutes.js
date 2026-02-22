import { Router } from "express";
import { getResourcesController } from "../controllers/resources.js";

const router = Router();

router.get("/", getResourcesController);

export default router;
