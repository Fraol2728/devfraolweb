import { motion } from "framer-motion";

export const InstructorSection = ({ instructor, totalCourses = 0 }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-3xl border border-white/15 bg-background/70 p-6 shadow-[0_18px_40px_rgba(12,18,30,0.25)] backdrop-blur-xl sm:p-8"
    >
      <h2 className="text-2xl font-semibold text-foreground">Instructor</h2>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
        <img
          src={instructor.profile_image}
          alt={instructor.name}
          className="h-20 w-20 rounded-2xl object-cover ring-2 ring-[#ff5d52]/40"
        />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{instructor.name}</h3>
          <p className="text-sm text-foreground/75">{instructor.bio}</p>
          <p className="text-sm font-medium text-[#ff7f76]">{totalCourses}+ published courses</p>
        </div>
      </div>
    </motion.section>
  );
};
