import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const RelatedCourses = ({ courses }) => (
  <section className="mt-10">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">Related Courses</h2>
      <Link to="/courses" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
        Explore More
      </Link>
    </div>

    <div className="flex snap-x gap-4 overflow-x-auto pb-2">
      {courses.map((course) => (
        <motion.div whileHover={{ y: -4 }} key={course.slug} className="min-w-[260px] snap-start rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-lg font-semibold text-white">{course.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-gray-300">{course.description}</p>
          <Link to={`/courses/${course.slug}`} className="mt-4 inline-block text-sm font-medium text-cyan-300">
            View Course →
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);
