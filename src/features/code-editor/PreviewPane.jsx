const buildWebDocument = ({ html, css, javascript }) => `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>
      const emit = (type, value) => parent.postMessage({ source: 'devfraol-preview', type, value }, '*');
      const original = console.log;
      console.log = (...args) => {
        emit('log', args.map((arg) => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' '));
        original(...args);
      };
      window.onerror = (message) => emit('error', String(message));
      try { ${javascript} } catch (error) { emit('error', error?.stack || String(error)); }
    </script>
  </body>
</html>`;

export const buildPreviewDocument = (files) => {
  const html = files.find((file) => file.name.endsWith(".html"))?.content || "";
  const css = files.find((file) => file.name.endsWith(".css"))?.content || "";
  const javascript = files.find((file) => file.name.endsWith(".js"))?.content || "";
  return buildWebDocument({ html, css, javascript });
};

export const PreviewPane = ({ srcDoc, device = "desktop" }) => {
  const sizes = {
    desktop: "w-full",
    tablet: "mx-auto w-[820px] max-w-full",
    mobile: "mx-auto w-[390px] max-w-full",
  };

  return (
    <div className="h-full overflow-auto bg-zinc-950 p-2">
      <div className={`h-full bg-white ${sizes[device]}`}>
        <iframe title="Live preview" srcDoc={srcDoc} sandbox="allow-scripts" className="h-full w-full border-0" />
      </div>
    </div>
  );
};
