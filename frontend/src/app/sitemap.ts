import { MetadataRoute } from "next";
import { fetchProjects } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mayursawant.dev";

  // Static routes
  const routes = ["", "/projects", "/services", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic project routes
  const projects = await fetchProjects();
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.created_at || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
