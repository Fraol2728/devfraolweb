const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const buildPreviewDocument = ({ files, activeLanguage }) => {
  const html = files.find((file) => file.language === "html")?.content || "";
  const css = files.find((file) => file.language === "css")?.content || "";
  const javascript = files.find((file) => file.language === "javascript")?.content || "";
  const jsx = files.find((file) => file.language === "jsx")?.content || "";

  if (["python", "php", "mysql", "markdown"].includes(activeLanguage)) {
    const source = files.find((file) => file.language === activeLanguage)?.content || "";
    return `<!doctype html><html><body style="margin:0;background:#111;color:#f3f3f3;font-family:ui-monospace,monospace;padding:16px"><h3 style="margin-top:0;color:#ff3b30">Simulated ${activeLanguage.toUpperCase()} Output</h3><pre>${escapeHtml(
      source
    )}</pre></body></html>`;
  }

  return `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${css}</style>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    ${html}
    <script>
      try { ${javascript} } catch (error) { document.body.innerHTML += '<pre style="color:#ff7373">' + (error?.stack || String(error)) + '</pre>'; }
    </script>
    ${jsx ? `<div id="root"></div><script type="text/babel">${jsx}</script>` : ""}
  </body>
</html>`;
};

export const PreviewPane = ({ srcDoc }) => (
  <div className="h-full min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white">
    <iframe title="Code output preview" srcDoc={srcDoc} sandbox="allow-scripts" className="h-full w-full" />
  </div>
);
