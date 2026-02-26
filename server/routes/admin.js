import { Router } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  console.log("POST /api/admin/login body:", req.body);

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required." });
  }

  try {
    const admin = await Admin.findOne({ username: username.trim() });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: admin._id.toString(), username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.json({
      success: true,
      token,
      admin: { id: admin._id, username: admin.username },
    });
  } catch (error) {
    console.error("POST /api/admin/login error:", error);
    return res.status(500).json({ success: false, message: "Failed to login." });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("_id username");

    if (!admin) {
      return res.status(401).json({ success: false, message: "Unauthorized access." });
    }

    return res.json({ success: true, admin });
  } catch (error) {
    console.error("GET /api/admin/me error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch admin profile." });
  }
});

export default router;
