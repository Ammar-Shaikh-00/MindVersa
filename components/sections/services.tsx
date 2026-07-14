"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

function TagPill({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span
      className="inline-block rounded-full"
      style={{
        padding: "4px 10px",
        background: `${color}14`,
        border: `1px solid ${color}33`,
        color,
        fontFamily: "var(--font-body), sans-serif",
        fontWeight: 600,
        fontSize: 10,
        letterSpacing: 2,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function Roi({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span
      className="inline-block rounded-full"
      style={{
        padding: "5px 12px",
        background: `${color}14`,
        border: `1px solid ${color}33`,
        color,
        fontFamily: "var(--font-body), sans-serif",
        fontWeight: 500,
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}

function ServiceCardContent({
  tag,
  tagColor,
  title,
  description,
  roiColor,
  roiText,
}: {
  tag: ReactNode;
  tagColor: string;
  title: ReactNode;
  description: string;
  roiColor: string;
  roiText: string;
}) {
  return (
    <div className="svc-card-inner">
      <TagPill color={tagColor}>{tag}</TagPill>
      <div className="svc-card-body">
        <h3 className="svc-title">{title}</h3>
        <p className="svc-desc">{description}</p>
        <div className="svc-roi-wrap">
          <Roi color={roiColor}>{roiText}</Roi>
        </div>
      </div>
    </div>
  );
}

function Card({
  className,
  children,
  delay,
  accent,
}: {
  className: string;
  children: ReactNode;
  delay: number;
  accent: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay }}
      className={`svc-card ${className}`}
      style={{ "--svc-accent": accent } as CSSProperties}
    >
      {children}
    </motion.article>
  );
}

const SERVICES = [
  {
    id: "svc-a",
    delay: 0,
    accent: "#00E5FF",
    tag: "Core Service",
    tagColor: "#00E5FF",
    title: "ML Model Development",
    description:
      "Custom training, fine-tuning, and deployment of classification, regression, and deep learning models.",
    roiColor: "#10B981",
    roiText: "99%+ accuracy on production models",
  },
  {
    id: "svc-b",
    delay: 0.05,
    accent: "#7B61FF",
    tag: "New ★",
    tagColor: "#7B61FF",
    title: "RAG-Based AI Systems",
    description:
      "Knowledge-grounded AI with vector search, document Q&A, and enterprise search on your private data.",
    roiColor: "#7B61FF",
    roiText: "Zero hallucinations on domain knowledge",
  },
  {
    id: "svc-c",
    delay: 0.1,
    accent: "#FF6B35",
    tag: "New ★",
    tagColor: "#FF6B35",
    title: "AI Agents & Agentic Workflows",
    description:
      "Autonomous agents built with LangGraph and CrewAI that plan, reason, and execute multi-step tasks.",
    roiColor: "#FF6B35",
    roiText: "Full task automation end-to-end",
  },
  {
    id: "svc-d",
    delay: 0.15,
    accent: "#7B61FF",
    tag: "NLP / LLM",
    tagColor: "#7B61FF",
    title: "NLP & LLM Integration",
    description:
      "RAG systems, fine-tuned LLMs, semantic search, and custom AI assistants on your data.",
    roiColor: "#7B61FF",
    roiText: "Custom models on your own data",
  },
  {
    id: "svc-e",
    delay: 0.2,
    accent: "#FF6B35",
    tag: "Vision",
    tagColor: "#FF6B35",
    title: "Computer Vision",
    description:
      "Object detection, image classification, OCR, and real-time video inference pipelines.",
    roiColor: "#FF6B35",
    roiText: "Real-time inference at scale",
  },
  {
    id: "svc-f",
    delay: 0.25,
    accent: "#10B981",
    tag: "Data Layer",
    tagColor: "#10B981",
    title: "Data Engineering & ETL",
    description:
      "Robust data pipelines, dataset transformation, and scalable warehouse architecture.",
    roiColor: "#10B981",
    roiText: "10M+ data points processed daily",
  },
  {
    id: "svc-g",
    delay: 0.3,
    accent: "#00E5FF",
    tag: "New ★",
    tagColor: "#00E5FF",
    title: "Predictive Analytics",
    description:
      "Forecasting, demand prediction, churn modeling, and risk scoring deployed to production APIs.",
    roiColor: "#00E5FF",
    roiText: "89% forecasting accuracy achieved",
  },
  {
    id: "svc-h",
    delay: 0.35,
    accent: "#10B981",
    tag: "New ★",
    tagColor: "#10B981",
    title: "MLOps & Production Deployment",
    description:
      "CI/CD for ML models, containerized serving, monitoring, drift detection, and auto-retraining.",
    roiColor: "#10B981",
    roiText: "Zero-downtime model updates",
  },
  {
    id: "svc-i",
    delay: 0.4,
    accent: "#00E5FF",
    tag: "Automation",
    tagColor: "#00E5FF",
    title: "AI Workflow Automation",
    description:
      "n8n, Make.com, and custom API orchestration for intelligent business process automation.",
    roiColor: "#00E5FF",
    roiText: "80% reduction in manual tasks",
  },
  {
    id: "svc-j",
    delay: 0.45,
    accent: "#10B981",
    tag: "Full Stack",
    tagColor: "#10B981",
    title: "Full-Stack AI Software",
    description:
      "Production AI software with FastAPI backends, React frontends, dashboards, and REST APIs.",
    roiColor: "#10B981",
    roiText: "Production systems shipped fast",
  },
] as const;

export function ServicesSection() {
  return (
    <section id="services" className="section relative" style={{ background: "var(--bg-primary)" }}>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-header section-header--center"
        >
          <span className="label-eyebrow">WHAT WE BUILD</span>
          <h2 className="h2-section">End-to-End AI &amp; Data Engineering</h2>
          <p className="section-subtitle">
            From raw data to production-ready AI systems — every layer handled in-house.
          </p>
        </motion.div>

        <div className="services-grid mt-16">
          {SERVICES.map((service) => (
            <Card
              key={service.id}
              className={service.id}
              delay={service.delay}
              accent={service.accent}
            >
              <ServiceCardContent
                tag={service.tag}
                tagColor={service.tagColor}
                title={service.title}
                description={service.description}
                roiColor={service.roiColor}
                roiText={service.roiText}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
