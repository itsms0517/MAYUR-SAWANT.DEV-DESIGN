import Image from "next/image";
import { Quote } from "lucide-react";
import { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-t border-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-3 mb-10 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">Testimonials</p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
            Trusted by founders & design leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between space-y-6 hover:border-accent/40 transition-colors"
            >
              <Quote className="w-8 h-8 text-accent/30" />
              <p className="text-ink/90 text-base sm:text-lg leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {t.avatar && (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-surface-card">
                    <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <h4 className="font-display font-bold text-sm text-ink">{t.author}</h4>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
