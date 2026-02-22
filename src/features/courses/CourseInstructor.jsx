export const CourseInstructor = ({ instructor }) => {
  if (!instructor) return null;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white">Instructor</h2>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        {instructor.photo ? <img src={instructor.photo} alt={instructor.name} className="h-20 w-20 rounded-full object-cover" /> : null}
        <div>
          <h3 className="text-lg font-semibold text-white">{instructor.name}</h3>
          <p className="text-sm text-slate-300">{instructor.role}</p>
          {instructor.socialLinks?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {instructor.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-200 transition-colors hover:border-[#FF3B30]/60 hover:text-[#ff9b94]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
