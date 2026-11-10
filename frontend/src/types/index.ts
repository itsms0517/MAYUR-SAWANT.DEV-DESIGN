export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  problem?: string | null;
  solution?: string | null;
  result?: string | null;
  tech_stack?: string | null;
  cover_image: string;
  live_url?: string | null;
  repo_url?: string | null;
  category: "dev" | "design" | string;
  featured: boolean;
  created_at: string;
}

export interface Testimonial {
  id: number;
  author: string;
  role: string;
  quote: string;
  avatar?: string | null;
  created_at: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  project_type: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  project_type: string;
  message: string;
  created_at: string;
  is_read: boolean;
}
