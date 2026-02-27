export const LessonRenderer = ({ block }) => {
  switch (block.type) {
    case "heading":
      return <h4 className="mt-8 mb-3 text-xl font-semibold text-white">{block.text}</h4>;

    case "paragraph":
      return <p className="mb-4 text-gray-300 leading-relaxed">{block.text}</p>;

    case "list":
      return (
        <ul className="mb-4 ml-6 list-disc space-y-1 text-gray-300 marker:text-cyan-300">
          {block.items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "tip":
      return (
        <aside className="mb-6 rounded-lg border border-blue-200/40 bg-blue-50/10 p-4 text-blue-100">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-200">Tip</p>
          <p className="mt-2 leading-relaxed text-blue-100/90">{block.text}</p>
        </aside>
      );

    case "quote":
      return <blockquote className="my-6 border-l-4 border-cyan-300/70 pl-4 italic text-gray-300">{block.text}</blockquote>;

    case "code":
      return (
        <pre className="mb-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
          <code>{block.code}</code>
        </pre>
      );

    default:
      return null;
  }
};
