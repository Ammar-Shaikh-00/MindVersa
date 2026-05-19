"use client";

import { useState } from "react";
import { CtaSection } from "@/components/home/cta-section";
import { ContactSection } from "@/components/home/contact-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { MarqueeSection } from "@/components/home/marquee-section";
import { PricingSection } from "@/components/home/pricing-section";
import { ProcessSection } from "@/components/home/process-section";
import { ResultsSection } from "@/components/home/results-section";
import { ServicesSection } from "@/components/home/services-section";
import { StickyAuditBar } from "@/components/home/sticky-audit-bar";
import { TechStripSection } from "@/components/home/tech-strip-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";

/**
 * Homepage: proof-first flow (results before services), section reveals, persistent audit CTA.
 */
export function HomePage() {
  const [isQuarterly, setIsQuarterly] = useState(false);

  return (
    <div className="page-with-sticky-cta relative z-10 overflow-x-clip">
      <HeroSection />
      <MarqueeSection />
      <ResultsSection />
      <ServicesSection />
      <ProcessSection />
      <TechStripSection />
      <PricingSection isQuarterly={isQuarterly} onToggle={setIsQuarterly} />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
      <StickyAuditBar />
    </div>
  );
}
