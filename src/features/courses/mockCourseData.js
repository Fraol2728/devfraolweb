export const mockCourseData = {
  id: "computer-fundamentals",
  title: "Computer Fundamentals Masterclass",
  modules: [
    {
      id: "module-1",
      title: "Module 1: Introduction",
      lessons: [
        {
          id: "lesson-1",
          title: "What is a Computer?",
          duration: "08 min",
          definition: "A computer is an electronic device that processes data.",
          content: [
            { type: "heading", text: "Basic Concept" },
            { type: "paragraph", text: "A computer takes input, processes it, and produces output." },
            { type: "list", items: ["CPU", "Memory", "Storage", "Input/Output"] },
            { type: "tip", text: "Remember: Input → Process → Output." },
            { type: "quote", text: "Computers amplify human capability." },
            { type: "code", language: "javascript", code: "console.log('Hello World');" },
          ],
        },
        {
          id: "lesson-2",
          title: "How Computers Store Information",
          duration: "11 min",
          definition: "Storage allows computers to retain data for short-term and long-term use.",
          content: [
            { type: "heading", text: "Short vs Long Term" },
            {
              type: "paragraph",
              text: "RAM stores temporary working data, while drives like SSDs keep files permanently even after shutdown.",
            },
            { type: "list", items: ["RAM", "SSD", "HDD", "Cloud storage"] },
            { type: "quote", text: "Fast storage means less waiting and more doing." },
            {
              type: "code",
              language: "text",
              code: "1 KB = 1024 bytes\n1 MB = 1024 KB\n1 GB = 1024 MB",
            },
          ],
        },
      ],
    },
    {
      id: "module-2",
      title: "Module 2: Hardware & Software",
      lessons: [
        {
          id: "lesson-3",
          title: "Understanding Hardware",
          duration: "10 min",
          definition: "Hardware is the physical part of a computer you can touch.",
          content: [
            { type: "heading", text: "Common Hardware" },
            {
              type: "paragraph",
              text: "Examples include motherboard, CPU, RAM, graphics card, storage devices, keyboard, and monitor.",
            },
            { type: "tip", text: "Think of hardware as the body and software as the brain instructions." },
          ],
        },
        {
          id: "lesson-4",
          title: "What is Software?",
          duration: "09 min",
          definition: "Software is a set of programs that tell hardware what to do.",
          content: [
            { type: "heading", text: "Software Categories" },
            { type: "list", items: ["Operating systems", "Utility software", "Applications", "Programming tools"] },
            {
              type: "paragraph",
              text: "The operating system manages files, memory, devices, and processes so applications can run effectively.",
            },
          ],
        },
      ],
    },
    {
      id: "module-3",
      title: "Module 3: Practical Operations",
      lessons: [
        {
          id: "lesson-5",
          title: "Files, Folders, and Organization",
          duration: "12 min",
          definition: "Structured file management improves workflow speed and reduces errors.",
          content: [
            { type: "heading", text: "Naming Strategy" },
            { type: "paragraph", text: "Use clear names, dates, and folders by project to find content quickly." },
            { type: "list", items: ["Consistent naming", "Regular backup", "Avoid desktop clutter", "Use versioning"] },
          ],
        },
      ],
    },
  ],
};
