import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-muted-foreground">Page not found.</p>
        <Link to="/" className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground">
          Go Home
        </Link>
      </div>
    </div>
  );
};
