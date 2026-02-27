export const mockCourses = [
  {
    id: "python-course",
    slug: "python",
    title: "Python Programming",
    description: "Learn Python from beginner to advanced by building scripts, automation tasks, and mini projects.",

    introVideoId: "rfscVS0vtbw",
    videoTagline: "Build real Python skills from first syntax to practical automation.",
    modules: [
      {
        id: "python-module-1",
        title: "Module 1: Python Foundations",
        lessons: [
          {
            id: "python-lesson-1",
            title: "Getting Started with Python",
            duration: "12 min",
            definition: "Set up Python and run your first commands using the interpreter.",
            content: [
              { type: "heading", text: "Install and Verify" },
              { type: "paragraph", text: "Install Python 3, then verify with python --version in your terminal." },
              { type: "list", items: ["Install Python", "Install VS Code", "Run python --version", "Open REPL with python"] },
              { type: "tip", text: "Use a virtual environment for every project to avoid dependency conflicts." },
            ],
          },
          {
            id: "python-lesson-2",
            title: "Variables and Data Types",
            duration: "15 min",
            definition: "Store values in variables and work with Python's core data types.",
            content: [
              { type: "heading", text: "Core Data Types" },
              { type: "paragraph", text: "Python provides strings, numbers, booleans, lists, tuples, sets, and dictionaries." },
              { type: "code", language: "python", code: "name = 'Dev Fraol'\nage = 23\nis_active = True\nprint(name, age, is_active)" },
              { type: "quote", text: "Readable code is Python's superpower." },
            ],
          },
        ],
      },
      {
        id: "python-module-2",
        title: "Module 2: Control Flow and Functions",
        lessons: [
          {
            id: "python-lesson-3",
            title: "Conditions and Loops",
            duration: "18 min",
            definition: "Control execution with if statements and loop structures.",
            content: [
              { type: "heading", text: "Decision Making" },
              { type: "paragraph", text: "Use if, elif, and else to branch logic based on runtime values." },
              { type: "list", items: ["if / elif / else", "for loops", "while loops", "break and continue"] },
              { type: "code", language: "python", code: "for i in range(1, 4):\n    if i == 2:\n        continue\n    print(i)" },
            ],
          },
          {
            id: "python-lesson-4",
            title: "Writing Reusable Functions",
            duration: "16 min",
            unlocked: false,
            definition: "Organize logic into reusable functions with parameters and return values.",
            content: [
              { type: "heading", text: "Function Basics" },
              { type: "paragraph", text: "Functions reduce repetition and make your code easier to test and maintain." },
              { type: "tip", text: "Keep functions focused on one clear task and give them descriptive names." },
              { type: "code", language: "python", code: "def greet(name):\n    return f'Hello, {name}'\n\nprint(greet('Learner'))" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "graphics-course",
    slug: "graphic-design",
    title: "Graphic Design Mastery",
    description: "Learn modern design principles, visual hierarchy, and branding workflow with practical design tasks.",
    modules: [
      {
        id: "graphics-module-1",
        title: "Module 1: Design Basics",
        lessons: [
          {
            id: "graphics-lesson-1",
            title: "Principles of Visual Hierarchy",
            duration: "14 min",
            definition: "Guide user attention with contrast, size, alignment, and spacing.",
            content: [
              { type: "heading", text: "What Users See First" },
              { type: "paragraph", text: "Strong hierarchy helps users scan content quickly and understand priorities." },
              { type: "list", items: ["Contrast", "Scale", "Alignment", "Whitespace"] },
              { type: "tip", text: "Start every layout in grayscale before adding color." },
            ],
          },
          {
            id: "graphics-lesson-2",
            title: "Color Theory for UI and Branding",
            duration: "17 min",
            definition: "Build intentional palettes that communicate meaning and emotion.",
            content: [
              { type: "heading", text: "Palette Strategy" },
              { type: "paragraph", text: "Choose a primary, secondary, and accent color, then map each to a clear purpose." },
              { type: "quote", text: "Color is not decoration—it is communication." },
              { type: "code", language: "css", code: ":root {\n  --primary: #ff3b30;\n  --secondary: #0ea5e9;\n  --surface: #0f172a;\n}" },
            ],
          },
        ],
      },
      {
        id: "graphics-module-2",
        title: "Module 2: Brand Design Workflow",
        lessons: [
          {
            id: "graphics-lesson-3",
            title: "Logo Concepting",
            duration: "13 min",
            definition: "Move from idea sketches to polished logo directions.",
            content: [
              { type: "heading", text: "From Brief to Concept" },
              { type: "paragraph", text: "Translate brand personality into shapes, typography, and symbol exploration." },
              { type: "list", items: ["Understand brand values", "Create moodboard", "Sketch 20+ concepts", "Select top 3 directions"] },
              { type: "tip", text: "Test logo readability at small sizes early in the process." },
            ],
          },
          {
            id: "graphics-lesson-4",
            title: "Design System Essentials",
            duration: "19 min",
            definition: "Create consistency with reusable tokens and components.",
            content: [
              { type: "heading", text: "System Thinking" },
              { type: "paragraph", text: "A design system speeds collaboration and ensures consistent experiences across screens." },
              { type: "list", items: ["Type scale", "Color tokens", "Spacing scale", "UI components"] },
              { type: "quote", text: "Consistency builds trust." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "computer-fundamentals-course",
    slug: "computer-fundamentals",
    title: "Computer Fundamentals",
    description: "Understand hardware, software, and everyday computer workflows for productivity and confidence.",
    modules: [
      {
        id: "cf-module-1",
        title: "Module 1: Core Concepts",
        lessons: [
          {
            id: "cf-lesson-1",
            title: "What is a Computer?",
            duration: "10 min",
            definition: "A computer is an electronic system that accepts input, processes data, and outputs results.",
            content: [
              { type: "heading", text: "Input → Process → Output" },
              { type: "paragraph", text: "Every computing system follows a flow: receive information, process it, and produce output." },
              { type: "list", items: ["Input devices", "CPU", "Memory", "Output devices"] },
              { type: "tip", text: "Relate each app you use to this basic model to understand it faster." },
            ],
          },
          {
            id: "cf-lesson-2",
            title: "Hardware vs Software",
            duration: "11 min",
            definition: "Hardware is physical equipment; software is the instructions running on it.",
            content: [
              { type: "heading", text: "Two Sides of Computing" },
              { type: "paragraph", text: "Hardware includes parts you can touch, while software includes OS and applications." },
              { type: "list", items: ["Hardware: CPU, RAM, SSD", "Software: OS, Browser, IDE"] },
              { type: "quote", text: "Hardware is the body, software is the behavior." },
            ],
          },
        ],
      },
      {
        id: "cf-module-2",
        title: "Module 2: Practical Computer Skills",
        lessons: [
          {
            id: "cf-lesson-3",
            title: "File and Folder Management",
            duration: "12 min",
            definition: "Organize files systematically so work stays searchable and secure.",
            content: [
              { type: "heading", text: "Organize Smartly" },
              { type: "paragraph", text: "Create clear folder structures by project, year, and document type." },
              { type: "list", items: ["Use consistent naming", "Back up regularly", "Avoid desktop clutter", "Archive old work"] },
              { type: "tip", text: "Use YYYY-MM-DD in file names for natural sorting." },
            ],
          },
          {
            id: "cf-lesson-4",
            title: "Safe Browsing and Security",
            duration: "14 min",
            definition: "Protect data with basic cybersecurity habits and account hygiene.",
            content: [
              { type: "heading", text: "Security Basics" },
              { type: "paragraph", text: "Use strong unique passwords, two-factor authentication, and verified downloads." },
              { type: "list", items: ["Password manager", "2FA", "Software updates", "Phishing awareness"] },
              { type: "code", language: "text", code: "Strong password format:\n4 random words + symbol + number\nexample: River-Cloud-Lemon-Train!29" },
            ],
          },
        ],
      },
    ],
  },
];
