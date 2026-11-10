import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Code2, Sparkles, Layers } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 overflow-hidden">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:32px_32px] opacity-25 -z-10" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs text-ink/90 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="font-medium text-accent">Available for New Projects</span>
          <span className="text-muted">• Q4 2026 / 2027</span>
        </div>

        {/* Primary Headline */}
        <div className="space-y-4 max-w-5xl">
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] uppercase text-ink">
            FULL-STACK <span className="text-muted hover:text-ink transition-colors">ENGINEERING</span> &
            <br />
            <span className="text-accent underline decoration-accent/30 decoration-wavy decoration-2">
              DISTINCTIVE
            </span>{" "}
            UI/UX DESIGN.
          </h1>

          <p className="text-base sm:text-xl text-muted max-w-2xl pt-4 font-sans leading-relaxed">
            I help startups, agencies, and businesses turn complex product visions into high-performing,
            accessible web applications and scalable backends.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-accent/10"
          >
            <span>Get a Free Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-surface border border-border text-ink hover:border-accent hover:text-accent transition-all duration-200"
          >
            <span>Explore Work</span>
            <ArrowDownRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Key Stats Strip */}
        <div className="mt-20 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent">
              <Code2 className="w-4 h-4" />
              <span className="font-display font-bold text-3xl sm:text-4xl text-ink">20+</span>
            </div>
            <p className="text-xs uppercase tracking-wider text-muted">Shipped Web & API Projects</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles className="w-4 h-4" />
              <span className="font-display font-bold text-3xl sm:text-4xl text-ink">100%</span>
            </div>
            <p className="text-xs uppercase tracking-wider text-muted">Lighthouse SEO & Speed Target</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent">
              <Layers className="w-4 h-4" />
              <span className="font-display font-bold text-3xl sm:text-4xl text-ink">Modern</span>
            </div>
            <p className="text-xs uppercase tracking-wider text-muted">Next.js & FastAPI Architecture</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="font-display font-bold text-3xl sm:text-4xl text-ink">&lt; 24h</span>
            </div>
            <p className="text-xs uppercase tracking-wider text-muted">Guaranteed Response Window</p>
          </div>
        </div>
      </div>
    </section>
  );
}
