import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/Icons";
import { fetchProjectBySlug } from "@/lib/api";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study by Mayur Sawant`,
      description: project.summary,
      images: [{ url: project.cover_image, alt: project.title }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const techStackList = project.tech_stack
    ? project.tech_stack.split(",").map((s) => s.trim())
    : [];

  return (
    <article className="pt-8 pb-16 md:pt-12 md:pb-20">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Work</span>
          </Link>
        </div>

        {/* Title & Metadata Header */}
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/10 border border-accent/20 text-accent">
            {project.category === "dev" ? "Full-Stack Development" : "UI/UX & Design"}
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-ink tracking-tight">
            {project.title}
          </h1>
          <p className="text-muted text-lg sm:text-xl max-w-3xl leading-relaxed">
            {project.summary}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface border border-border text-ink hover:border-accent hover:text-accent transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-surface-card border border-border">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover"
          />
        </div>

        {/* Deep Dive Case Study Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
          {/* Main Story: Problem, Solution, Results */}
          <div className="md:col-span-8 space-y-12">
            {project.problem && (
              <section className="space-y-4">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
                  01. The Problem & Context
                </h2>
                <p className="text-muted text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.problem}
                </p>
              </section>
            )}

            {project.solution && (
              <section className="space-y-4">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
                  02. Architecture & The Solution
                </h2>
                <p className="text-muted text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.solution}
                </p>
              </section>
            )}

            {project.result && (
              <section className="space-y-4 p-8 rounded-2xl bg-surface border border-accent/20">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="w-5 h-5" />
                  <h2 className="font-display font-bold text-2xl text-ink">
                    03. Measurable Impact & Results
                  </h2>
                </div>
                <p className="text-ink/90 text-base leading-relaxed whitespace-pre-line">
                  {project.result}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar Meta */}
          <div className="md:col-span-4 space-y-8">
            <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Role & Discipline</h3>
                <p className="text-sm font-semibold text-ink">
                  {project.category === "dev" ? "Full-Stack Software Engineer" : "Lead UI/UX Designer"}
                </p>
              </div>

              {techStackList.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Tech Stack</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {techStackList.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-md bg-surface-card border border-border text-muted font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Interested in similar results?</h3>
                <Link
                  href="/contact"
                  className="block text-center py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
