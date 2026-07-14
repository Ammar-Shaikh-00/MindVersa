import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { MarqueeSection } from "@/components/sections/marquee";
import { ServicesSection } from "@/components/sections/services";
import { ProcessSection } from "@/components/sections/process";
import { ResultsSection } from "@/components/sections/results";
import { TechStackSection } from "@/components/sections/tech-stack";
import { PricingSection } from "@/components/sections/pricing";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq";
import { CtaBannerSection } from "@/components/sections/cta-banner";
import { ContactSection } from "@/components/sections/contact";
import { JsonLd } from "@/components/json-ld";
import { BRAND_NAME, SITE_URL } from "@/lib/site";
import { faqJsonLd, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: `${BRAND_NAME} — Hire AI/ML Engineers for Custom Models & Automation`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${BRAND_NAME} — AI/ML Engineering Agency`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <HeroSection />
      <div className="section-divider" />
      <MarqueeSection />
      <ServicesSection />
      <div className="section-divider" />
      <ProcessSection />
      <ResultsSection />
      <div className="section-divider" />
      <TechStackSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBannerSection />
      <ContactSection />
    </>
  );
}
