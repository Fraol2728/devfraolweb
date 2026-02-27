export const ContentRenderer = ({ sections = [] }) => (
  <div className="space-y-8">
    {sections.map((section, index) => {
      if (section.type === "definition") {
        return (
          <section key={`${section.type}-${index}`} className="rounded-2xl border border-[#ff6c63]/30 bg-[#ff6c63]/10 p-6">
            <h4 className="text-lg font-semibold text-foreground">{section.title}</h4>
            <p className="mt-3 leading-relaxed text-foreground/85">{section.text}</p>
          </section>
        );
      }

      if (section.type === "list") {
        return (
          <section key={`${section.type}-${index}`} className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">{section.title}</h4>
            <ul className="list-disc space-y-2 pl-6 text-foreground/85">
              {section.items?.map((item) => (
                <li key={item} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>
        );
      }

      if (section.type === "code") {
        return (
          <section key={`${section.type}-${index}`} className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">{section.title}</h4>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0f1220] p-5 text-sm leading-relaxed text-[#d7dcef]">
              <code>{section.code}</code>
            </pre>
          </section>
        );
      }

      return (
        <section key={`${section.type}-${index}`} className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">{section.title}</h4>
          <p className="leading-relaxed text-foreground/85">{section.text}</p>
        </section>
      );
    })}
  </div>
);
