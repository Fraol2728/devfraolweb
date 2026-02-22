import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";

export const isValidUrl = (value) => {
  try {
    const parsed = new URL(value);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

export const downloadYouTubeVideo = async (url, outputDir) => {
  if (!ytdl.validateURL(url)) {
    throw new Error("Invalid YouTube URL.");
  }

  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title.replace(/[^a-zA-Z0-9_.-]/g, "_");
  const outputPath = path.join(outputDir, `${Date.now()}-${title}.mp4`);

  await new Promise((resolve, reject) => {
    ytdl(url, { quality: "highestvideo", filter: "audioandvideo" })
      .pipe(fs.createWriteStream(outputPath))
      .on("finish", resolve)
      .on("error", reject);
  });

  return outputPath;
};

export const getPlaceholderSocialDownload = async (url, platform) => {
  return {
    platform,
    sourceUrl: url,
    message:
      "Direct downloading for this platform is not enabled in this environment. Integrate a trusted API provider before production.",
    ready: false
  };
};
