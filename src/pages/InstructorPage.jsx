export const InstructorPage = () => {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <img src="/profile-logo.png" alt="Dev Fraol" className="w-full max-w-sm mx-auto rounded-2xl border border-border" />

        <div>
          <h1 className="text-4xl font-bold mb-4">Meet Dev Fraol</h1>
          <p className="text-muted-foreground mb-4">
            Dev Fraol is a multidisciplinary instructor with real-world experience across modern web development and graphic design systems.
            He has coached students through project-based learning that mirrors client work and startup team collaboration.
          </p>
          <p className="text-muted-foreground mb-4">
            From coding full-stack apps with React and Node.js to designing brand and UI systems in Figma and Adobe tools, his classes focus
            on practical output, review loops, and portfolio quality.
          </p>
          <p className="text-muted-foreground">
            Teaching Philosophy: Learn by building. Every lesson leads to a tangible project, detailed feedback, and confidence you can use in freelancing, internships, or full-time roles.
          </p>
        </div>
      </div>
    </section>
  );
};
