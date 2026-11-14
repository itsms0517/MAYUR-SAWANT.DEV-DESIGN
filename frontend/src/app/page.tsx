import Link from "next/link";
import { ArrowUpRight, Check, Laptop, Palette, Terminal, Zap } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { fetchProjects } from "@/lib/api";

export const revalidate = 60;

export default async function HomePage() {
  const projects = await fetchProjects(undefined, true);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Selected Work Section */}
      <section className="py-14 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-accent font-semibold">Featured Work</p>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
                Projects &amp; Case Studies
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted hover:text-accent transition-colors"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Focus Areas */}
      <section className="py-14 md:py-20 border-t border-border bg-surface/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold">Core Focus</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight">
              What I Work With
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              Tools and technologies I use to build full-stack web applications from concept to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Frontend */}
            <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between space-y-6 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-ink">Frontend Development</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Responsive, fast user interfaces with modern React, Next.js, and TypeScript.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-muted/90 border-t border-border pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Next.js 15 &amp; React 19 App Router
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> TypeScript &amp; Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Performance &amp; Core Web Vitals optimization
                </li>
              </ul>
            </div>

            {/* Card 2: Backend */}
            <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between space-y-6 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Terminal className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-ink">Backend &amp; APIs</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Clean, structured backend services with Python FastAPI, relational databases, and Docker.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-muted/90 border-t border-border pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> FastAPI with Pydantic validation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> PostgreSQL database schema &amp; queries
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Docker containerization &amp; deployment
                </li>
              </ul>
            </div>

            {/* Card 3: UI/UX */}
            <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between space-y-6 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Palette className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-ink">UI/UX &amp; Prototyping</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Designing thoughtful wireframes, components, and interactive prototypes in Figma before writing code.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-muted/90 border-t border-border pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Figma wireframes &amp; user flow mapping
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Design systems &amp; reusable components
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Mobile-first layout design
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-14 md:py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mx-auto">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink tracking-tight uppercase">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-muted text-base max-w-lg mx-auto">
            Have a project in mind, need a developer, or want to discuss a full-time role? Send me a message and I&apos;ll get back to you.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-accent/15"
            >
              <span>Send a Message</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
