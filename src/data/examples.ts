export const supportedLanguages = [
  { id: "html", label: "HTML", monaco: "html", extension: ".html" },
  { id: "css", label: "CSS", monaco: "css", extension: ".css" },
  { id: "javascript", label: "JavaScript", monaco: "javascript", extension: ".js" },
  { id: "jsx", label: "React JSX", monaco: "javascript", extension: ".jsx" },
  { id: "python", label: "Python", monaco: "python", extension: ".py" },
  { id: "php", label: "PHP", monaco: "php", extension: ".php" },
  { id: "mysql", label: "MySQL", monaco: "sql", extension: ".sql" },
  { id: "markdown", label: "Markdown", monaco: "markdown", extension: ".md" },
];

export const starterExamples = [
  {
    id: "web-starter",
    name: "Web Starter",
    files: [
      {
        id: "file-html",
        name: "index.html",
        language: "html",
        content:
          "<main class=\"card\">\n  <h1>Dev Fraol Academy</h1>\n  <p id=\"message\">Build and preview in real-time.</p>\n  <button id=\"run\">Run Demo</button>\n</main>",
      },
      {
        id: "file-css",
        name: "styles.css",
        language: "css",
        content:
          "body {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  background: #111;\n  color: #f5f5f5;\n  font-family: Inter, system-ui, sans-serif;\n}\n\n.card {\n  width: min(92vw, 460px);\n  border: 1px solid rgba(255, 59, 48, 0.5);\n  border-radius: 18px;\n  background: #1e1e1e;\n  padding: 2rem;\n}\n\nbutton {\n  margin-top: 1rem;\n  background: #ff3b30;\n  border: none;\n  color: white;\n  padding: 0.65rem 1rem;\n  border-radius: 0.75rem;\n}",
      },
      {
        id: "file-js",
        name: "main.js",
        language: "javascript",
        content:
          "const button = document.getElementById('run');\nconst message = document.getElementById('message');\n\nbutton?.addEventListener('click', () => {\n  message.textContent = `Preview refreshed at ${new Date().toLocaleTimeString()}`;\n});",
      },
    ],
  },
  {
    id: "python-lab",
    name: "Python Lab",
    files: [
      {
        id: "file-py",
        name: "app.py",
        language: "python",
        content: "name = \"Dev Fraol Learner\"\nprint(f\"Hello, {name}!\")\nfor index in range(1, 4):\n    print(\"Step\", index)",
      },
      {
        id: "file-md",
        name: "notes.md",
        language: "markdown",
        content: "# Python Notes\n\n- Variables\n- Loops\n- Functions\n",
      },
    ],
  },
];

const buildCourseSnippet = (courseName) => {
  if (!courseName) {
    return null;
  }

  const lowerName = courseName.toLowerCase();

  if (lowerName.includes("python")) {
    return {
      files: [
        {
          name: "app.py",
          language: "python",
          content: `course = \"${courseName}\"\nprint(f\"Starting {course} practice lab\")\nfor step in range(1, 4):\n    print(f\"Step {step}: keep coding\")`,
        },
        {
          name: "notes.md",
          language: "markdown",
          content: `# ${courseName}\n\n- Warm up with syntax drills\n- Build one mini challenge\n- Share what you learned`,
        },
      ],
    };
  }

  if (lowerName.includes("mysql")) {
    return {
      files: [
        {
          name: "schema.sql",
          language: "mysql",
          content:
            "CREATE TABLE students (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(80),\n  track VARCHAR(80),\n  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nINSERT INTO students (name, track) VALUES\n  ('Alex', 'Web Development'),\n  ('Sara', 'Graphic Design');",
        },
      ],
    };
  }

  return {
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<main class=\"card\">\n  <h1>${courseName}</h1>\n  <p>Test concepts from this course directly in the editor.</p>\n  <button id=\"cta\">Practice Now</button>\n</main>`,
      },
      {
        name: "styles.css",
        language: "css",
        content:
          "body {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  background: #111;\n  color: #fff;\n  font-family: Inter, system-ui, sans-serif;\n}\n\n.card {\n  width: min(90vw, 540px);\n  border: 1px solid rgba(255, 59, 48, 0.45);\n  border-radius: 16px;\n  background: #1e1e1e;\n  padding: 2rem;\n}\n\nbutton {\n  margin-top: 1rem;\n  border: 0;\n  border-radius: 12px;\n  background: #ff3b30;\n  color: #fff;\n  padding: 0.7rem 1rem;\n}",
      },
      {
        name: "main.js",
        language: "javascript",
        content: "const button = document.getElementById('cta');\nbutton?.addEventListener('click', () => {\n  button.textContent = 'Great start!';\n});",
      },
    ],
  };
};

export const createProjectFromCourse = (courseName) => {
  const snippet = buildCourseSnippet(courseName);
  if (!snippet) {
    return null;
  }

  const stamp = Date.now();
  return {
    id: `course-${stamp}`,
    name: courseName,
    files: snippet.files.map((file, index) => ({
      id: `course-file-${stamp}-${index}`,
      ...file,
    })),
  };
};

export const getLanguageMeta = (languageId) => supportedLanguages.find((language) => language.id === languageId) || supportedLanguages[0];
