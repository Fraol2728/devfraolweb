import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SERVER_ROOT = path.resolve(__dirname, "..");
export const UPLOADS_DIR = path.join(SERVER_ROOT, "uploads");
export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;

export const SUPPORTED_CONVERSIONS = {
  ".txt": ["pdf"],
  ".csv": ["xlsx", "pdf"],
  ".xlsx": ["csv", "pdf"],
  ".pdf": ["txt"]
};

export const IMAGE_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const RESOURCES = [
  {
    title: "MDN Web Docs",
    description: "Comprehensive docs for web technologies.",
    link: "https://developer.mozilla.org",
    icon: "book",
    category: "web"
  },
  {
    title: "Node.js Docs",
    description: "Official Node.js documentation and guides.",
    link: "https://nodejs.org/docs/latest/api/",
    icon: "server",
    category: "backend"
  },
  {
    title: "freeCodeCamp",
    description: "Interactive coding lessons and practice projects.",
    link: "https://www.freecodecamp.org/",
    icon: "code",
    category: "practice"
  },
  {
    title: "Roadmap.sh",
    description: "Structured learning roadmaps for developers.",
    link: "https://roadmap.sh",
    icon: "map",
    category: "career"
  }
];
