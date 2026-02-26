import { CheckCircle2 } from "lucide-react";

export const WhatYouLearn = ({ items }) => {
  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-[0_12px_28px_rgba(10,10,25,0.2)] sm:p-6">
      <h2 className="text-2xl font-semibold">What You&apos;ll Learn</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/20 p-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <p className="text-sm text-foreground/80">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
