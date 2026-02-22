import { Link, useNavigate } from "react-router-dom";

export const CTAButtons = ({ course }) => {
  const showEditor = course.category === "Web Development";
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate(`/courses/${course.slug}/enroll`);
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/60 dark:shadow-none">
      <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">Ready to start?</h2>
      <p className="mt-2 text-gray-700 transition-colors duration-300 dark:text-gray-300">Pick your next action and continue learning with guided lessons and real projects.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {showEditor ? (
          <Link
            to="/code-editor"
            className="inline-flex items-center rounded-lg border border-red-300 bg-red-100 px-4 py-2.5 text-sm font-semibold text-red-800 transition-colors duration-300 hover:bg-red-200 dark:border-[#FF3B30]/70 dark:bg-[#FF3B30]/20 dark:text-[#ffb3ad] dark:hover:bg-[#FF3B30]/30"
          >
            Go to Editor
          </Link>
        ) : null}
        <button
          onClick={handleEnroll}
          className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400"
        >
          Enroll Now
        </button>
      </div>
    </section>
  );
};
