import { motion } from "framer-motion";
import { Brush, Code2, Database, FileCode2, Image, Layers, Palette, PenTool } from "lucide-react";
import { CourseCard } from "@/features/courses/CourseCard";

const webDevelopmentCourses = [
  { title: "HTML & CSS Course", description: "Build responsive pages and modern UI foundations.", icon: FileCode2 },
  { title: "JavaScript Course", description: "Add interactivity and logic to web applications.", icon: Code2 },
  { title: "PHP Course", description: "Develop server-side features and APIs.", icon: Code2 },
  { title: "MySQL Course", description: "Design and query relational databases.", icon: Database },
  { title: "React JS Course", description: "Create component-driven frontend experiences.", icon: Layers },
  { title: "Python Course", description: "Automate workflows and backend fundamentals.", icon: FileCode2 },
];

const graphicDesignCourses = [
  { title: "Adobe Illustrator", description: "Craft scalable vector artwork and logos.", icon: PenTool },
  { title: "Adobe Photoshop", description: "Edit and composite images for digital media.", icon: Image },
  { title: "Adobe InDesign", description: "Design clean layouts for print and editorial.", icon: Palette },
];

const sectionTitleVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const CourseSection = ({ title, subtitle, icon: Icon, courses }) => (
  <section className="mt-12 first:mt-0">
    <motion.div
      variants={sectionTitleVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
      className="mb-6 flex items-center gap-3"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#FF3B30]/35 bg-[#FF3B30]/10">
        <Icon className="h-5 w-5 text-[#FF3B30]" />
      </span>
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      </div>
    </motion.div>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course, index) => (
        <CourseCard key={course.title} {...course} index={index} />
      ))}
    </div>
  </section>
);

export const Courses = () => {
  return (
    <main className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-left"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF3B30]">Dev Fraol Academy</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Courses</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
            Choose your learning track and start building practical skills. Every card is modular and ready for future dynamic
            course integrations.
          </p>
        </motion.header>

        <CourseSection
          title="Web Development"
          subtitle="Frontend, backend, and database fundamentals for modern web apps."
          icon={Code2}
          courses={webDevelopmentCourses}
        />

        <CourseSection
          title="Graphic Design"
          subtitle="Industry-standard Adobe workflow from concept to final visuals."
          icon={Brush}
          courses={graphicDesignCourses}
        />
      </div>
    </main>
  );
};
