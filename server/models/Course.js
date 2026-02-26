import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Module title is required."],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false },
);

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course title is required."],
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  category: {
    type: String,
    default: "",
    trim: true,
  },
  instructor: {
    type: String,
    default: "Dev Fraol",
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  modules: {
    type: [moduleSchema],
    default: [],
  },
  thumbnailUrl: {
    type: String,
    default: "",
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
