"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Mail } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error digest safely for observability without exposing details to user
    console.error("Application error boundary triggered:", error.digest || error.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full bg-surface border border-border rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-bold text-2xl text-ink uppercase tracking-tight">
            Unexpected Error
          </h1>
          <p className="text-muted text-sm leading-relaxed">
            Something went wrong while rendering this page. The error has been logged for review.
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-muted/60 pt-1">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all duration-150"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-surface-card border border-border text-ink hover:border-accent hover:text-accent transition-all duration-150"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go Home</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-border">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Need immediate help? Contact Mayur</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
