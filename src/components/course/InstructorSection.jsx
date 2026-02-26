export const InstructorSection = ({ instructor }) => {
  if (!instructor) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">Instructor</h2>
      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center">
        <img src={instructor.profile_image} alt={instructor.name} className="h-20 w-20 rounded-full object-cover ring-2 ring-[#ff3b30]/50" />
        <div>
          <h3 className="text-lg font-semibold">{instructor.name}</h3>
          <p className="mt-1 text-sm text-foreground/80">{instructor.bio}</p>
          <p className="mt-2 text-sm text-foreground/65">{instructor.profile}</p>
        </div>
      </div>
    </section>
  );
};
