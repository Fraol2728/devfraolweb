import { Router } from "express";
import { getPublicResources } from "../controllers/catalogController.js";

const router = Router();
router.get("/", getPublicResources);

export default router;
