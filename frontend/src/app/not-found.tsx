import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            Error 404
          </p>
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-ink uppercase tracking-tight">
            Page Not Found
          </h1>
          <p className="text-muted text-base max-w-md mx-auto leading-relaxed pt-2">
            The page you are looking for doesn&apos;t exist, has been moved, or the URL was entered incorrectly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all duration-150 shadow-lg shadow-accent/10"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-surface border border-border text-ink hover:border-accent hover:text-accent transition-all duration-150"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
