import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export const InstructorPage = ({ instructor }) => {
  const philosophyTabs = Object.keys(instructor?.philosophy ?? {});
  const [activeTab, setActiveTab] = useState(philosophyTabs[0] ?? "");
  const currentTab = useMemo(() => instructor?.philosophy?.[activeTab], [instructor, activeTab]);

  useSeoMeta({
    title: `${instructor?.name || "Instructor"} | Dev Fraol Academy`,
    description: instructor?.bio || "Meet our instructor team and explore their teaching style.",
  });

  return (
    <section className="px-4 pb-16 sm:px-6" aria-label="Instructor page">
      <div className="container mx-auto max-w-6xl space-y-12 text-left">
        <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/55 px-6 py-14 sm:px-10">
          <p className="inline-flex rounded-full border border-[#FF3B30]/40 bg-[#FF3B30]/12 px-4 py-1 text-sm font-semibold tracking-wide text-[#FF3B30]">Instructor Spotlight</p>
          <h1 className="mt-5 text-4xl font-black sm:text-5xl md:text-6xl">{instructor?.name}</h1>
          <p className="mt-2 text-[#FF3B30]">{instructor?.role}</p>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">"{instructor?.quote}"</p>
        </header>

        <section className="rounded-3xl border border-border/60 bg-card/50 p-6 sm:p-8">
          <h2 className="text-3xl font-bold">About {instructor?.name}</h2>
          <p className="mt-4 text-muted-foreground">{instructor?.bio}</p>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            {(instructor?.experience ?? []).map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FF3B30]" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-border/60 bg-card/45 p-6 sm:p-10">
          <h2 className="text-3xl font-bold">Teaching Philosophy</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {philosophyTabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full border px-5 py-2 text-sm font-semibold ${activeTab === tab ? "border-[#FF3B30]/80 bg-[#FF3B30]/15 text-[#FF3B30]" : "border-border/80 text-muted-foreground"}`}>{tab}</button>
            ))}
          </div>
          {currentTab ? (
            <div className="mt-7 min-h-40 rounded-2xl border border-border/70 bg-background/55 p-6">
              <AnimatePresence mode="wait">
                <motion.article key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <h3 className="text-xl font-semibold text-[#FF3B30]">{currentTab.title}</h3>
                  <p className="mt-4 text-muted-foreground">{currentTab.content}</p>
                </motion.article>
              </AnimatePresence>
            </div>
          ) : null}
        </section>

        <section>
          <h2 className="text-3xl font-bold">Certifications & Achievements</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(instructor?.achievements ?? []).map((achievement) => (
              <article key={achievement.label} className="rounded-2xl border border-border/65 bg-card/55 p-4">
                <h3 className="text-base font-semibold">{achievement.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{achievement.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#FF3B30]/45 bg-linear-to-r from-[#FF3B30]/20 via-card/70 to-[#FF3B30]/10 px-6 py-12 text-center sm:px-10">
          <h2 className="text-3xl font-black sm:text-4xl">Ready to build your next breakthrough skill?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Join hands-on programs designed to sharpen your engineering mindset and visual design craft.</p>
          <div className="mt-8 inline-flex">
            <Link to="/apps" className="inline-flex items-center justify-center rounded-xl bg-[#FF3B30] px-8 py-3 text-base font-semibold text-white">View Apps</Link>
          </div>
        </section>
      </div>
    </section>
  );
};
