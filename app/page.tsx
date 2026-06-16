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

export default function HomePage() {
  return (
    <>
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
