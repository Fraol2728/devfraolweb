import path from "path";
import { convertFile, withOutputName } from "../services/fileConversionService.js";
import { safeDeleteFile } from "../utils/fileCleanup.js";
import { SUPPORTED_CONVERSIONS } from "../utils/constants.js";
import { getFileExtension } from "../middleware/upload.js";

export const convertFileController = async (req, res) => {
  const uploaded = req.file;
  const { targetFormat } = req.body;

  if (!uploaded || !targetFormat) {
    return res.status(400).json({ success: false, message: "File and targetFormat are required." });
  }

  const inputExt = getFileExtension(uploaded.originalname);
  const supportedTargets = SUPPORTED_CONVERSIONS[inputExt] || [];

  if (!supportedTargets.includes(targetFormat.toLowerCase())) {
    await safeDeleteFile(uploaded.path);
    return res.status(400).json({
      success: false,
      message: `Unsupported conversion. Allowed for ${inputExt}: ${supportedTargets.join(", ") || "none"}`
    });
  }

  let outputPath;
  try {
    outputPath = await convertFile({
      inputPath: uploaded.path,
      inputExt,
      targetFormat: targetFormat.toLowerCase()
    });

    return res.download(outputPath, withOutputName(uploaded.originalname, targetFormat.toLowerCase()), async () => {
      await safeDeleteFile(uploaded.path);
      await safeDeleteFile(outputPath);
    });
  } catch (error) {
    await safeDeleteFile(uploaded.path);
    await safeDeleteFile(outputPath);
    return res.status(500).json({ success: false, message: error.message });
  }
};
