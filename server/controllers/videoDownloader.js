import path from "path";
import { downloadYouTubeVideo, getPlaceholderSocialDownload, isValidUrl } from "../services/videoService.js";
import { UPLOADS_DIR } from "../utils/constants.js";
import { safeDeleteFile } from "../utils/fileCleanup.js";

const allowedPlatforms = ["youtube", "tiktok", "instagram"];

export const downloadVideoController = async (req, res) => {
  const { url, platform } = req.body;

  if (!url || !platform) {
    return res.status(400).json({ success: false, message: "url and platform are required." });
  }

  const normalizedPlatform = platform.toLowerCase();
  if (!allowedPlatforms.includes(normalizedPlatform)) {
    return res.status(400).json({ success: false, message: "Unsupported platform." });
  }

  if (!isValidUrl(url)) {
    return res.status(400).json({ success: false, message: "Invalid URL provided." });
  }

  if (normalizedPlatform === "youtube") {
    let downloadedPath;
    try {
      downloadedPath = await downloadYouTubeVideo(url, UPLOADS_DIR);
      return res.download(downloadedPath, path.basename(downloadedPath), async () => {
        await safeDeleteFile(downloadedPath);
      });
    } catch (error) {
      await safeDeleteFile(downloadedPath);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  const placeholder = await getPlaceholderSocialDownload(url, normalizedPlatform);
  return res.status(202).json({ success: true, data: placeholder });
};
