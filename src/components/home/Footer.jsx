export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-6 px-6 py-8 md:flex-row md:items-center md:px-8">
        <div>
          <p className="text-lg font-semibold text-white">Dev Fraol Academy</p>
          <p className="mt-1 text-sm text-slate-400">Learn modern development through practical, project-driven learning.</p>
        </div>

        <nav aria-label="Footer quick links" className="flex flex-wrap gap-4 text-sm">
          <a href="/courses" className="text-slate-300 hover:text-cyan-300 focus-visible:text-cyan-300">
            Courses
          </a>
          <a href="/testimonials" className="text-slate-300 hover:text-cyan-300 focus-visible:text-cyan-300">
            Testimonials
          </a>
          <a href="/contact" className="text-slate-300 hover:text-cyan-300 focus-visible:text-cyan-300">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};
