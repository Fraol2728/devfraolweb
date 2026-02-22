import { Router } from "express";
import { codeRunnerController } from "../controllers/codeRunner.js";
import { codeRunnerLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post("/run", codeRunnerLimiter, codeRunnerController);

export default router;
