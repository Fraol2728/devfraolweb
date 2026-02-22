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

export const getLanguageMeta = (languageId) => supportedLanguages.find((language) => language.id === languageId) || supportedLanguages[0];
