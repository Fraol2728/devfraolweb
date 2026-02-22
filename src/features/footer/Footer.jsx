import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="px-6 py-10 border-t border-border/60 mt-16">
      <div className="container max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Dev Fraol Academy. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/courses" className="hover:text-primary">Courses</Link>
          <Link to="/testimonials" className="hover:text-primary">Testimonials</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>
      </div>
    </footer>
  );
};
