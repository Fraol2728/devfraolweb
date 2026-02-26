import { Router } from "express";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import { requireAuth } from "../middleware/auth.js";
import { thumbnailUpload } from "../middleware/upload.js";

const router = Router();

const parseModules = (modules) => {
  if (modules === undefined) {
    return undefined;
  }

  if (Array.isArray(modules)) {
    return modules;
  }

  if (typeof modules === "string") {
    try {
      const parsedModules = JSON.parse(modules);
      if (!Array.isArray(parsedModules)) {
        throw new Error("Modules must be an array.");
      }
      return parsedModules;
    } catch {
      throw new Error("Modules must be a valid JSON array.");
    }
  }

  throw new Error("Modules must be an array.");
};

const normalizeCoursePayload = (body, file) => {
  const payload = { ...body };

  if (payload.featured !== undefined) {
    payload.featured = payload.featured === true || payload.featured === "true";
  }

  const parsedModules = parseModules(payload.modules);
  if (parsedModules !== undefined) {
    payload.modules = parsedModules;
  }

  if (file) {
    console.log("Uploaded thumbnail:", {
      originalname: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });
    payload.thumbnailUrl = `/uploads/${file.filename}`;
  }

  return payload;
};

router.get("/", async (_req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: courses });
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch courses." });
  }
});

router.post("/", requireAuth, thumbnailUpload, async (req, res) => {
  console.log("POST /api/courses body:", req.body);

  try {
    const payload = normalizeCoursePayload(req.body, req.file);

    if (!payload.title) {
      return res.status(400).json({ success: false, message: "Course title is required." });
    }

    const course = await Course.create(payload);
    return res.status(201).json({ success: true, data: course });
  } catch (error) {
    console.error("POST /api/courses error:", error);

    if (
      error instanceof mongoose.Error.ValidationError
      || error.message === "Modules must be an array."
      || error.message === "Modules must be a valid JSON array."
    ) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: "Failed to create course." });
  }
});

router.put("/:id", requireAuth, thumbnailUpload, async (req, res) => {
  console.log(`PUT /api/courses/${req.params.id} body:`, req.body);

  try {
    const payload = normalizeCoursePayload(req.body, req.file);

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(400).json({ success: false, message: "Invalid course ID." });
    }

    return res.json({ success: true, data: updatedCourse });
  } catch (error) {
    console.error(`PUT /api/courses/${req.params.id} error:`, error);

    if (
      error instanceof mongoose.Error.ValidationError
      || error instanceof mongoose.Error.CastError
      || error.message === "Modules must be an array."
      || error.message === "Modules must be a valid JSON array."
    ) {
      return res.status(400).json({ success: false, message: "Invalid course data or ID." });
    }

    return res.status(500).json({ success: false, message: "Failed to update course." });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(400).json({ success: false, message: "Invalid course ID." });
    }

    return res.json({ success: true, message: "Course deleted successfully." });
  } catch (error) {
    console.error(`DELETE /api/courses/${req.params.id} error:`, error);

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ success: false, message: "Invalid course ID." });
    }

    return res.status(500).json({ success: false, message: "Failed to delete course." });
  }
});

export default router;
