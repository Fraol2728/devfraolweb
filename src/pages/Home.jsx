import { Link } from "react-router-dom";
import { HeroSection } from "@/features/hero/Hero";
import { courses } from "@/data/courses";

const tracks = [
  {
    title: "Web Development Track",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"]
  },
  {
    title: "Graphic Design Track",
    skills: ["Photoshop", "Illustrator", "Figma", "Branding", "UI/UX"]
  }
];

export const Home = () => {
  const featuredCourses = courses.filter((course) => course.featured).slice(0, 4);

  return (
    <>
      <HeroSection />

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What You Will Learn</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tracks.map((track) => (
              <div key={track.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold mb-3">{track.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {track.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Link to="/courses" className="text-primary font-medium hover:underline">View all courses</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredCourses.map((course) => (
              <article key={course.id} className="rounded-2xl border border-border p-6 bg-card">
                <p className="text-sm text-primary mb-2">{course.level} • {course.duration}</p>
                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <Link to={`/courses/${course.slug}`} className="inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                  View Details
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-2xl border border-border bg-card p-8">
          <h2 className="text-3xl font-bold mb-4">Why Learn From Us</h2>
          <p className="text-muted-foreground">
            Dev Fraol combines hands-on web development and graphic design industry experience. Lessons are taught through practical projects,
            clear feedback, and real client-style workflows so students build confidence, portfolios, and career-ready skills.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center rounded-2xl border border-primary/30 bg-primary/10 p-10">
          <h2 className="text-4xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-muted-foreground mb-6">Choose your track and begin building real projects from week one.</p>
          <Link to="/courses" className="inline-flex px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </>
  );
};
