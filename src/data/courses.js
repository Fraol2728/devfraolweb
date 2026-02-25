export const courses = [
  {
    id: "react-ui-mastery",
    title: "React UI Mastery",
    instructor: "Sahil Khan",
    category: "Frontend",
    duration: "6 weeks",
    level: "Intermediate",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    description:
      "Build production-ready React interfaces with modern architecture, animation patterns, and design systems.",
    syllabus: [
      {
        title: "Design Systems Foundation",
        topics: ["Component architecture", "Token strategy", "Accessibility-first patterns"],
      },
      {
        title: "Advanced State and Data Flow",
        topics: ["Context composition", "Performance optimization", "Server-state integration"],
      },
      {
        title: "Animation and Polish",
        topics: ["Framer Motion orchestration", "Micro-interactions", "Responsive UX refinement"],
      },
    ],
  },
  {
    id: "node-api-blueprint",
    title: "Node API Blueprint",
    instructor: "Maria Chen",
    category: "Backend",
    duration: "5 weeks",
    level: "Beginner",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Learn how to design and ship robust REST APIs using Node.js, Express, and practical security workflows.",
    syllabus: [
      {
        title: "API Fundamentals",
        topics: ["Routing and controllers", "Request validation", "Error handling conventions"],
      },
      {
        title: "Data and Persistence",
        topics: ["MongoDB integration", "Schema modeling", "Query optimization basics"],
      },
      {
        title: "Production Readiness",
        topics: ["Authentication", "Rate limiting", "Deployment checklist"],
      },
    ],
  },
  {
    id: "data-viz-lab",
    title: "Data Visualization Lab",
    instructor: "Alex Johnson",
    category: "Data",
    duration: "4 weeks",
    level: "Intermediate",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description:
      "Transform raw data into compelling dashboards and visual stories using modern frontend and analytics tools.",
    syllabus: [
      {
        title: "Visualization Principles",
        topics: ["Chart selection", "Color semantics", "Narrative framing"],
      },
      {
        title: "Interactive Dashboards",
        topics: ["Filtering and controls", "Responsive chart layouts", "Performance tuning"],
      },
      {
        title: "Delivery and Communication",
        topics: ["Insight presentation", "Stakeholder reporting", "Dashboard governance"],
      },
    ],
  },
  {
    id: "cloud-devops-starter",
    title: "Cloud DevOps Starter",
    instructor: "David Wilson",
    category: "DevOps",
    duration: "7 weeks",
    level: "Advanced",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    description:
      "Automate CI/CD pipelines, container workflows, and cloud deployments with a practical DevOps toolkit.",
    syllabus: [
      {
        title: "Containerization Essentials",
        topics: ["Docker workflows", "Image optimization", "Service composition"],
      },
      {
        title: "CI/CD Pipeline Engineering",
        topics: ["Workflow automation", "Testing gates", "Release strategies"],
      },
      {
        title: "Cloud Operations",
        topics: ["Infrastructure as code", "Monitoring fundamentals", "Incident response playbook"],
      },
    ],
  },
  {
    id: "ai-product-build",
    title: "AI Product Build",
    instructor: "Priya Nair",
    category: "AI",
    duration: "8 weeks",
    level: "Advanced",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    description:
      "Design and launch AI-assisted product features with prompt engineering, APIs, and responsible AI patterns.",
    syllabus: [
      {
        title: "AI Product Discovery",
        topics: ["Use case mapping", "Prompt iteration", "Evaluation metrics"],
      },
      {
        title: "Integration Architecture",
        topics: ["Model API orchestration", "Latency and cost controls", "Fallback strategies"],
      },
      {
        title: "Responsible Delivery",
        topics: ["Safety guardrails", "Human-in-the-loop review", "User trust communication"],
      },
    ],
  },
];

export const courseLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
