import { IMAGE_MIME_TYPES } from "../utils/constants.js";
import { removeBackground } from "../services/bgRemovalService.js";
import { safeDeleteFile } from "../utils/fileCleanup.js";

export const bgRemoveController = async (req, res) => {
  const uploaded = req.file;

  if (!uploaded) {
    return res.status(400).json({ success: false, message: "Image file is required." });
  }

  if (!IMAGE_MIME_TYPES.includes(uploaded.mimetype)) {
    await safeDeleteFile(uploaded.path);
    return res.status(400).json({ success: false, message: "Unsupported image format." });
  }

  let outputPath;
  try {
    outputPath = await removeBackground(uploaded.path);

    return res.download(outputPath, "background-removed.png", async () => {
      await safeDeleteFile(uploaded.path);
      await safeDeleteFile(outputPath);
    });
  } catch (error) {
    await safeDeleteFile(uploaded.path);
    await safeDeleteFile(outputPath);
    return res.status(500).json({ success: false, message: error.message });
  }
};
