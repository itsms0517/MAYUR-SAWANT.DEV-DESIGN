import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const techTags = project.tech_stack
    ? project.tech_stack.split(",").map((t) => t.trim())
    : [];

  return (
    <div className="group relative flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/60 transition-all duration-300">
      {/* Image Container */}
      <Link href={`/projects/${project.slug}`} className="relative w-full aspect-[16/10] overflow-hidden bg-surface-card block">
        <Image
          src={project.cover_image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-background/90 backdrop-blur-md border border-border text-ink">
            {project.category === "dev" ? "Development" : "UI/UX & Design"}
          </span>
        </div>

        {/* Floating View Arrow */}
        <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-accent text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </Link>

      {/* Info Body */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-muted text-sm line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tech tags */}
        {techTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {techTags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-md bg-surface-card border border-border/80 text-muted"
              >
                {tag}
              </span>
            ))}
            {techTags.length > 4 && (
              <span className="text-xs px-2 py-0.5 text-muted">
                +{techTags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Links Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-accent flex items-center gap-1 transition-colors"
          >
            <span>Read Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-3">
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink transition-colors p-1"
                aria-label="View source code"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink transition-colors p-1"
                aria-label="View live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
