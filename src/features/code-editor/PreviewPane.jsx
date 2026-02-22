export const buildPreviewDocument = ({ html, css, js }) => `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>
      try {
        ${js}
      } catch (error) {
        const pre = document.createElement('pre');
        pre.style.color = '#ff7373';
        pre.style.padding = '1rem';
        pre.textContent = error?.stack || String(error);
        document.body.appendChild(pre);
      }
    </script>
  </body>
</html>`;

export const PreviewPane = ({ srcDoc }) => {
  return (
    <div className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-white">
      <iframe title="Code output preview" srcDoc={srcDoc} sandbox="allow-scripts" className="h-full w-full" />
    </div>
  );
};
