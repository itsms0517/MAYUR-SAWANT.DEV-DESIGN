"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display font-bold text-xl tracking-tighter text-ink group-hover:text-accent transition-colors">
            MAYUR SAWANT<span className="text-accent">.</span>
          </span>
          <span className="text-xs uppercase tracking-widest text-muted hidden sm:inline-block border-l border-border pl-2">
            DEV & DESIGN
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide uppercase transition-colors font-medium ${
                  isActive ? "text-accent font-semibold" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-ink hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-surface px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-lg uppercase tracking-wider font-display text-ink hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center py-3 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent text-background"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
