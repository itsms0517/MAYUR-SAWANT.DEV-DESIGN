import { Project, Testimonial, ContactFormValues, ContactResponse } from "@/types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://mayur-sawant-dev-design-1.onrender.com/api").replace(/\/$/, "");

// Fallback data in case backend is waking up or not yet connected during build
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 4,
    slug: "norgezstay-pg-flat-rental-platform",
    title: "NorgezStay — PG & Flat Rental Platform",
    summary: "Accommodation discovery platform for verified PG hostels and flats with real-time search, filters, and visit booking.",
    problem: "Students and professionals moving to new cities struggle with unverified rental listings, lack of transparent amenities, and slow physical visit coordination.",
    solution: "Built a responsive web application using React 19, Vite, TypeScript, and Tailwind CSS. Built instant client-side filtering by budget, sharing type, and amenities, along with an interactive visit scheduler and sound-assisted UI feedback.",
    result: "Sub-second filtering across listings, clean mobile-responsive user experience, and an integrated management view.",
    tech_stack: "React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Web Audio API",
    cover_image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    live_url: "https://norgezstay.vercel.app",
    repo_url: "https://github.com/itsms0517",
    category: "dev",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 1,
    slug: "ai-powered-portfolio-platform",
    title: "Full-Stack Portfolio & CMS Platform",
    summary: "Personal portfolio and content platform built with Next.js 15, FastAPI, and Neon PostgreSQL.",
    problem: "Needed a clean, fast portfolio platform with dynamic case study management, API health monitoring, and strong technical SEO.",
    solution: "Built a decoupled system with Next.js 15 App Router on the frontend for ISR edge delivery, and a Python FastAPI backend with Neon serverless PostgreSQL and Docker.",
    result: "Instant edge page loads, structured JSON-LD Schema metadata for Google, and an administrative portal for project management.",
    tech_stack: "Next.js 15, TypeScript, FastAPI, PostgreSQL, Tailwind CSS, Docker",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    live_url: "https://mayurprofile.com",
    repo_url: "https://github.com/itsms0517/MAYUR-SAWANT.DEV-DESIGN",
    category: "dev",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    slug: "cosmos-brand-visual-system",
    title: "COSMOS Brand & Design Exploration",
    summary: "Typography-focused brand exploration, editorial poster compositions, and design token system in Figma.",
    problem: "Exploring high-contrast typography treatments and modular layouts for creative technology interfaces.",
    solution: "Designed a design system in Figma featuring custom grid structures, editorial typography hierarchy, and dark-mode color tokens.",
    result: "Comprehensive component library and visual identity with reusable design tokens.",
    tech_stack: "Figma, Adobe Illustrator, Design Systems, Typography",
    cover_image: "https://images.unsplash.com/photo-1619632973808-4acf8041df42?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    live_url: "",
    repo_url: "https://github.com/itsms0517",
    category: "design",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    slug: "analytics-dashboard-ux",
    title: "SaaS Analytics Dashboard UI/UX",
    summary: "Modular bento-grid dashboard concept in Figma exploring high-density data visualization.",
    problem: "Complex data dashboards often become cluttered and difficult to navigate on different screen sizes.",
    solution: "Prototyped a modular bento-style interface with dark-mode contrast, contextual filters, and clear visual hierarchy for charts.",
    result: "Clean UI prototype tested for fast information scanning and accessible color contrast.",
    tech_stack: "Figma, UI/UX, Design Tokens, Prototyping",
    cover_image: "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    live_url: "",
    repo_url: "https://github.com/itsms0517",
    category: "design",
    featured: false,
    created_at: new Date().toISOString(),
  },
];

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 2500): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      next: { revalidate: 60 },
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchProjects(category?: string, featured?: boolean): Promise<Project[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (featured !== undefined) params.append("featured", String(featured));

    const url = `${API_BASE}/projects?${params.toString()}`;
    const res = await fetchWithTimeout(url);

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
    const res = await fetchWithTimeout(`${API_BASE}/projects/${slug}`);
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
    const res = await fetchWithTimeout(`${API_BASE}/testimonials`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch {
    return [];
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
