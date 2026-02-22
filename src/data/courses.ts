export const courses = [
  {
    slug: "frontend-mastery",
    title: "Frontend Mastery with React",
    category: "Web Development",
    level: "Intermediate",
    duration: "10 weeks",
    shortDescription:
      "Build production-ready React applications with modern tooling, routing, state, and UI systems.",
    overview:
      "This track helps students move from component basics to full frontend architecture using React, Vite, Tailwind, and animation patterns used in real client projects.",
    outcomes: [
      "Build responsive multi-page React apps with reusable components",
      "Implement state management and API integration patterns",
      "Ship polished UI experiences with Tailwind and Framer Motion",
    ],
    requirements: [
      "Basic JavaScript and HTML/CSS knowledge",
      "Laptop with Node.js installed",
      "Commitment of 6-8 hours per week",
    ],
  },
  {
    slug: "backend-api-bootcamp",
    title: "Backend API Bootcamp",
    category: "Web Development",
    level: "Beginner to Intermediate",
    duration: "8 weeks",
    shortDescription:
      "Design and build scalable backend services using Node.js, Express, databases, authentication, and deployment.",
    overview:
      "A practical backend program focused on API architecture, secure authentication, data modeling, and deployment workflows expected in professional teams.",
    outcomes: [
      "Design REST APIs with clean folder architecture",
      "Integrate databases, auth flows, and middleware",
      "Deploy backend services and monitor production readiness",
    ],
    requirements: [
      "Comfort with basic JavaScript",
      "Understanding of request/response basics",
      "A curiosity to debug and solve real-world problems",
    ],
  },
  {
    slug: "ui-ux-design-foundations",
    title: "UI/UX Design Foundations",
    category: "Graphic Design",
    level: "Beginner",
    duration: "6 weeks",
    shortDescription:
      "Learn visual hierarchy, typography, color systems, and UX fundamentals for modern digital products.",
    overview:
      "This course blends design theory and practical projects so students can create interfaces that are both visually strong and easy to use.",
    outcomes: [
      "Create wireframes and high-fidelity interface mockups",
      "Use typography and color systems with confidence",
      "Present design rationale aligned to user goals",
    ],
    requirements: [
      "No prior design experience required",
      "Access to Figma or Adobe tools",
      "Willingness to iterate and seek feedback",
    ],
  },
  {
    slug: "brand-identity-lab",
    title: "Brand Identity Lab",
    category: "Graphic Design",
    level: "Intermediate",
    duration: "7 weeks",
    shortDescription:
      "Craft complete visual identities including logos, brand systems, social assets, and client-ready presentations.",
    overview:
      "A portfolio-focused design lab where students build a full brand identity case study from strategy discovery to polished deliverables.",
    outcomes: [
      "Develop brand strategy into cohesive visual systems",
      "Create logo suites and adaptable brand guidelines",
      "Package and present brand projects professionally",
    ],
    requirements: [
      "Basic familiarity with design tools",
      "Interest in branding and visual storytelling",
      "Ability to complete weekly design reviews",
    ],
  },
];

export const getCourseBySlug = (slug) => courses.find((course) => course.slug === slug);
