"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

    try {
      const res = await fetch(`${apiBase}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Invalid email or password");
      }

      const data = await res.json();
      localStorage.setItem("admin_token", data.access_token);
      toast.success("Welcome back, Mayur!");
      router.push("/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 rounded-2xl bg-surface border border-border space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-display font-bold text-2xl text-ink">Admin Control Center</h1>
          <p className="text-xs text-muted">Sign in to manage projects & view client messages</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-muted font-semibold">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mayursawant0517@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-card border border-border text-ink text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-muted font-semibold">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-card border border-border text-ink text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
