export const CourseInstructor = ({ instructor }) => {
  if (!instructor) return null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60 dark:shadow-none">
      <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">Instructor</h2>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        {instructor.photo ? <img src={instructor.photo} alt={instructor.name} className="h-20 w-20 rounded-full object-cover" /> : null}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-white">{instructor.name}</h3>
          <p className="text-sm text-gray-700 transition-colors duration-300 dark:text-gray-300">{instructor.role}</p>
          {instructor.socialLinks?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {instructor.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700 transition-colors duration-300 hover:border-red-300 hover:text-red-700 dark:border-gray-700 dark:text-gray-200 dark:hover:border-[#FF3B30]/60 dark:hover:text-[#ff9b94]"
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
