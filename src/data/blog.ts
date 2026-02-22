export const blogPosts = [
  {
    slug: "react-learning-roadmap-2026",
    title: "React Learning Roadmap 2026: From Basics to Product Thinking",
    excerpt:
      "A practical roadmap for students who want to move from tutorials to building complete React products with confidence.",
    category: "Web Development",
    date: "2026-01-15",
    content:
      "Learn how to stage your React journey in realistic milestones: foundations, architecture, state, APIs, performance, and deployment habits.",
  },
  {
    slug: "design-portfolio-that-gets-clients",
    title: "How to Build a Design Portfolio That Gets Real Client Work",
    excerpt:
      "Portfolio strategy for designers: choose better projects, write sharper case studies, and present work like a pro.",
    category: "Graphic Design",
    date: "2026-01-07",
    content:
      "The strongest portfolios communicate context, process, decisions, and measurable outcomes. This guide shows exactly how.",
  },
  {
    slug: "nodejs-api-patterns-for-students",
    title: "Node.js API Patterns Every Student Developer Should Know",
    excerpt:
      "A concise guide to request validation, clean route structure, and predictable error handling in Express APIs.",
    category: "Backend",
    date: "2025-12-22",
    content:
      "Use these backend patterns to keep your projects scalable and easier to maintain as your applications grow.",
  },
];

export const getBlogBySlug = (slug) => blogPosts.find((post) => post.slug === slug);
