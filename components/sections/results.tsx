"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const CASES = [
  {
    accent: "#00E5FF",
    industry: "Manufacturing · UK",
    headline: "Defect detection cut QA costs by 67%",
    tech: "Computer Vision · YOLOv8 · FastAPI",
    before: "Manual inspection: 4 hours/shift",
    after: "AI inspection: 12 minutes/shift",
    company: "IndustrialEdge Ltd",
    contact: "Mark Davies, CTO",
  },
  {
    accent: "#7B61FF",
    industry: "FinTech · USA",
    headline: "Fraud detection model saves $2.3M/yr",
    tech: "XGBoost · Real-time API · Supabase",
    before: "Fraud loss rate: 2.8%",
    after: "After ML model: 0.3%",
    company: "PaySafe Corp",
    contact: "Jessica Liu, Head of Risk",
  },
  {
    accent: "#10B981",
    industry: "Retail · UAE",
    headline: "Demand forecasting improved by 89%",
    tech: "Time Series · Prophet · Tableau",
    before: "Overstock cost: $180k/quarter",
    after: "After AI: $19k/quarter",
    company: "RetailFirst Group",
    contact: "Khalid Al-Mansoori, COO",
  },
] as const;

const METRICS = [
  { label: "Model Accuracy Achieved", pct: 94 },
  { label: "Processing Speed Gain", pct: 87 },
  { label: "Manual Work Eliminated", pct: 82 },
  { label: "Client Satisfaction", pct: 96 },
  { label: "On-Time Delivery", pct: 91 },
] as const;

const STATS = [
  { value: "8", label: "Industries Served" },
  { value: "50+", label: "Projects Delivered" },
  { value: "4", label: "Countries" },
] as const;

function CaseCard({
  accent,
  industry,
  headline,
  tech,
  before,
  after,
  company,
  contact,
  delay,
}: (typeof CASES)[number] & { delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay }}
      className="result-case"
      style={{ "--result-accent": accent } as CSSProperties}
    >
      <span className="result-case-industry">{industry}</span>
      <h3 className="result-case-headline">{headline}</h3>
      <p className="result-case-tech">{tech}</p>

      <div className="result-case-compare">
        <div className="result-case-row result-case-row--before">
          <span className="result-case-row-tag">Before</span>
          <span className="result-case-row-value">{before}</span>
        </div>
        <div className="result-case-row result-case-row--after">
          <span className="result-case-row-tag">After</span>
          <span className="result-case-row-value">{after}</span>
        </div>
      </div>

      <footer className="result-case-footer">
        <span className="result-case-company">{company}</span>
        <span className="result-case-contact">{contact}</span>
      </footer>
    </motion.article>
  );
}

function MetricBar({
  label,
  pct,
  delay,
}: (typeof METRICS)[number] & { delay: number }) {
  return (
    <div className="result-metric">
      <div className="result-metric-header">
        <span className="result-metric-label">{label}</span>
        <span className="result-metric-value">{pct}%</span>
      </div>
      <div className="result-metric-track" aria-hidden>
        <motion.div
          className="result-metric-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function ResultsSection() {
  return (
    <section id="results" className="section results-section">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-header section-header--left"
        >
          <span className="label-eyebrow">REAL RESULTS</span>
          <h2 className="h2-section">Data That Proves Our Work</h2>
          <p className="section-subtitle">
            Measured outcomes from production AI systems across multiple industries.
          </p>
        </motion.div>

        <div className="results-layout">
          <div className="results-cases">
            {CASES.map((item, i) => (
              <CaseCard key={item.headline} {...item} delay={i * 0.1} />
            ))}
          </div>

          <aside className="results-metrics-panel">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="results-metrics-inner"
            >
              <h3 className="results-metrics-title">Average Across All Projects</h3>

              <div className="results-metrics-list">
                {METRICS.map((metric, i) => (
                  <MetricBar key={metric.label} {...metric} delay={0.2 + i * 0.1} />
                ))}
              </div>

              <div className="results-stats">
                {STATS.map((stat) => (
                  <div key={stat.label} className="results-stat">
                    <span className="results-stat-value">{stat.value}</span>
                    <span className="results-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}
