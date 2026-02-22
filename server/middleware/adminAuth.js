/* eslint-env node */
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "devfraol-admin-token";

export const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const providedToken = bearerToken || req.headers["x-admin-token"];

  if (!providedToken || providedToken !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, message: "Unauthorized admin request." });
  }

  return next();
};

export const verifyAdminLogin = (req, res) => {
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";
  const { username, password } = req.body || {};

  if (username !== expectedUsername || password !== expectedPassword) {
    return res.status(401).json({ success: false, message: "Invalid admin credentials." });
  }

  return res.json({ success: true, token: ADMIN_TOKEN, user: { username: expectedUsername, role: "admin" } });
};
