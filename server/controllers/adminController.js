import { createIdFromTitle, readAdminStore, withStoreMutation } from "../utils/adminStore.js";

const CRUD_KEYS = ["apps", "resources"];

const ensureKey = (key) => {
  if (!CRUD_KEYS.includes(key)) {
    throw new Error("Unsupported admin collection.");
  }
};

export const listCollection = (key) => async (_req, res) => {
  ensureKey(key);
  const store = await readAdminStore();
  return res.json({ success: true, data: store[key] ?? [] });
};

export const createItem = (key) => async (req, res) => {
  ensureKey(key);
  const payload = req.body || {};

  if (!payload.title) {
    return res.status(400).json({ success: false, message: "Title is required." });
  }

  const nextStore = await withStoreMutation((store) => {
    const id = payload.id || createIdFromTitle(payload.title);
    const item = { ...payload, id, slug: payload.slug || id };
    const activity = { id: `${Date.now()}`, action: `Created ${key.slice(0, -1)}`, target: item.title, timestamp: new Date().toISOString() };
    return {
      ...store,
      [key]: [item, ...(store[key] ?? []).filter((entry) => entry.id !== id)],
      activity: [activity, ...(store.activity ?? [])].slice(0, 20),
    };
  });

  return res.status(201).json({ success: true, data: nextStore[key][0] });
};

export const updateItem = (key) => async (req, res) => {
  ensureKey(key);
  const { id } = req.params;
  const payload = req.body || {};
  let updated = null;

  const nextStore = await withStoreMutation((store) => {
    const items = (store[key] ?? []).map((entry) => {
      if (entry.id !== id) return entry;
      updated = { ...entry, ...payload, id: entry.id };
      return updated;
    });

    const activity = { id: `${Date.now()}`, action: `Updated ${key.slice(0, -1)}`, target: updated?.title || id, timestamp: new Date().toISOString() };
    return { ...store, [key]: items, activity: [activity, ...(store.activity ?? [])].slice(0, 20) };
  });

  if (!updated) {
    return res.status(404).json({ success: false, message: "Item not found." });
  }

  return res.json({ success: true, data: updated, list: nextStore[key] });
};

export const deleteItem = (key) => async (req, res) => {
  ensureKey(key);
  const { id } = req.params;
  let removed;

  const nextStore = await withStoreMutation((store) => {
    const existing = store[key] ?? [];
    removed = existing.find((entry) => entry.id === id);
    const activity = { id: `${Date.now()}`, action: `Deleted ${key.slice(0, -1)}`, target: removed?.title || id, timestamp: new Date().toISOString() };
    return {
      ...store,
      [key]: existing.filter((entry) => entry.id !== id),
      activity: [activity, ...(store.activity ?? [])].slice(0, 20),
    };
  });

  if (!removed) {
    return res.status(404).json({ success: false, message: "Item not found." });
  }

  return res.json({ success: true, data: nextStore[key] });
};

export const getDashboardStats = async (_req, res) => {
  const store = await readAdminStore();
  return res.json({
    success: true,
    data: {
      apps: store.apps?.length ?? 0,
      resources: store.resources?.length ?? 0,
      users: store.users?.length ?? 0,
      activity: store.activity ?? [],
    },
  });
};

export const listUsers = async (_req, res) => {
  const store = await readAdminStore();
  return res.json({ success: true, data: store.users ?? [] });
};
