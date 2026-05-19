"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { caseStudies, resultsMetrics } from "@/lib/home-data";
import { EASE_OUT } from "@/lib/motion-presets";
import { SectionReveal } from "@/components/section-reveal";

function MetricRow({ label, value, isLast }: { label: string; value: number; isLast?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={isLast ? "" : "mb-6"}>
      <div className="mb-2.5 flex items-baseline justify-between gap-4">
        <span className="font-sans text-sm font-medium text-[#F0F4FF]">{label}</span>
        <span className="font-sans text-sm font-semibold tabular-nums text-[#00E5FF]">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE_OUT }}
          className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]"
        />
      </div>
    </div>
  );
}

export function ResultsSection() {
  return (
    <section id="results" className="section-block bg-[#05070F]">
      <div className="section-inner">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionReveal>
            <p className="section-label">REAL RESULTS</p>
            <h2 className="section-title max-w-lg">Proof Before We Pitch Services</h2>
            <p className="section-body mt-4 max-w-md">
              Outcomes from recent builds — every engagement starts with ROI mapping so you know what success looks
              like.
            </p>

            <ul className="mt-8 flex list-none flex-col gap-4 p-0">
              {caseStudies.map((study) => (
                <li key={study.industry}>
                  <article className="results-case-card group">
                    <div className="flex items-start justify-between gap-4">
                      <span className="results-case-tag">{study.industry}</span>
                      <span className="results-case-metric">{study.metric}</span>
                    </div>
                    <p className="results-case-detail">{study.detail}</p>
                  </article>
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.08} className="lg:sticky lg:top-24">
            <div className="results-metrics-panel">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#00E5FF]">
                Average client impact
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#8892A4]">
                Benchmarks across recent deployments — your targets are set during the free audit.
              </p>
              <div className="mt-8">
                {resultsMetrics.map(([label, value], index) => (
                  <MetricRow
                    key={label}
                    label={label}
                    value={value}
                    isLast={index === resultsMetrics.length - 1}
                  />
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
