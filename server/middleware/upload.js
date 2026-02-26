import fs from "fs";
import path from "path";
import multer from "multer";
import { MAX_UPLOAD_SIZE_BYTES, UPLOADS_DIR } from "../utils/constants.js";

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const safeOriginal = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    cb(null, `${Date.now()}-${safeOriginal}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: MAX_UPLOAD_SIZE_BYTES },
});

export const thumbnailUpload = upload.single("thumbnail");

export const getFileExtension = (fileName) => path.extname(fileName).toLowerCase();
