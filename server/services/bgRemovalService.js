import fs from "fs";

export const removeBackground = async (inputPath) => {
  // Placeholder strategy: return original image untouched.
  // Replace with remove.bg API or rembg integration for real background removal.
  const outputPath = `${inputPath}-no-bg.png`;
  await fs.promises.copyFile(inputPath, outputPath);
  return outputPath;
};
