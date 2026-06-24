import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky to-background px-4 text-center">
      <div className="max-w-md">
        <p className="mb-3 inline-flex rounded-full bg-card px-4 py-1.5 text-sm font-body font-semibold text-blue shadow-sm">
          Page not found
        </p>
        <h1 className="mb-4 text-5xl font-display text-foreground">404</h1>
        <p className="mb-8 text-base font-body leading-relaxed text-mid-grey">
          This page does not exist or may have moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-blue px-6 py-3 text-sm font-body font-semibold text-primary-foreground shadow-md shadow-blue/20 transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
