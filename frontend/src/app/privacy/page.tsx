import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Notice & Data Governance | Mayur Sawant",
  description:
    "Data privacy and protection policy for mayurprofile.com under India's Digital Personal Data Protection (DPDP) Act 2023.",
  alternates: {
    canonical: "https://mayurprofile.com/privacy",
  },
  openGraph: {
    title: "Privacy Notice & Data Governance | Mayur Sawant",
    description: "Data privacy policy under India's DPDP Act 2023.",
    url: "https://mayurprofile.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-12 border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 Compliant</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ink uppercase tracking-tight">
            Privacy Notice &amp; Data Governance
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Last Updated: November 2026. This policy describes how Mayur Sawant (&quot;we&quot;, &quot;our&quot;) collects,
            processes, and secures personal data through <strong className="text-ink">mayurprofile.com</strong> in
            accordance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023 and global privacy standards.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm text-muted leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-ink font-display font-bold text-xl">
              <Eye className="w-5 h-5 text-accent" />
              <h2>1. What Data We Collect</h2>
            </div>
            <p>
              We adhere strictly to the principle of <em>data minimization</em>. We only collect information that you
              voluntarily submit via our Contact Form to discuss freelance design, engineering projects, or professional
              inquiries:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong className="text-ink">Full Name:</strong> To address you personally in communications.</li>
              <li><strong className="text-ink">Email Address:</strong> To reply to your inquiry.</li>
              <li><strong className="text-ink">Project Type:</strong> To categorize the nature of your request.</li>
              <li><strong className="text-ink">Message Body:</strong> Details regarding your project requirements.</li>
            </ul>
            <p className="text-xs text-muted/80 pt-1">
              Note: We do not collect cookies for tracking, nor do we run cross-site behavioral advertising or fingerprinting.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-ink font-display font-bold text-xl">
              <Lock className="w-5 h-5 text-accent" />
              <h2>2. How We Protect Your Data</h2>
            </div>
            <p>
              Your data is secured through defense-in-depth technical and organizational controls:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong className="text-ink">Transport Encryption:</strong> All traffic is enforced over TLS 1.3/HTTPS with HTTP Strict Transport Security (HSTS).</li>
              <li><strong className="text-ink">Input Sanitization:</strong> Form inputs are sanitized against Cross-Site Scripting (XSS) and SQL injection.</li>
              <li><strong className="text-ink">Access Control:</strong> Administrative endpoints are locked behind JWT Bearer authentication and bcrypt password hashing.</li>
              <li><strong className="text-ink">Encrypted Storage:</strong> Database records are hosted on Neon PostgreSQL with isolated schema credentials.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-ink font-display font-bold text-xl">
              <Clock className="w-5 h-5 text-accent" />
              <h2>3. Data Retention &amp; Deletion</h2>
            </div>
            <p>
              Contact inquiries are retained only for as long as necessary to evaluate and correspond regarding the
              inquiry (typically up to 90 days), or for the duration of our contractual engagement. Inquiries that do not
              lead to an engagement are periodically purged.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-ink font-display font-bold text-xl">
              <Mail className="w-5 h-5 text-accent" />
              <h2>4. Your Rights Under the DPDP Act</h2>
            </div>
            <p>
              As a Data Principal, you possess the right to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Request a summary of personal data held about you.</li>
              <li>Request correction or updating of inaccurate data.</li>
              <li>Request complete erasure/deletion of your contact submissions.</li>
              <li>Nominate an individual to exercise rights on your behalf in case of incapacity.</li>
            </ul>
            <p className="pt-2">
              To exercise any of these rights, contact Mayur Sawant directly at:{" "}
              <a
                href="mailto:mayursawant0517@gmail.com"
                className="text-accent underline hover:text-accent-dark transition-colors"
              >
                mayursawant0517@gmail.com
              </a>
              . Requests are processed within 7 business days without fee.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
