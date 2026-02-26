import { Router } from "express";
import mongoose from "mongoose";
import Course from "../models/Course.js";

const router = Router();

const isValidationError = (error) => error instanceof mongoose.Error.ValidationError;

router.get("/", async (_req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: courses });
  } catch (error) {
    console.error("GET /api/courses error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch courses." });
  }
});

router.post("/", async (req, res) => {
  console.log("POST /api/courses body:", req.body);

  try {
    const course = await Course.create(req.body);
    return res.status(201).json({ success: true, data: course });
  } catch (error) {
    console.error("POST /api/courses error:", error);

    if (isValidationError(error)) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: "Failed to create course." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(400).json({ success: false, message: "Invalid course ID." });
    }

    return res.json({ success: true, data: updatedCourse });
  } catch (error) {
    console.error(`PUT /api/courses/${req.params.id} error:`, error);

    if (isValidationError(error) || error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ success: false, message: "Invalid course data or ID." });
    }

    return res.status(500).json({ success: false, message: "Failed to update course." });
  }
});

router.delete("/:id", async (req, res) => {
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
