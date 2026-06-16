"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type Mode = "project" | "monthly";

type Plan = {
  name: string;
  blurb: string;
  prices: Record<Mode, string>;
  units: Record<Mode, string>;
  features: { label: string; included: boolean }[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    blurb: "Small automations, single ML models, and quick data analyses.",
    prices: { project: "$499", monthly: "$499" },
    units: { project: "per project", monthly: "per project" },
    features: [
      { label: "1 ML model or automation pipeline", included: true },
      { label: "Data cleaning and preprocessing", included: true },
      { label: "Model training and validation report", included: true },
      { label: "API endpoint (FastAPI)", included: true },
      { label: "2 weeks of post-launch support", included: true },
      { label: "Dashboard or frontend", included: false },
      { label: "Ongoing monitoring", included: false },
    ],
    cta: "Start a Project",
  },
  {
    name: "Growth",
    blurb: "For teams that need continuous AI development and delivery.",
    prices: { project: "$4,999", monthly: "$1,499" },
    units: { project: "per project", monthly: "per month" },
    featured: true,
    features: [
      { label: "Up to 3 concurrent projects per month", included: true },
      { label: "ML models and data pipelines", included: true },
      { label: "Real-time dashboard (React + Supabase)", included: true },
      { label: "API and frontend development", included: true },
      { label: "Weekly progress reports", included: true },
      { label: "Priority Slack support (4hr response)", included: true },
      { label: "Monthly model performance review", included: true },
      { label: "30-day results guarantee", included: true },
    ],
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    blurb: "Large-scale AI transformation with a dedicated engineering team.",
    prices: { project: "Custom", monthly: "Custom" },
    units: { project: "", monthly: "" },
    features: [
      { label: "Unlimited projects", included: true },
      { label: "Dedicated AI engineer (40 hrs/week)", included: true },
      { label: "Custom model fine-tuning and MLOps", included: true },
      { label: "Full-stack AI system integration", included: true },
      { label: "Data warehouse architecture", included: true },
      { label: "SLA: 99.9% uptime guarantee", included: true },
      { label: "24/7 support and emergency hotline", included: true },
      { label: "Quarterly AI strategy review", included: true },
    ],
    cta: "Book a Call",
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <path
        d="M3.5 8.2 6.4 11.1 12.5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PricingToggle({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  return (
    <div className="mt-10 flex justify-center">
      <div
        role="tablist"
        aria-label="Pricing type"
        className="inline-flex rounded-full border border-white/[0.08] bg-[var(--bg-elevated)] p-1"
      >
        {(
          [
            { id: "project" as const, label: "Project-Based" },
            { id: "monthly" as const, label: "Monthly Retainer" },
          ] as const
        ).map((option) => {
          const active = mode === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(option.id)}
              className="relative rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200"
              style={{ color: active ? "var(--accent-cyan)" : "var(--text-secondary)" }}
            >
              {active && (
                <motion.span
                  layoutId="pricing-toggle-pill"
                  className="absolute inset-0 rounded-full border border-[rgba(0,229,255,0.28)] bg-[rgba(0,229,255,0.08)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PricingCard({ plan, mode, index }: { plan: Plan; mode: Mode; index: number }) {
  const content = (
    <>
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] px-4 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-[#05070F]">
          Most Popular
        </span>
      )}

      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
          {plan.name}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{plan.blurb}</p>
      </div>

      <div className="mb-6 border-b border-white/[0.06] pb-6">
        <div className="flex items-end gap-2">
          <span
            className="font-display text-[clamp(36px,4vw,44px)] font-bold leading-none tracking-[-1px] text-[var(--text-primary)]"
            style={{ fontStyle: "normal" }}
          >
            {plan.prices[mode]}
          </span>
          {plan.units[mode] && (
            <span className="pb-1 text-sm text-[var(--text-secondary)]">/ {plan.units[mode]}</span>
          )}
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-3 text-sm leading-snug">
            <span
              className={feature.included ? "text-[var(--accent-cyan)]" : "text-[var(--text-muted)]"}
            >
              {feature.included ? <CheckIcon /> : <CrossIcon />}
            </span>
            <span
              className={
                feature.included ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
              }
            >
              {feature.label}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="#contact"
        className={`mt-8 block w-full text-center ${
          plan.featured ? "btn-primary" : "btn-ghost"
        }`}
        style={{ padding: "13px 24px" }}
      >
        {plan.cta}
      </Link>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative flex h-full flex-col"
    >
      {plan.featured ? (
        <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-[#00E5FF] via-[#5B7CFF] to-[#7B61FF] p-px shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="relative flex h-full flex-col rounded-[15px] bg-gradient-to-b from-[#0d1527] to-[#0a0d1a] px-7 py-8 md:px-8 md:py-9">
            {content}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[var(--bg-elevated)] px-7 py-8 transition-all duration-200 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_20px_48px_rgba(0,0,0,0.35)] md:px-8 md:py-9">
          {content}
        </div>
      )}
    </motion.article>
  );
}

export function PricingSection() {
  const [mode, setMode] = useState<Mode>("monthly");

  return (
    <section id="pricing" className="section bg-[var(--bg-primary)]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-header section-header--center"
        >
          <span className="label-eyebrow">PRICING</span>
          <h2 className="h2-section">Transparent Pricing. Real ROI.</h2>
          <p className="section-subtitle">
            No retainers disguising inactivity. Pay per project or monthly.
          </p>
        </motion.div>

        <PricingToggle mode={mode} onChange={setMode} />

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {PLANS.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} mode={mode} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
