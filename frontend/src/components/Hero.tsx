import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 overflow-hidden">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:32px_32px] opacity-25 -z-10" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Primary Headline */}
        <div className="space-y-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-surface border border-border text-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Available for freelance &amp; full-time • Mumbai, India
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] uppercase text-ink">
            FULL-STACK <span className="text-muted hover:text-ink transition-colors">DEV</span> &amp;
            <br />
            <span className="text-accent">UI/UX</span> DESIGN.
          </h1>

          <p className="text-base sm:text-xl text-muted max-w-2xl pt-2 font-sans leading-relaxed">
            Hi, I&apos;m Mayur Sawant. I build responsive web apps with Next.js, React, and Python FastAPI, and design clean, accessible interfaces in Figma.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-accent/10"
          >
            <span>View Case Studies</span>
            <ArrowDownRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-surface border border-border text-ink hover:border-accent hover:text-accent transition-all duration-200"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/itsms0517"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-muted hover:text-ink transition-colors"
          >
            <span>GitHub ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
