"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QA = [
  {
    q: "What types of AI/ML projects do you take on?",
    a: "We handle the full spectrum: predictive models, NLP systems, computer vision, recommendation engines, data pipelines, MLOps setup, and full-stack AI applications.",
  },
  {
    q: "Do you work with our existing data?",
    a: "Yes. We start with whatever you have — spreadsheets, databases, APIs, unstructured documents. Data cleaning and preprocessing is part of every project.",
  },
  {
    q: "How accurate are the models you build?",
    a: "It depends on data quality and the problem type, but our average model accuracy across production deployments is 94%+. We always show you validation metrics before launch.",
  },
  {
    q: "What if we don't have enough data?",
    a: "We'll tell you honestly. If data is insufficient, we'll recommend data collection strategies, synthetic data augmentation, or transfer learning approaches.",
  },
  {
    q: "Do you handle model deployment and hosting?",
    a: "Yes — from FastAPI containerized APIs on AWS/GCP to real-time inference endpoints. We handle DevOps so you don't have to.",
  },
  {
    q: "What industries do you serve?",
    a: "Manufacturing, fintech, retail, healthcare, logistics, SaaS, real estate, and marketing. If you have data and a business problem, we have a solution.",
  },
  {
    q: "How do you ensure data privacy?",
    a: "We sign NDAs before any data sharing. All data is processed in encrypted environments. We never use client data to train models for other clients.",
  },
  {
    q: "How do I start?",
    a: "Book a free 30-minute technical discovery call. No sales pitch — just a conversation about your data, your problem, and what's possible.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container-x" style={{ maxWidth: 800 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-header section-header--center"
        >
          <span className="label-eyebrow">FAQ</span>
          <h2 className="h2-section">Common Questions</h2>
          <p className="section-subtitle">
            Practical answers about delivery, data quality, security, and model performance.
          </p>
        </motion.div>

        <div className="mt-12 space-y-2">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl transition-colors duration-200"
                style={{
                  border: `1px solid ${isOpen ? "rgba(0,229,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                  background: isOpen ? "var(--bg-elevated)" : "transparent",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  data-hover
                  className="flex w-full items-center justify-between gap-4 text-left transition-colors"
                  style={{
                    padding: "20px 24px",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 600,
                    fontSize: 17,
                    color: isOpen ? "var(--accent-cyan)" : "var(--text-primary)",
                  }}
                >
                  <span>{item.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 220ms ease",
                      flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div
                        className="px-6 pb-6 text-[15px]"
                        style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
