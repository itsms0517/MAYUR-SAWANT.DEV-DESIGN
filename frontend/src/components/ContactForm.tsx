"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitContactMessage } from "@/lib/api";
import { validateContactForm, ValidationErrors } from "@/lib/validators";
import { ContactFormValues } from "@/types";

const PROJECT_TYPES = [
  "Full-Stack Web App",
  "UI/UX & Design System",
  "API & Backend Engineering",
  "Landing Page & Performance",
  "General Consultation",
];

export function ContactForm() {
  const [form, setForm] = useState<ContactFormValues>({
    name: "",
    email: "",
    project_type: PROJECT_TYPES[0],
    message: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in the required fields correctly.");
      return;
    }

    setSubmitting(true);
    try {
      await submitContactMessage(form);
      setSubmitted(true);
      toast.success("Message delivered successfully! I will reply within 24 hours.");
      setForm({ name: "", email: "", project_type: PROJECT_TYPES[0], message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-accent/40 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto" />
        <h3 className="font-display font-bold text-2xl text-ink">Thank You for Reaching Out!</h3>
        <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
          Your project inquiry has been securely stored and sent to my inbox. I will review your requirements
          and reply within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface border border-border text-ink hover:border-accent hover:text-accent transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-2xl bg-surface border border-border space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-xs uppercase tracking-wider text-muted font-semibold">
          Your Name *
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            setErrors({ ...errors, name: undefined });
          }}
          placeholder="e.g. John Doe"
          className={`w-full px-4 py-3.5 rounded-xl bg-surface-card border text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors ${
            errors.name ? "border-red-500" : "border-border"
          }`}
        />
        {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs uppercase tracking-wider text-muted font-semibold">
          Your Email Address *
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            setErrors({ ...errors, email: undefined });
          }}
          placeholder="john@example.com"
          className={`w-full px-4 py-3.5 rounded-xl bg-surface-card border text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors ${
            errors.email ? "border-red-500" : "border-border"
          }`}
        />
        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
      </div>

      {/* Project Type */}
      <div className="space-y-2">
        <label htmlFor="project_type" className="text-xs uppercase tracking-wider text-muted font-semibold">
          Project Type
        </label>
        <select
          id="project_type"
          value={form.project_type}
          onChange={(e) => setForm({ ...form, project_type: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl bg-surface-card border border-border text-ink focus:outline-none focus:border-accent transition-colors"
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type} className="bg-surface text-ink">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs uppercase tracking-wider text-muted font-semibold">
          Project Details / Message *
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            setErrors({ ...errors, message: undefined });
          }}
          placeholder="Tell me about your project, timeline, deliverables, or goals..."
          className={`w-full px-4 py-3.5 rounded-xl bg-surface-card border text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors resize-none ${
            errors.message ? "border-red-500" : "border-border"
          }`}
        />
        {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-wider bg-accent text-background hover:bg-accent-dark transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-xs text-center text-muted">
        Your data is kept private. Guaranteed reply within 24 hours.
      </p>
    </form>
  );
}
