export const LessonRenderer = ({ block }) => {
  switch (block.type) {
    case "heading":
      return <h4 className="mb-3 mt-8 text-xl font-semibold text-slate-900">{block.text}</h4>;

    case "paragraph":
      return <p className="mb-4 text-gray-700 leading-relaxed">{block.text}</p>;

    case "list":
      return (
        <ul className="mb-4 ml-6 list-disc space-y-1 text-gray-700 marker:text-cyan-600">
          {block.items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "tip":
      return (
        <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-900">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">Tip</p>
          <p className="mt-2 text-gray-700 leading-relaxed">{block.text}</p>
        </aside>
      );

    case "quote":
      return <blockquote className="my-6 border-l-4 border-cyan-500 pl-4 italic text-gray-700">{block.text}</blockquote>;

    case "code":
      return (
        <pre className="mb-6 overflow-x-auto rounded-lg bg-slate-900 p-4 text-slate-100">
          <code>{block.code}</code>
        </pre>
      );

    default:
      return null;
  }
};
