"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/section-reveal";

function PriceCard({
  title,
  price,
  points,
  featured = false,
}: {
  title: string;
  price: string;
  points: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-5 transition-[transform,box-shadow] duration-300 sm:p-6",
        featured &&
          "gradient-border relative z-[1] shadow-[0_0_0_1px_rgba(0,229,255,0.2)] ring-1 ring-[#00E5FF]/20 md:-translate-y-1",
      )}
    >
      {featured ? (
        <p className="mb-2 inline-block rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#00E5FF]">
          Most popular
        </p>
      ) : null}
      <p className="font-heading text-2xl font-extrabold">{title}</p>
      <p className="mt-3 font-heading text-3xl font-extrabold text-[#00E5FF] sm:text-4xl">{price}</p>
      <ul className="section-body mt-4 space-y-2 text-sm">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <Link href="#contact" className="btn-primary mt-6 w-full sm:w-auto">
        {featured ? "Start with Growth" : "Get Started"}
      </Link>
    </div>
  );
}

export function PricingSection({
  isQuarterly,
  onToggle,
}: {
  isQuarterly: boolean;
  onToggle: (value: boolean) => void;
}) {
  const multiplier = isQuarterly ? 0.9 : 1;
  const starter = Math.round(299 * multiplier);
  const growth = Math.round(699 * multiplier);

  return (
    <section id="pricing" className="section-block bg-[#05070F]">
      <div className="section-inner">
        <SectionReveal>
          <p className="section-label">TRANSPARENT PRICING</p>
          <h2 className="section-title">Simple Plans. Real ROI.</h2>
          <p className="section-body mt-4 max-w-2xl">
            Pick a tier that matches execution depth. Enterprise includes dedicated engineering and SLAs.
          </p>
        </SectionReveal>
        <SectionReveal className="mt-6" delay={0.04}>
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div
              className="inline-flex rounded-[10px] border border-white/10 p-1"
              role="group"
              aria-label="Billing period"
            >
              <button
                type="button"
                onClick={() => onToggle(false)}
                className={cn(
                  "rounded-[8px] px-4 py-2 text-xs font-medium transition-colors sm:px-5 sm:text-sm",
                  !isQuarterly ? "bg-white/[0.08] text-[#F0F4FF]" : "text-[#8892A4] hover:text-[#F0F4FF]",
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => onToggle(true)}
                className={cn(
                  "rounded-[8px] px-4 py-2 text-xs font-medium transition-colors sm:px-5 sm:text-sm",
                  isQuarterly ? "bg-white/[0.08] text-[#F0F4FF]" : "text-[#8892A4] hover:text-[#F0F4FF]",
                )}
              >
                Quarterly <span className="text-[#00E5FF]">−10%</span>
              </button>
            </div>
            <Link href="#contact" className="btn-ghost text-sm sm:text-base">
              Not sure? Get a custom quote →
            </Link>
          </div>
        </SectionReveal>
        <SectionReveal className="mt-10" delay={0.08}>
          <div className="grid gap-5 md:grid-cols-3">
            <PriceCard
              title="Starter"
              price={`$${starter}/mo`}
              points={[
                "1 AI Chatbot",
                "Basic lead capture automation",
                "Monthly performance report",
                "Email support (48hr)",
                "✗ Custom workflows",
                "✗ CRM integration",
              ]}
            />
            <PriceCard
              title="Growth"
              featured
              price={`$${growth}/mo`}
              points={[
                "3 AI agents",
                "Lead gen + nurture sequences",
                "3 custom workflows",
                "CRM integrations",
                "Weekly dashboard",
                "Priority support (4hr)",
                "30-day results guarantee",
              ]}
            />
            <PriceCard
              title="Enterprise"
              price="Custom"
              points={[
                "Unlimited automations",
                "Model fine-tuning",
                "Full-stack integrations",
                "Dedicated AI engineer",
                "99.9% uptime SLA",
                "24/7 support",
              ]}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
