import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, resultsKpis } from "@/lib/home-data";
import { SectionReveal } from "@/components/section-reveal";

export function ResultsSection() {
  return (
    <section id="results" className="section-block bg-[#05070F]">
      <div className="section-inner">
        <SectionReveal>
          <p className="section-label text-center">REAL RESULTS</p>
          <h2 className="section-title mx-auto max-w-2xl text-center">
            Outcomes You Can Measure — Not Just Promise
          </h2>
          <p className="section-body mx-auto mt-4 max-w-xl text-center">
            Recent client deployments across e-commerce, SaaS, and services — scoped with clear KPIs before
            build starts.
          </p>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={0.05}>
          <ul className="results-impact-grid list-none p-0">
            {caseStudies.map((study) => (
              <li key={study.industry}>
                <article className="results-impact-card group h-full">
                  <span className="results-impact-industry">{study.industry}</span>
                  <p className="results-impact-metric">{study.metric}</p>
                  <p className="results-impact-outcome">{study.outcome}</p>
                  <p className="results-impact-detail">{study.detail}</p>
                </article>
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal className="mt-6 lg:mt-8" delay={0.08}>
          <div className="results-kpi-strip">
            <ul className="results-kpi-grid list-none p-0">
              {resultsKpis.map((kpi) => (
                <li key={kpi.label}>
                  <div className="results-kpi-item">
                    <p className="results-kpi-value">{kpi.value}</p>
                    <p className="results-kpi-label">{kpi.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-10 text-center" delay={0.1}>
          <Link
            href="/#services"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#00E5FF] transition-colors hover:text-[#7B61FF]"
          >
            See how we deliver these results
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
