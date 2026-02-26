/* eslint-env node */
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";
import convertRoutes from "./routes/convertRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import bgRoutes from "./routes/bgRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";
import resourcesRoutes from "./routes/resourcesRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";

import { cleanupOlderThan } from "./utils/fileCleanup.js";
import { UPLOADS_DIR } from "./utils/constants.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const ALLOWED_ORIGINS = FRONTEND_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean);

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/convert", convertRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/bg-remove", bgRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/catalog", catalogRoutes);

app.use("/api/admin", adminRoutes);

app.use((err, _req, res, _next) => {
  const message = err?.message || "Unexpected server error.";
  return res.status(500).json({ success: false, message });
});

setInterval(() => {
  cleanupOlderThan(UPLOADS_DIR, 30 * 60 * 1000);
}, 10 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`Dev Fraol Apps backend running on port ${PORT}`);
});
