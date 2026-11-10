import type { Metadata } from "next";
import { Mail, Linkedin, Instagram, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Project Inquiries",
  description:
    "Get in touch with Mayur Sawant for web engineering contracts, UI/UX design, or consultation. 24-hour reply guaranteed.",
};

export default function ContactPage() {
  return (
    <div className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Context, Direct Links, WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
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
                <a
                  href="mailto:mayursawant0517@gmail.com"
                  className="flex items-center gap-3 text-sm text-ink hover:text-accent transition-colors p-2 rounded-lg hover:bg-surface-card"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-card border border-border flex items-center justify-center text-accent">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Email Me Directly</p>
                    <p className="font-medium">mayursawant0517@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/mayur-chandanshive-1125293a7/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-ink hover:text-accent transition-colors p-2 rounded-lg hover:bg-surface-card"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-card border border-border flex items-center justify-center text-accent">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">LinkedIn Network</p>
                    <p className="font-medium">Mayur Chandanshive</p>
                  </div>
                </a>

                {/* WhatsApp Fast Track */}
                <a
                  href="https://wa.me/918369408225?text=Hi%20Mayur,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-ink hover:text-accent transition-colors p-2 rounded-lg hover:bg-surface-card"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-accent font-semibold">WhatsApp Fast Track</p>
                    <p className="font-medium">Quick Chat / Voice Call</p>
                  </div>
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
                <span>NDA & Client Confidentiality respected</span>
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
