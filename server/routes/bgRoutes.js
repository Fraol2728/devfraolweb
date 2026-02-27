import { Router } from "express";
import { bgRemoveController } from "../controllers/bgRemover.js";
import { upload } from "../middleware/upload.js";
import { heavyOperationLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post("/", heavyOperationLimiter, upload.single("image"), bgRemoveController);

export default router;
