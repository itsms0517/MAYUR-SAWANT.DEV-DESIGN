import { Project, Testimonial, ContactFormValues, ContactResponse } from "@/types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

// Fallback data in case backend is waking up or not yet connected during build
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    slug: "ai-powered-portfolio-platform",
    title: "AI-Powered Modern Portfolio Platform",
    summary: "Full-stack portfolio and CMS platform with Next.js, FastAPI, and Neon PostgreSQL.",
    problem: "Traditional static portfolios lack dynamic lead tracking, real-time analytics, and ease of content updates.",
    solution: "Architected a decoupled system using Next.js App Router for optimal SEO with a secure FastAPI + Neon Postgres backend.",
    result: "100 Lighthouse performance, sub-second API responses, and automated Resend email lead pipeline.",
    tech_stack: "Next.js, TypeScript, FastAPI, PostgreSQL, Tailwind CSS, Docker",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    live_url: "https://mayursawant.dev",
    repo_url: "https://github.com/mayurchandanshive/portfolio",
    category: "dev",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    slug: "cosmos-brand-visual-system",
    title: "COSMOS 2.0 Brand & Design System",
    summary: "Complete typography-first visual identity, editorial poster series, and modern design tokens.",
    problem: "Brand needed a high-impact, futuristic design identity to stand out in the creative technology space.",
    solution: "Crafted a comprehensive design system featuring custom grid layouts, high-contrast typography, and acid-lime accents.",
    result: "Increased client engagement by 140% and featured in contemporary typography publications.",
    tech_stack: "Figma, Adobe Illustrator, Design Systems, Typography",
    cover_image: "https://images.unsplash.com/photo-1619632973808-4acf8041df42?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    live_url: "https://mayursawant.dev/projects",
    category: "design",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    slug: "analytics-dashboard-ux",
    title: "SaaS Analytics Dashboard UI/UX",
    summary: "High-density data visualization and workflow dashboard for marketing & revenue teams.",
    problem: "Users were overwhelmed by fragmented charts and clunky navigation across complex metrics.",
    solution: "Designed an intuitive bento-grid modular layout with dark-mode optimized contrast and contextual filter toolbars.",
    result: "Decreased task completion time by 38% during usability testing.",
    tech_stack: "Figma, UI/UX, Design Tokens, Prototyping",
    cover_image: "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    live_url: "https://mayursawant.dev/projects",
    category: "design",
    featured: false,
    created_at: new Date().toISOString(),
  },
];

export async function fetchProjects(category?: string, featured?: boolean): Promise<Project[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (featured !== undefined) params.append("featured", String(featured));

    const url = `${API_BASE}/projects?${params.toString()}`;
    const res = await fetch(url, {
      next: { revalidate: 60 }, // ISR: Cache for 60 seconds
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("fetchProjects falling back to offline data:", err);
    let filtered = FALLBACK_PROJECTS;
    if (category) filtered = filtered.filter((p) => p.category === category);
    if (featured !== undefined) filtered = filtered.filter((p) => p.featured === featured);
    return filtered;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE}/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`fetchProjectBySlug(${slug}) falling back to offline data:`, err);
    return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_BASE}/testimonials`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("fetchTestimonials falling back to offline data:", err);
    return [
      {
        id: 1,
        author: "Sarah Jenkins",
        role: "Creative Director at StudioForm",
        quote: "Mayur brings a rare combination of exceptional visual craft and full-stack engineering discipline.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&q=80&w=200",
        created_at: new Date().toISOString(),
      },
    ];
  }
}

export async function submitContactMessage(values: ContactFormValues): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to submit message. Please try again.");
  }

  return await res.json();
}
