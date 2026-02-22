import { RESOURCES } from "../utils/constants.js";

export const getResourcesController = (req, res) => {
  const { category } = req.query;

  const data = category
    ? RESOURCES.filter((resource) => resource.category.toLowerCase() === String(category).toLowerCase())
    : RESOURCES;

  return res.json({ success: true, data });
};
