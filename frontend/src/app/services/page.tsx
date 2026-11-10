import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpRight, Code, Palette, Smartphone, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Pricing Packages",
  description:
    "Full-Stack Web Development, UI/UX Design, and API Engineering services by Mayur Sawant. Transparent pricing and clear deliverables.",
};

const PACKAGES = [
  {
    name: "Design-to-Code Landing Page",
    tagline: "High-converting web experience built for speed & conversions",
    price: "₹14,999",
    timeline: "3–5 days",
    icon: Sparkles,
    features: [
      "Custom responsive design in Figma",
      "Next.js App Router & Tailwind CSS code",
      "Framer Motion micro-animations",
      "100 Lighthouse performance & SEO score",
      "Contact form with email alerts",
      "Vercel or custom domain deployment",
    ],
  },
  {
    name: "Full-Stack Web Application",
    tagline: "Custom platform with secure database, auth, and REST APIs",
    price: "₹39,999",
    timeline: "2–3 weeks",
    featured: true,
    icon: Code,
    features: [
      "Everything in Landing Page package",
      "FastAPI (Python) backend or Next.js API",
      "Neon PostgreSQL database integration",
      "JWT authentication & admin dashboard",
      "Cloud Run or Render deployment",
      "Complete CI/CD GitHub Actions setup",
      "30 days post-launch technical support",
    ],
  },
  {
    name: "Complete UI/UX & Brand System",
    tagline: "End-to-end product design, token library, and typography",
    price: "₹21,999",
    timeline: "1–2 weeks",
    icon: Palette,
    features: [
      "User research, wireframing & personas",
      "High-fidelity desktop & mobile UI in Figma",
      "Complete design system & tokens",
      "Custom editorial typography system",
      "Interactive clickable prototypes",
      "Developer-ready design handoff file",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">Offerings</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-ink uppercase tracking-tight">
            Services & Transparent Packages
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Direct collaboration with an engineer-designer. No bloated agency overhead, no miscommunication,
            and fast turnaround times.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.name}
                className={`p-8 rounded-2xl bg-surface border flex flex-col justify-between space-y-8 relative ${
                  pkg.featured
                    ? "border-accent shadow-xl shadow-accent/10"
                    : "border-border hover:border-accent/40"
                } transition-all`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3.5 left-8 px-3 py-0.5 rounded-full bg-accent text-background text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted">
                      Est. {pkg.timeline}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-2xl text-ink">{pkg.name}</h3>
                    <p className="text-muted text-xs mt-1 leading-relaxed">{pkg.tagline}</p>
                  </div>

                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="text-xs uppercase tracking-wider text-muted font-semibold">Starting at</span>
                    <span className="font-display font-extrabold text-4xl text-ink">{pkg.price}</span>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-border text-xs text-muted">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-ink/85">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-center transition-all ${
                    pkg.featured
                      ? "bg-accent text-background hover:bg-accent-dark"
                      : "bg-surface-card border border-border text-ink hover:border-accent hover:text-accent"
                  }`}
                >
                  Book This Package
                </Link>
              </div>
            );
          })}
        </div>

        {/* Process Steps (01-04) */}
        <div className="pt-16 border-t border-border space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold">Methodology</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight">
              How We Work Together
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
              <span className="font-display font-bold text-3xl text-accent/60">01</span>
              <h3 className="font-display font-bold text-lg text-ink">Discovery & Scope</h3>
              <p className="text-muted text-xs leading-relaxed">
                Initial consultation to define target KPIs, features, tech stack, and milestone deliverables.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
              <span className="font-display font-bold text-3xl text-accent/60">02</span>
              <h3 className="font-display font-bold text-lg text-ink">Design & Prototype</h3>
              <p className="text-muted text-xs leading-relaxed">
                Crafting interactive Figma flows, user journeys, and component systems for your sign-off.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
              <span className="font-display font-bold text-3xl text-accent/60">03</span>
              <h3 className="font-display font-bold text-lg text-ink">Full-Stack Build</h3>
              <p className="text-muted text-xs leading-relaxed">
                Developing clean TypeScript Next.js frontend and FastAPI backend with database integration.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
              <span className="font-display font-bold text-3xl text-accent/60">04</span>
              <h3 className="font-display font-bold text-lg text-ink">Launch & Scale</h3>
              <p className="text-muted text-xs leading-relaxed">
                Production deployment on Vercel & Google Cloud Run, domain setup, and ongoing support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
