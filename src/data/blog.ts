export const blogPosts = [
  {
    id: "intro-to-react",
    slug: "intro-to-react",
    title: "Introduction to React",
    excerpt: "Learn the basics of React.js and how to build dynamic UIs with reusable components.",
    category: "Web Development",
    date: "2026-03-01",
    popularity: 98,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Laptop displaying colorful code editor for React development",
    content: [
      {
        heading: "Why React is still the go-to",
        paragraphs: [
          "React remains one of the best tools for building modern interfaces because it encourages component-driven architecture, predictable data flow, and reusable UI systems.",
          "As projects grow, React makes it easier to separate concerns and build features in parallel with a team."
        ]
      },
      {
        heading: "Start with the right mental model",
        paragraphs: [
          "Think of your app as a tree of components. Every component should have one clear responsibility and accept props for data.",
          "When this model is clear early, routing, state handling, and API integration become far easier."
        ]
      }
    ]
  },
  {
    id: "uiux-design-principles",
    slug: "uiux-design-principles",
    title: "UI/UX Design Principles",
    excerpt: "Master the fundamentals of interface hierarchy, spacing, and delightful user flow decisions.",
    category: "Graphic Design",
    date: "2026-03-05",
    popularity: 91,
    image:
      "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Designer sketching layout wireframes on tablet",
    content: [
      {
        heading: "Design for clarity first",
        paragraphs: [
          "A great interface helps users understand what to do next without effort. Use spacing, typography contrast, and consistent color to lead attention.",
          "If users pause too long, your hierarchy likely needs refinement."
        ]
      },
      {
        heading: "Consistency creates trust",
        paragraphs: [
          "Consistent button styles, icon systems, and navigation patterns lower cognitive load.",
          "Trust grows when behavior feels predictable from screen to screen."
        ]
      }
    ]
  },
  {
    id: "tailwind-layout-system",
    slug: "tailwind-layout-system",
    title: "Building a Scalable Layout System with TailwindCSS",
    excerpt: "Create reusable spacing, grid, and typography decisions that scale across pages.",
    category: "Web Development",
    date: "2026-02-25",
    popularity: 84,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Developer coding design system tokens on a laptop",
    content: [
      {
        heading: "Define spacing rhythm",
        paragraphs: [
          "A spacing scale is the backbone of clean layouts. Tailwind utility classes become far more powerful when guided by a consistent rhythm.",
          "Use repeated spacing patterns for sections and cards to make interfaces feel intentional."
        ]
      },
      {
        heading: "Componentize utilities",
        paragraphs: [
          "Common utility combinations should become reusable components. This improves maintainability while preserving Tailwind speed.",
          "Keep primitives simple, then compose larger sections from them."
        ]
      }
    ]
  },
  {
    id: "freelance-brand-kit",
    slug: "freelance-brand-kit",
    title: "Create a Freelance Brand Kit in One Weekend",
    excerpt: "A practical system for logo, typography, and color consistency across client touchpoints.",
    category: "Graphic Design",
    date: "2026-02-20",
    popularity: 88,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Mood board with color swatches and typography samples",
    content: [
      {
        heading: "Start with strategic positioning",
        paragraphs: [
          "Strong brand kits are not just visuals. They express tone, audience, and market position clearly.",
          "Pick two to three emotional attributes and map design decisions to them."
        ]
      },
      {
        heading: "Build reusable templates",
        paragraphs: [
          "Prepare social, proposal, and presentation templates as part of the kit.",
          "Templates help you and your clients stay consistent long after launch."
        ]
      }
    ]
  },
  {
    id: "react-performance-checklist",
    slug: "react-performance-checklist",
    title: "React Performance Checklist for Student Projects",
    excerpt: "Boost render speed using memoization, lazy loading, and smaller component boundaries.",
    category: "Web Development",
    date: "2026-02-14",
    popularity: 95,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Code performance dashboard on a dark themed monitor",
    content: [
      {
        heading: "Measure before optimizing",
        paragraphs: [
          "Use browser profiling and React DevTools to locate expensive components before making changes.",
          "Optimization without measurement often increases complexity without impact."
        ]
      },
      {
        heading: "Ship with perceived speed in mind",
        paragraphs: [
          "Skeleton states, predictable transitions, and smaller route bundles improve user perception significantly.",
          "Fast-feeling experiences can outperform technically faster but visually abrupt interfaces."
        ]
      }
    ]
  },
  {
    id: "typography-hierarchy-guide",
    slug: "typography-hierarchy-guide",
    title: "Typography Hierarchy Guide for Digital Designers",
    excerpt: "Use scale, contrast, and spacing to craft readable pages that feel premium.",
    category: "Graphic Design",
    date: "2026-02-10",
    popularity: 79,
    image:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Typography specimens and notebook for editorial layout planning",
    content: [
      {
        heading: "Prioritize reading flow",
        paragraphs: [
          "The right heading scale tells users where to begin and what matters most.",
          "Body text should prioritize comfort with balanced line length and generous line height."
        ]
      },
      {
        heading: "Reduce visual noise",
        paragraphs: [
          "Too many type styles weaken hierarchy. Stick to a small set of semantic styles and reuse them.",
          "Strong type systems scale elegantly from landing pages to dashboards."
        ]
      }
    ]
  },
  {
    id: "vite-deployment-playbook",
    slug: "vite-deployment-playbook",
    title: "Vite Deployment Playbook for Production React Apps",
    excerpt: "A release checklist for environment variables, caching, and fast global delivery.",
    category: "Web Development",
    date: "2026-02-07",
    popularity: 86,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Cloud network visualization representing app deployment",
    content: [
      {
        heading: "Treat deployment as a product feature",
        paragraphs: [
          "Production readiness includes build size budgets, fallback routes, and observability basics.",
          "A reliable release process helps teams ship confidently and recover quickly."
        ]
      },
      {
        heading: "Document everything",
        paragraphs: [
          "Create a simple deployment checklist your team can follow each release.",
          "Consistency in operations is just as important as consistency in UI."
        ]
      }
    ]
  }
];

export const getBlogBySlug = (slug) => blogPosts.find((post) => post.slug === slug);
