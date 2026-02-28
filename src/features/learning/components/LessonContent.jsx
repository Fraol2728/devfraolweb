const renderBlock = (block, index) => {
  if (block.type === "h2") return <h2 key={index} className="mt-10 text-2xl font-semibold text-white">{block.text}</h2>;
  if (block.type === "h3") return <h3 key={index} className="mt-8 text-xl font-semibold text-white">{block.text}</h3>;

  if (block.type === "list") {
    return (
      <ul key={index} className="mt-4 list-disc space-y-2 pl-6 text-[16px] leading-[1.7] text-[#D4D4D8]">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }

  if (block.type === "ordered-list") {
    return (
      <ol key={index} className="mt-4 list-decimal space-y-2 pl-6 text-[16px] leading-[1.7] text-[#D4D4D8]">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ol>
    );
  }

  if (block.type === "callout") {
    return <div key={index} className="mt-6 rounded-xl border border-[#E10600]/60 bg-[#1A1010] p-4 text-[16px] leading-[1.7] text-[#F4F4F5]">{block.text}</div>;
  }

  if (block.type === "code") {
    return <pre key={index} className="mt-6 overflow-x-auto rounded-xl border border-[#232326] bg-[#0E0E10] p-4 text-sm text-[#E4E4E7]"><code>{block.text}</code></pre>;
  }

  if (block.type === "quote") {
    return <blockquote key={index} className="mt-6 border-l-2 border-[#E10600] pl-4 text-[16px] italic leading-[1.7] text-[#D4D4D8]">{block.text}</blockquote>;
  }

  return <p key={index} className="mt-5 text-[16px] leading-[1.7] text-[#D4D4D8]">{block.text}</p>;
};

export const LessonContent = ({ lesson, moduleTitle }) => (
  <article className="mx-auto w-full max-w-[820px] px-6 pb-24 pt-10 md:px-10">
    <header className="mb-8 border-b border-[#232326] pb-6">
      <p className="text-sm text-[#A1A1AA]">{moduleTitle}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-[32px]">{lesson.title}</h1>
    </header>

    <div className="space-y-2">{lesson.content.map((block, index) => renderBlock(block, index))}</div>
  </article>
);
