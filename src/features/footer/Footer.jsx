import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 mt-20">
      <div className="max-w-6xl mx-auto rounded-xl p-8 border border-border bg-card">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-2">Dev Fraol Academy</h3>
            <p className="text-sm text-muted-foreground">Project-based learning in Web Development and Graphic Design.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/instructor">Instructor</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm text-muted-foreground">hello@devfraol.academy</p>
            <p className="text-sm text-muted-foreground">Mon - Fri, 9AM - 6PM</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-8">© {currentYear} Dev Fraol Academy. All rights reserved.</p>
      </div>
    </footer>
  );
};
