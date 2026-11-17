import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Code, Compass, Layers, MessageSquare, Sparkles, Terminal } from "lucide-react";
import { CopyEmailButton } from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "About | Mayur Sawant — Full-Stack Developer & UI/UX Designer",
  description:
    "Learn about Mayur Sawant, full-stack software engineer and UI/UX designer based in Mumbai, India. Background, engineering philosophy, and technology stack.",
  alternates: {
    canonical: "https://mayurprofile.com/about",
  },
  openGraph: {
    title: "About Mayur Sawant — Full-Stack Developer & UI/UX Designer",
    description: "Building responsive web applications with Next.js, React, Python FastAPI, and Figma.",
    url: "https://mayurprofile.com/about",
  },
};

const PORTRAIT_URL = "/mayur.jpg";

export default function AboutPage() {
  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-surface border border-border text-muted">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              About Me • Mumbai, India
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-ink tracking-tight uppercase leading-[1.05]">
              Architecting web apps that <span className="text-accent">look clean</span> &amp; run fast.
            </h1>

            <div className="space-y-4 text-muted text-base sm:text-lg leading-relaxed font-sans">
              <p>
                Hi! I&apos;m <strong className="text-ink font-semibold">Mayur Sawant</strong>, a full-stack developer
                and UI/UX designer based in Mumbai, India.
              </p>
              <p>
                Most modern digital products suffer from a gap between design in Figma and code implementation.
                Because I work across both design and engineering, I eliminate that friction—translating user flows
                and responsive component systems into typed, high-performance Next.js and Python FastAPI applications.
              </p>
              <p>
                Whether I&apos;m building real-time search filters for platforms like <em>NorgezStay</em> or designing
                clean design token hierarchies in Figma, I focus on performance, accessibility, and intuitive interactions.
              </p>
            </div>

            {/* Direct Connect Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all shadow-lg shadow-accent/10"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919699017847?text=Hi%20Mayur,%20I%20saw%20your%20About%20page%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface border border-border text-ink hover:border-accent hover:text-accent transition-all"
              >
                <MessageSquare className="w-4 h-4 text-accent" />
                <span>WhatsApp ↗</span>
              </a>
              <CopyEmailButton email="mayursawant0517@gmail.com" variant="inline" className="ml-2" />
            </div>
          </div>

          {/* Portrait Photo Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-surface border border-border p-3 shadow-2xl">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-card border border-border/60">
                <Image
                  src={PORTRAIT_URL}
                  alt="Mayur Sawant — Full-Stack Developer & UI/UX Designer"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <p className="font-display font-bold text-lg text-ink">Mayur Sawant</p>
                  <p className="text-xs text-accent font-mono uppercase tracking-wider">
                    Full-Stack Dev &amp; UI/UX Designer
                  </p>
                </div>
              </div>

              <div className="mt-2.5 px-3 py-1 flex items-center justify-between text-xs text-muted">
                <span>Based in Mumbai, India</span>
                <span className="flex items-center gap-1.5 text-accent font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Available for Work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy & Approach Bento */}
        <div className="space-y-8 pt-8 border-t border-border">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold">How I Work</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight">
              My Engineering Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-surface border border-border space-y-4 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">Design Systems First</h3>
              <p className="text-muted text-sm leading-relaxed">
                Before writing front-end code, I map out typography scales, color palettes, and component states in Figma.
                This ensures predictable layouts and reusable code tokens.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border space-y-4 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">Strict Typing &amp; Modern Frameworks</h3>
              <p className="text-muted text-sm leading-relaxed">
                I use TypeScript and React 19 / Next.js 15 for frontend reliability, combined with Python FastAPI and Pydantic
                for type-safe data modeling and validation.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border space-y-4 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">Edge Speed &amp; SEO</h3>
              <p className="text-muted text-sm leading-relaxed">
                Every page is optimized for sub-second responses using Edge CDN caching (ISR), clean semantic HTML,
                and structured Schema.org metadata for Googlebot crawling.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Overview */}
        <div className="space-y-8 pt-8 border-t border-border">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold">Technical Skills</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight">
              Tools &amp; Technologies
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-accent font-semibold">01. Frontend</span>
              <ul className="space-y-1.5 text-sm text-ink/90">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Next.js 15 App Router</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> React 19 &amp; Vite</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> TypeScript</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Tailwind CSS</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-accent font-semibold">02. Backend &amp; DB</span>
              <ul className="space-y-1.5 text-sm text-ink/90">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Python &amp; FastAPI</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> PostgreSQL (Neon)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> SQLAlchemy ORM</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> RESTful APIs</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-accent font-semibold">03. UI/UX Design</span>
              <ul className="space-y-1.5 text-sm text-ink/90">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Figma Wireframing</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Interactive Prototypes</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Design Tokens</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Mobile Responsive UI</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-accent font-semibold">04. DevOps &amp; Tools</span>
              <ul className="space-y-1.5 text-sm text-ink/90">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Docker Containers</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Git &amp; GitHub Desktop</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Vercel Edge</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-accent" /> Render Cloud</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-10 rounded-2xl bg-surface border border-border text-center space-y-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight">
            Want to Discuss a Project or Opportunity?
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto">
            I&apos;m currently available for freelance contracts and engineering roles. Let&apos;s talk about what you&apos;re building.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all"
            >
              Start a Conversation
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface border border-border text-ink hover:border-accent hover:text-accent transition-all"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
