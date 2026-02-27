import { motion } from "framer-motion";
import profileImage from "@/assets/devfraol.jpg";
import { SocialLinks } from "@/features/instructor/SocialLinks";

const bioPoints = [
  "7+ years building and shipping responsive interfaces and brand-driven visuals.",
  "Specialized in practical Web Development and Graphic Design workflows.",
  "Mentored students through portfolio projects, code reviews, and design critiques.",
];

export const InstructorBio = () => {
  return (
    <section aria-labelledby="instructor-bio" className="mt-14">
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.figure
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-sm"
        >
          <img
            src={profileImage}
            alt="Portrait of Dev Fraol, instructor in web development and graphic design"
            className="w-full rounded-3xl border border-border/60 object-cover shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          />
        </motion.figure>

        <motion.article
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border border-border/60 bg-card/50 p-6 text-left sm:p-8"
        >
          <h2 id="instructor-bio" className="text-3xl font-bold">
            About <span className="text-[#FF3B30]">Dev Fraol</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dev Fraol helps aspiring creators become confident builders. Lessons blend engineering discipline with modern visual communication so students can craft fast,
            polished digital products from day one.
          </p>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            {bioPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FF3B30]" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <SocialLinks className="mt-8" />
        </motion.article>
      </div>
    </section>
  );
};
