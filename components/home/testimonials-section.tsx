"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/lib/home-data";
import { SectionReveal } from "@/components/section-reveal";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({
  quote,
  name,
  role,
  company,
  region,
}: (typeof testimonials)[number]) {
  return (
    <article className="testimonial-card group h-full">
      <div className="testimonial-stars" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-[#00E5FF] text-[#00E5FF]" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="testimonial-quote">&ldquo;{quote}&rdquo;</blockquote>
      <footer className="testimonial-author">
        <div className="testimonial-avatar" aria-hidden>
          {initials(name)}
        </div>
        <div className="min-w-0">
          <p className="testimonial-name">{name}</p>
          <p className="testimonial-meta">
            {role}, {company} · {region}
          </p>
        </div>
      </footer>
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-block bg-[#0B0E1A]">
      <div className="section-inner">
        <SectionReveal>
          <p className="section-label text-center">CLIENT STORIES</p>
          <h2 className="section-title mx-auto max-w-2xl text-center">
            Trusted by Operators Who Measure ROI
          </h2>
          <p className="section-body mx-auto mt-4 max-w-xl text-center">
            Leaders across e-commerce, SaaS, and services share what changed after NexorAI went live.
          </p>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={0.06}>
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} {...item} />
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-10 text-center" delay={0.1}>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#8892A4]">
            50+ automations delivered · 4.9/5 average client rating
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
