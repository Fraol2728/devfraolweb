import { Link } from "react-router-dom";

export const CTAButtons = ({ course }) => {
  const showEditor = course.category === "Web Development";

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white">Ready to start?</h2>
      <p className="mt-2 text-slate-300">Pick your next action and continue learning with guided lessons and real projects.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {showEditor ? (
          <Link
            to="/code-editor"
            className="inline-flex items-center rounded-lg border border-[#FF3B30]/70 bg-[#FF3B30]/20 px-4 py-2.5 text-sm font-semibold text-[#ffb3ad] transition hover:bg-[#FF3B30]/30"
          >
            Go to Editor
          </Link>
        ) : null}
        <button className="inline-flex items-center rounded-lg bg-[#FF3B30] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff5449]">
          Enroll Now
        </button>
      </div>
    </section>
  );
};
