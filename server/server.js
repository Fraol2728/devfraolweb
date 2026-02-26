/* eslint-env node */
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import coursesRouter from "./routes/courses.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.set("trust proxy", 1);

app.use(
  cors({
    origin: CLIENT_ORIGIN.split(",").map((origin) => origin.trim()),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/courses", coursesRouter);

app.use((err, req, res, _next) => {
  console.error(`Unhandled error on ${req.method} ${req.originalUrl}:`, err);

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ success: false, message: err.message });
  }

  return res.status(500).json({ success: false, message: "Internal server error." });
});

const connectToDatabase = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined. Add it to your environment variables.");
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
};

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Course backend is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
