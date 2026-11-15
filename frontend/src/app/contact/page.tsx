import type { Metadata } from "next";
import { MessageSquare, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Linkedin } from "@/components/Icons";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmailButton } from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "Contact & Project Inquiries | Mayur Sawant",
  description:
    "Get in touch with Mayur Sawant for full-stack web engineering, UI/UX design, or technical consulting. Direct email, WhatsApp, and form.",
  alternates: {
    canonical: "https://mayurprofile.com/contact",
  },
  openGraph: {
    title: "Contact Mayur Sawant — Full-Stack Developer & UI/UX Designer",
    description: "Start a conversation about your web engineering or design project. Response within 24 hours.",
    url: "https://mayurprofile.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Context, Direct Links, WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-accent font-semibold">Start a Conversation</p>
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-ink uppercase tracking-tight">
                Let&apos;s Build Together
              </h1>
              <p className="text-muted text-base sm:text-lg leading-relaxed">
                Have an active project, an open engineering role, or a product idea? Send a message and
                I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Direct Connect Options */}
            <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Direct Channels</h3>
              
              <div className="space-y-3">
                <CopyEmailButton email="mayursawant0517@gmail.com" />

                {/* WhatsApp Fast Track */}
                <a
                  href="https://wa.me/919699017847?text=Hi%20Mayur,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-card border border-border hover:border-accent/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-accent font-semibold">WhatsApp Direct</p>
                      <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors">Chat on WhatsApp</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors pr-1" />
                </a>

                <a
                  href="https://linkedin.com/in/mayur-chandanshive-1125293a7/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-card border border-border hover:border-accent/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted">LinkedIn Network</p>
                      <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors">Mayur Chandanshive</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors pr-1" />
                </a>
              </div>
            </div>

            {/* Commitments */}
            <div className="space-y-3 pt-2 text-xs text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>Response guaranteed within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>NDA &amp; Client Confidentiality respected</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
