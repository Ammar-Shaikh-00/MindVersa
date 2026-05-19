import Link from "next/link";
import { AuditForm } from "@/components/forms/audit-form";
import { SectionReveal } from "@/components/section-reveal";

export function CtaSection() {
  return (
    <section className="section-block relative overflow-hidden bg-[#0B0E1A]">
      <div className="mesh-bg" />
      <div className="section-inner">
        <SectionReveal>
          <div className="glass mx-auto max-w-5xl rounded-3xl px-4 py-10 text-center sm:px-6 sm:py-14">
            <h2 className="section-title">Ready to Automate Your Business?</h2>
            <p className="section-body mt-3 max-w-2xl mx-auto">
              Tell us what slows your team down — we reply with a concrete automation plan, not a generic deck.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="#contact" className="btn-primary w-full sm:w-auto">
                Message the team
              </Link>
              <p className="text-xs text-[#8892A4] sm:text-sm">Free audit · No obligation · 30 minutes</p>
            </div>
            <div className="mt-10 border-t border-white/10 pt-8">
              <AuditForm />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
