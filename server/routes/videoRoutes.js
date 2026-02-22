import { Router } from "express";
import { downloadVideoController } from "../controllers/videoDownloader.js";
import { heavyOperationLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post("/download", heavyOperationLimiter, downloadVideoController);

export default router;
