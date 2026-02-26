import { CheckCircle2 } from "lucide-react";

export const WhatYouLearn = ({ outcomes = [] }) => {
  return (
    <section className="rounded-3xl border border-white/15 bg-background/70 p-6 shadow-[0_18px_45px_rgba(12,16,28,0.25)] backdrop-blur-xl sm:p-8">
      <h2 className="text-2xl font-semibold text-foreground">What You&apos;ll Learn</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {outcomes.map((outcome) => (
          <div key={outcome} className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="flex items-start gap-2 text-sm text-foreground/85">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{outcome}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
