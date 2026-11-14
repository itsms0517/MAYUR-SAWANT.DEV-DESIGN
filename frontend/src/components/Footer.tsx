import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/Icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-surface/50 mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-border">
          {/* Col 1: Bio & Value */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight text-ink">
              MAYUR SAWANT<span className="text-accent">.</span>
            </Link>
            <p className="text-muted text-sm max-w-md leading-relaxed">
              Full-stack developer and UI/UX designer based in Mumbai, India. Building modern web platforms with Next.js, React, and Python FastAPI.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Available for freelance contracts & engineering roles</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-ink/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-ink/80 hover:text-accent transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-ink/80 hover:text-accent transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink/80 hover:text-accent transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Connect</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href="https://linkedin.com/in/mayur-chandanshive-1125293a7/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink/80 hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-muted" />
              </a>
              <a
                href="https://github.com/itsms0517"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink/80 hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-muted" />
              </a>
              <a
                href="https://www.instagram.com/mayur_0518_"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink/80 hover:text-accent transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-muted" />
              </a>
              <a
                href="mailto:mayursawant0517@gmail.com"
                className="inline-flex items-center gap-1.5 text-ink/80 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>mayursawant0517@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>© {currentYear} Mayur Sawant. Built with Next.js, FastAPI & Neon PostgreSQL.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy Notice
            </Link>
            <Link href="/sitemap.xml" className="hover:text-ink transition-colors">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-ink transition-colors">
              Robots
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
