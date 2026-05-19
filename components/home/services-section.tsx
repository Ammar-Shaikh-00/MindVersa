import type { LucideIcon } from "lucide-react";
import { BarChart3, Bot, Code2, PenLine, Users, Zap } from "lucide-react";
import { serviceCards, type ServiceIconKey } from "@/lib/home-data";
import { SectionReveal } from "@/components/section-reveal";

const iconMap: Record<ServiceIconKey, LucideIcon> = {
  bot: Bot,
  zap: Zap,
  users: Users,
  pen: PenLine,
  chart: BarChart3,
  code: Code2,
};

export function ServicesSection() {
  return (
    <section id="services" className="section-block bg-[#0B0E1A]">
      <div className="section-inner">
        <SectionReveal>
          <p className="section-label">WHAT WE BUILD</p>
          <h2 className="section-title max-w-3xl">AI Solutions That Replace Repetitive Work</h2>
          <p className="section-body mt-4 max-w-2xl">
            Six core capabilities — each scoped for speed, integration, and measurable business impact.
          </p>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={0.06}>
          <ul className="services-grid list-none p-0">
            {serviceCards.map((card) => {
              const Icon = iconMap[card.icon];

              return (
                <li key={card.title}>
                  <article className="service-card group h-full">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#00E5FF] transition-colors duration-200 group-hover:border-[#00E5FF]/30 group-hover:bg-[#00E5FF]/[0.06]"
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <span className="service-card-metric">{card.roi}</span>
                    </div>

                    <h3 className="service-card-title">{card.title}</h3>
                    <p className="service-card-desc">{card.desc}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
