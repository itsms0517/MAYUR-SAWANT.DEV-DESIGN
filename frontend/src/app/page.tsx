import Link from "next/link";
import { ArrowUpRight, Check, Laptop, Palette, Terminal, Zap } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Testimonials } from "@/components/Testimonials";
import { fetchProjects, fetchTestimonials } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    fetchProjects(undefined, true),
    fetchTestimonials(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Selected Work Section */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-accent font-semibold">Featured Work</p>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
                Selected Case Studies
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

      {/* Services & Capabilities Bento Grid */}
      <section className="py-16 md:py-20 border-t border-border bg-surface/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold">What I Deliver</p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
              Engineering Meets High-Impact Design
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              Eliminate friction between design handoff and code execution by partnering with a cross-functional creator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bento Card 1: Web Development */}
            <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between space-y-6 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-ink">Frontend Engineering</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Fast, SEO-optimized web applications with Next.js, React 19, TypeScript, and accessible Tailwind styling.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-muted/90 border-t border-border pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Server-side rendering (SSR & ISR)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Smooth micro-interactions & animations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> 95+ Lighthouse mobile & desktop scores
                </li>
              </ul>
            </div>

            {/* Bento Card 2: Backend & Database */}
            <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between space-y-6 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Terminal className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-ink">Backend & Database APIs</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Robust REST APIs using FastAPI, PostgreSQL (Neon), connection pooling, and containerized Cloud Run deployments.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-muted/90 border-t border-border pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Pydantic data validation & OpenAPI docs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Neon serverless PostgreSQL & pooling
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Scalable Docker containerization
                </li>
              </ul>
            </div>

            {/* Bento Card 3: UI/UX & Design Systems */}
            <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between space-y-6 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Palette className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-ink">UI/UX & Brand Design</h3>
                <p className="text-muted text-sm leading-relaxed">
                  High-converting user flows, responsive wireframes, design tokens, and distinctive visual identities that resonate.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-muted/90 border-t border-border pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Wireframing & interactive Figma prototypes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Design token systems for devs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent" /> Custom typography & editorial aesthetics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Bottom CTA Banner */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mx-auto">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-ink tracking-tight uppercase">
            Have a project in mind? Let&apos;s build something exceptional.
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            Whether you need a full-stack platform built from scratch, or high-fidelity UI/UX design,
            I&apos;m ready to collaborate.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-accent/15"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
