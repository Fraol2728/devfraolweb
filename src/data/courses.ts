export const courses = [
  {
    id: "course-frontend-mastery",
    slug: "frontend-mastery",
    title: "Frontend Mastery with React",
    category: "Web Development",
    level: "Intermediate",
    duration: "10 Weeks",
    durationWeeks: 10,
    popularity: 94,
    badge: "Popular",
    moduleCount: 14,
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
    id: "course-backend-api-bootcamp",
    slug: "backend-api-bootcamp",
    title: "Backend API Bootcamp",
    category: "Web Development",
    level: "Beginner",
    duration: "8 Weeks",
    durationWeeks: 8,
    popularity: 89,
    badge: "New",
    moduleCount: 12,
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
    id: "course-ui-ux-design-foundations",
    slug: "ui-ux-design-foundations",
    title: "UI/UX Design Foundations",
    category: "Graphic Design",
    level: "Beginner",
    duration: "6 Weeks",
    durationWeeks: 6,
    popularity: 91,
    badge: "Beginner",
    moduleCount: 10,
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
    id: "course-brand-identity-lab",
    slug: "brand-identity-lab",
    title: "Brand Identity Lab",
    category: "Graphic Design",
    level: "Advanced",
    duration: "7 Weeks",
    durationWeeks: 7,
    popularity: 84,
    badge: "Popular",
    moduleCount: 11,
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
