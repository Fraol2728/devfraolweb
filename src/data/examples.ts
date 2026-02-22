export const starterExamples = [
  {
    id: "landing-card",
    name: "Landing Card",
    files: {
      html: `<div class="card">\n  <h1>Dev Fraol Academy</h1>\n  <p>Build beautiful interfaces with HTML, CSS, and JavaScript.</p>\n  <button id="cta">Launch Project</button>\n  <p id="message"></p>\n</div>`,
      css: `:root {\n  color-scheme: dark;\n}\n\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  background: radial-gradient(circle at top, #2f0f0d, #090909 62%);\n  font-family: Inter, system-ui, sans-serif;\n  color: #f6f6f6;\n}\n\n.card {\n  width: min(92vw, 440px);\n  padding: 2rem;\n  border: 1px solid rgba(255, 59, 48, 0.45);\n  border-radius: 20px;\n  background: rgba(12, 12, 12, 0.8);\n  box-shadow: 0 20px 40px rgba(255, 59, 48, 0.2);\n}\n\nbutton {\n  margin-top: 1rem;\n  border: none;\n  background: #ff3b30;\n  color: white;\n  padding: 0.75rem 1rem;\n  border-radius: 12px;\n  cursor: pointer;\n}`,
      js: `const button = document.querySelector('#cta');\nconst message = document.querySelector('#message');\n\nbutton.addEventListener('click', () => {\n  message.textContent = 'Nice! You are now running live code in Dev Fraol Editor.';\n});`,
    },
  },
  {
    id: "animated-loader",
    name: "Animated Loader",
    files: {
      html: `<main>\n  <div class="loader" aria-label="Loading"></div>\n  <p>Compiling your next frontend idea...</p>\n</main>`,
      css: `body {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  background: #050505;\n  color: #ffe8e7;\n  font-family: Inter, system-ui, sans-serif;\n}\n\nmain {\n  text-align: center;\n}\n\n.loader {\n  width: 72px;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  border: 5px solid rgba(255, 59, 48, 0.25);\n  border-top-color: #ff3b30;\n  margin-inline: auto;\n  animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(1turn);\n  }\n}`,
      js: `setInterval(() => {\n  document.title = 'Dev Fraol Editor • ' + new Date().toLocaleTimeString();\n}, 1000);`,
    },
  },
];
