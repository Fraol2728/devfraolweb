import jwt from "jsonwebtoken";

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return "";
  }

  return authHeader.slice(7);
};

export const requireAuth = (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized access." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { id: decoded.id, username: decoded.username };
    return next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};
