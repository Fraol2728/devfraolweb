import { Code2, FileCog, FileImage, Video } from "lucide-react";

export const appsCatalog = [
  {
    id: "video-downloader",
    name: "Video Downloader",
    description: "Paste a YouTube/TikTok/Instagram URL, fetch details, and download through the backend.",
    buttonLabel: "Use Tool",
    category: "Downloaders",
    icon: Video,
    tool: "downloader",
  },
  {
    id: "background-remover",
    name: "Background Remover",
    description: "Upload an image, remove its background using the backend API, and download the result.",
    buttonLabel: "Use Tool",
    category: "Editors",
    icon: FileImage,
    tool: "background-remover",
  },
  {
    id: "online-code-editor",
    name: "Online Code Editor",
    description: "Run JavaScript in-browser or execute code snippets through the backend runtime endpoint.",
    buttonLabel: "Use Tool",
    category: "Editors",
    icon: Code2,
    tool: "code-editor",
  },
  {
    id: "file-converter",
    name: "File Converter",
    description: "Drag files in, convert formats through the API, and auto-download the converted output.",
    buttonLabel: "Use Tool",
    category: "Converters",
    icon: FileCog,
    tool: "converter",
  },
];

export const appCategories = ["All", "Converters", "Downloaders", "Editors"];
