import fs from "fs";

export const safeDeleteFile = async (filePath) => {
  if (!filePath) return;
  try {
    await fs.promises.unlink(filePath);
  } catch {
    // no-op
  }
};

export const cleanupOlderThan = async (directory, maxAgeMs) => {
  try {
    const files = await fs.promises.readdir(directory);
    const now = Date.now();

    await Promise.all(
      files.map(async (entry) => {
        const filePath = `${directory}/${entry}`;
        const stats = await fs.promises.stat(filePath);
        if (now - stats.mtimeMs > maxAgeMs) {
          await safeDeleteFile(filePath);
        }
      })
    );
  } catch {
    // no-op
  }
};
