import { motion } from "framer-motion";

export const InstructorSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container max-w-4xl mx-auto text-left space-y-8">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary uppercase text-sm tracking-wider">Instructor</p>
          <h1 className="text-4xl sm:text-5xl font-bold mt-3">Meet Dev Fraol</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Dev Fraol is a multidisciplinary educator focused on practical Web Development and Graphic Design training for students who want career-ready outcomes.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-semibold">Experience</h2>
            <p className="text-muted-foreground mt-3">
              Real-world project leadership across frontend engineering, API architecture, brand identity, and UI systems used in live products.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-semibold">Teaching Philosophy</h2>
            <p className="text-muted-foreground mt-3">
              Learn by building. Every concept is paired with production-style assignments, reviews, and iteration cycles to strengthen confidence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
