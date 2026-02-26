import profileImage from "@/assets/profile.png";

export const instructorTable = [
  {
    id: "dev-fraol",
    name: "Dev Fraol",
    bio: "Dev Fraol is a software engineer and educator helping developers become production-ready through practical web engineering workflows.",
    profile_image: profileImage,
    profile: "Full-stack engineer, mentor, and content creator focused on modern JavaScript and scalable frontend architecture.",
  },
];

export const courseDetailTable = [
  {
    id: "react-js",
    slug: "react-js-masterclass",
    title: "React JS Masterclass",
    tagline: "Build modern React applications with production workflows.",
    level: "Intermediate",
    duration: "8h 45m",
    total_lessons: 12,
    price: "$79",
    thumbnail: "/projects/project6.png",
    about: [
      "This course gives you a complete React workflow from component thinking to shipping polished user interfaces.",
      "You will build feature-driven screens, optimize rendering behavior, and work with scalable folder structures that are team-friendly.",
    ],
    requirements: ["Basic HTML/CSS", "JavaScript fundamentals", "Laptop with Node.js installed"],
    learn_items: [
      "Build dynamic pages with hooks and reusable components",
      "Create responsive layouts with Tailwind CSS",
      "Manage client-side routing and data loading",
      "Ship a course player experience with protected lessons",
      "Design modern UI with academy-style interactions",
      "Handle real-world component states cleanly",
    ],
    instructor_id: "dev-fraol",
  },
  {
    id: "javascript",
    slug: "javascript-foundations",
    title: "JavaScript Foundations",
    tagline: "Master core JavaScript with practical project patterns.",
    level: "Beginner",
    duration: "6h 20m",
    total_lessons: 10,
    price: "$59",
    thumbnail: "/projects/project3.png",
    about: ["Learn JavaScript syntax and logic with practical coding examples."],
    requirements: ["Basic computer skills"],
    learn_items: ["Variables", "Functions", "Arrays", "Objects"],
    instructor_id: "dev-fraol",
  },
  {
    id: "python",
    slug: "python-for-beginners",
    title: "Python for Beginners",
    tagline: "Start coding confidently with Python fundamentals.",
    level: "Beginner",
    duration: "7h 00m",
    total_lessons: 11,
    price: "$69",
    thumbnail: "/projects/project1.png",
    about: ["An introduction to Python programming and problem-solving."],
    requirements: ["No programming experience needed"],
    learn_items: ["Python syntax", "Control flow", "Functions"],
    instructor_id: "dev-fraol",
  },
];

export const modulesTable = [
  { id: "mod-1", course_id: "react-js-masterclass", title: "React Foundations" },
  { id: "mod-2", course_id: "react-js-masterclass", title: "Hooks and State Design" },
  { id: "mod-3", course_id: "react-js-masterclass", title: "Production Patterns" },
];

export const lessonsTable = [
  { id: "l-1", module_id: "mod-1", title: "Welcome & Course Roadmap", youtube_video_id: "Ke90Tje7VS0", duration: "08:40", is_preview: true },
  { id: "l-2", module_id: "mod-1", title: "Component Architecture", youtube_video_id: "bMknfKXIFA8", duration: "12:16", is_preview: true },
  { id: "l-3", module_id: "mod-1", title: "JSX and Props Deep Dive", youtube_video_id: "SqcY0GlETPk", duration: "15:22", is_preview: false },
  { id: "l-4", module_id: "mod-1", title: "State and Rendering Cycle", youtube_video_id: "O6P86uwfdR0", duration: "13:08", is_preview: false },
  { id: "l-5", module_id: "mod-2", title: "Effect Hook in Real Apps", youtube_video_id: "0ZJgIjIuY7U", duration: "16:55", is_preview: true },
  { id: "l-6", module_id: "mod-2", title: "Custom Hooks", youtube_video_id: "6ThXsUwLWvc", duration: "14:12", is_preview: false },
  { id: "l-7", module_id: "mod-2", title: "Context and Composition", youtube_video_id: "5LrDIWkK_Bc", duration: "11:33", is_preview: false },
  { id: "l-8", module_id: "mod-2", title: "Routing and Nested Layouts", youtube_video_id: "Law7wfdg_ls", duration: "09:44", is_preview: false },
  { id: "l-9", module_id: "mod-3", title: "Reusable UI Systems", youtube_video_id: "lAFbKzO-fss", duration: "10:40", is_preview: false },
  { id: "l-10", module_id: "mod-3", title: "Data Fetching Patterns", youtube_video_id: "0mVbNp1ol_w", duration: "12:49", is_preview: false },
  { id: "l-11", module_id: "mod-3", title: "Performance Essentials", youtube_video_id: "Y0AmWwH5j9Y", duration: "08:10", is_preview: false },
  { id: "l-12", module_id: "mod-3", title: "Final Project Walkthrough", youtube_video_id: "w7ejDZ8SWv8", duration: "17:22", is_preview: false },
];
