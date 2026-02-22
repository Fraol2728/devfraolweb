import { Router } from "express";
import { convertFileController } from "../controllers/fileConverter.js";
import { upload } from "../middleware/upload.js";
import { heavyOperationLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post("/", heavyOperationLimiter, upload.single("file"), convertFileController);

export default router;
