import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.resolve(__dirname, "../data/adminData.json");

export const readAdminStore = async () => {
  const raw = await fs.readFile(STORE_PATH, "utf-8");
  return JSON.parse(raw);
};

export const writeAdminStore = async (data) => {
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
};

export const withStoreMutation = async (mutator) => {
  const store = await readAdminStore();
  const nextStore = await mutator(store);
  await writeAdminStore(nextStore);
  return nextStore;
};

export const createIdFromTitle = (title) =>
  String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
