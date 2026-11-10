"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Mail, CheckCircle, LogOut, RefreshCw, FolderGit2, Star } from "lucide-react";
import { Project, ContactResponse } from "@/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<"projects" | "messages">("messages");

  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // New Project Form
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    summary: "",
    problem: "",
    solution: "",
    result: "",
    tech_stack: "",
    cover_image: "",
    live_url: "",
    repo_url: "",
    category: "dev",
    featured: true,
  });

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "https://mayur-sawant-dev-design-1.onrender.com/api").replace(/\/$/, "");

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (!stored) {
      router.push("/admin/login");
      return;
    }
    setToken(stored);
    loadData(stored);
  }, []);

  const loadData = async (jwtToken: string) => {
    setLoading(true);
    try {
      // 1. Fetch messages
      const msgRes = await fetch(`${apiBase}/admin/messages`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      if (msgRes.status === 401) {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      if (msgRes.ok) {
        setMessages(await msgRes.json());
      }

      // 2. Fetch projects
      const projRes = await fetch(`${apiBase}/projects`);
      if (projRes.ok) {
        setProjects(await projRes.json());
      }
    } catch {
      toast.error("Network error while connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.info("Signed out");
    router.push("/admin/login");
  };

  const handleMarkRead = async (id: number) => {
    if (!token) return;
    try {
      const res = await fetch(`${apiBase}/admin/messages/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
        );
        toast.success("Marked as read");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!token || !confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${apiBase}/admin/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        toast.success("Project deleted");
      }
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch(`${apiBase}/admin/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Failed to create project");
      }

      const created = await res.json();
      setProjects([created, ...projects]);
      setShowNewProject(false);
      setNewProject({
        title: "",
        slug: "",
        summary: "",
        problem: "",
        solution: "",
        result: "",
        tech_stack: "",
        cover_image: "",
        live_url: "",
        repo_url: "",
        category: "dev",
        featured: true,
      });
      toast.success("Project published successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to publish project";
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="font-display font-bold text-3xl text-ink">Admin Control Center</h1>
          <p className="text-xs text-muted">Manage portfolio projects and incoming client leads</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => token && loadData(token)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-border text-muted hover:text-ink hover:border-accent transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-border text-muted hover:text-red-400 hover:border-red-400/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTab("messages")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
            tab === "messages"
              ? "bg-accent text-background font-bold"
              : "bg-surface border border-border text-muted hover:text-ink"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Messages ({messages.filter((m) => !m.is_read).length} unread)</span>
        </button>
        <button
          onClick={() => setTab("projects")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
            tab === "projects"
              ? "bg-accent text-background font-bold"
              : "bg-surface border border-border text-muted hover:text-ink"
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projects ({projects.length})</span>
        </button>
      </div>

      {/* Messages Tab */}
      {tab === "messages" && (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface border border-border text-muted text-sm">
              No contact inquiries yet.
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-6 rounded-2xl border transition-colors ${
                  msg.is_read ? "bg-surface/50 border-border" : "bg-surface border-accent/40 shadow-sm"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-lg text-ink">{msg.name}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-surface-card border border-border text-muted">
                        {msg.project_type}
                      </span>
                      {!msg.is_read && (
                        <span className="w-2 h-2 rounded-full bg-accent" title="New Message" />
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-accent hover:underline block"
                    >
                      {msg.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                    {!msg.is_read && (
                      <button
                        onClick={() => handleMarkRead(msg.id)}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-surface-card border border-border hover:border-accent text-ink"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-accent" />
                        <span>Mark Read</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-surface-card text-ink/90 text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Projects Tab */}
      {tab === "projects" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-ink">Published Projects</h2>
            <button
              onClick={() => setShowNewProject(!showNewProject)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{showNewProject ? "Cancel" : "Add Project"}</span>
            </button>
          </div>

          {/* Add Project Form */}
          {showNewProject && (
            <form onSubmit={handleCreateProject} className="p-6 rounded-2xl bg-surface border border-border space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent">New Project Entry</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern E-Commerce Platform"
                    value={newProject.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                      setNewProject({ ...newProject, title, slug });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. modern-ecommerce-platform"
                    value={newProject.slug}
                    onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">Short Summary / Tagline</label>
                <textarea
                  required
                  rows={2}
                  placeholder="High-level description of what this product does..."
                  value={newProject.summary}
                  onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink resize-none"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Deep Dive Case Study Content</h4>
                
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">01. The Problem &amp; Context</label>
                  <textarea
                    rows={2}
                    placeholder="What user pain point, market challenge, or inefficiency did this project address?"
                    value={newProject.problem}
                    onChange={(e) => setNewProject({ ...newProject, problem: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">02. Architecture &amp; The Solution</label>
                  <textarea
                    rows={2}
                    placeholder="How was it designed and engineered? Technical choices, system design, UX flows..."
                    value={newProject.solution}
                    onChange={(e) => setNewProject({ ...newProject, solution: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1">03. Measurable Impact &amp; Results</label>
                  <textarea
                    rows={2}
                    placeholder="KPIs, performance metrics, Lighthouse scores, user engagement gains..."
                    value={newProject.result}
                    onChange={(e) => setNewProject({ ...newProject, result: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newProject.cover_image}
                    onChange={(e) => setNewProject({ ...newProject, cover_image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">Tech Stack</label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js, FastAPI, PostgreSQL"
                    value={newProject.tech_stack}
                    onChange={(e) => setNewProject({ ...newProject, tech_stack: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newProject.live_url}
                    onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newProject.repo_url}
                    onChange={(e) => setNewProject({ ...newProject, repo_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-ink"
                  >
                    <option value="dev">Full-Stack / Dev</option>
                    <option value="design">UI/UX &amp; Design</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={newProject.featured}
                  onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                  className="w-4 h-4 accent-accent rounded"
                />
                <label htmlFor="featured-toggle" className="text-xs text-ink font-semibold cursor-pointer">
                  Feature this project on the Homepage (&quot;Selected Case Studies&quot;)
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all"
                >
                  Publish Project
                </button>
              </div>
            </form>
          )}

          {/* Project List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-xl bg-surface border border-border flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-base text-ink">{proj.title}</h4>
                    {proj.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                        <Star className="w-2.5 h-2.5 fill-accent" /> Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted">/{proj.slug} • {proj.category}</p>
                </div>
                <button
                  onClick={() => handleDeleteProject(proj.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
