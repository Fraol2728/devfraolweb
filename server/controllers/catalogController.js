import { readAdminStore } from "../utils/adminStore.js";

export const getPublicCourses = async (_req, res) => {
  const store = await readAdminStore();
  return res.json({ success: true, data: store.courses ?? [] });
};

export const getPublicApps = async (_req, res) => {
  const store = await readAdminStore();
  return res.json({ success: true, data: store.apps ?? [] });
};

export const getPublicResources = async (req, res) => {
  const store = await readAdminStore();
  const { category } = req.query;
  const resources = store.resources ?? [];
  const data = category
    ? resources.filter((resource) => resource.category?.toLowerCase() === String(category).toLowerCase())
    : resources;
  return res.json({ success: true, data });
};
