import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionReveal } from "@/components/section-reveal";

export function ContactSection() {
  return (
    <section id="contact" className="section-block bg-[#05070F]">
      <div className="section-inner grid gap-8 md:grid-cols-2">
        <SectionReveal>
          <h2 className="section-title">Let&apos;s Talk</h2>
          <p className="mt-4 inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-400">
            We respond within 2 hours on business days
          </p>
          <p className="section-body mt-5">Available across US, UK, EU, AUS, ME timezones</p>
          <p className="section-body mt-2">hello@nexorai.io</p>
          <Link className="mt-4 inline-block text-[#00E5FF] transition-colors hover:text-[#7B61FF]" href="https://calendly.com">
            Or book directly on Calendly →
          </Link>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#8892A4]">
            <Link className="transition-colors hover:text-[#00E5FF]" href="https://linkedin.com">
              LinkedIn
            </Link>
            <Link className="transition-colors hover:text-[#00E5FF]" href="https://twitter.com">
              Twitter/X
            </Link>
            <Link className="transition-colors hover:text-[#00E5FF]" href="https://github.com">
              GitHub
            </Link>
          </div>
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <ContactForm />
        </SectionReveal>
      </div>
    </section>
  );
}
