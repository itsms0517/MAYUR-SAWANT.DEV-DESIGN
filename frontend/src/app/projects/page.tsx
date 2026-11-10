import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { fetchProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "Explore case studies and shipped projects by Mayur Sawant across Full-Stack Web Development, API Engineering, and UI/UX Design.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const resolvedParams = await searchParams;
  const categoryFilter = resolvedParams.category;

  const projects = await fetchProjects(categoryFilter);

  const categories = [
    { label: "All Projects", value: undefined },
    { label: "Full-Stack & Dev", value: "dev" },
    { label: "UI/UX & Design", value: "design" },
  ];

  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-8">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">Portfolio Gallery</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-ink uppercase tracking-tight">
            Work & Case Studies
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Real products built from concept to production. Filter between engineering and design works below.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-border">
          {categories.map((cat) => {
            const isActive = categoryFilter === cat.value;
            const href = cat.value ? `/projects?category=${cat.value}` : "/projects";
            return (
              <a
                key={cat.label}
                href={href}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border ${
                  isActive
                    ? "bg-accent text-background border-accent font-bold"
                    : "bg-surface border-border text-muted hover:border-ink/40 hover:text-ink"
                }`}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-border rounded-2xl">
            <p className="text-muted text-sm">No projects found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, idx) => (
              <ProjectCard key={p.id} project={p} priority={idx < 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
