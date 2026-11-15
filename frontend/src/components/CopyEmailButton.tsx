"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { toast } from "sonner";

interface CopyEmailButtonProps {
  email?: string;
  variant?: "card" | "inline";
  className?: string;
}

export function CopyEmailButton({
  email = "mayursawant0517@gmail.com",
  variant = "card",
  className = "",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Copied email to clipboard!", {
        description: email,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.info(`Email: ${email}`);
    }
  };

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 text-sm text-ink/80 hover:text-accent transition-colors cursor-pointer group ${className}`}
        title="Click to copy email"
      >
        <Mail className="w-4 h-4" />
        <span>{email}</span>
        {copied ? (
          <Check className="w-3.5 h-3.5 text-accent" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-muted opacity-60 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`w-full flex items-center justify-between text-left p-3 rounded-xl bg-surface-card border border-border hover:border-accent/50 transition-all cursor-pointer group ${className}`}
      title="Click to copy email"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
          <Mail className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-muted">Direct Email (Click to copy)</p>
          <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
            {email}
          </p>
        </div>
      </div>
      <div className="text-muted group-hover:text-accent transition-colors pr-2">
        {copied ? (
          <span className="flex items-center gap-1 text-xs text-accent font-medium">
            <Check className="w-3.5 h-3.5" /> Copied
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-muted/70 group-hover:text-accent">
            <Copy className="w-3.5 h-3.5" /> Copy
          </span>
        )}
      </div>
    </button>
  );
}
