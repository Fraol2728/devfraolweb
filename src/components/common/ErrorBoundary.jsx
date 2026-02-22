import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen px-6 py-24 text-center text-foreground">
          <h1 className="text-3xl font-bold">Something went wrong.</h1>
          <p className="mt-3 text-foreground/70">Please refresh the page and try again.</p>
        </main>
      );
    }

    return this.props.children;
  }
}
