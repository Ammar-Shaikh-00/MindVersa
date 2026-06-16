"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    desc: "Free 30-min call. We map your data, goals, and technical constraints.",
  },
  {
    n: "02",
    title: "Blueprint",
    desc: "Architecture plan with tools, models, timeline, and fixed scope.",
  },
  {
    n: "03",
    title: "Build & Test",
    desc: "Engineering, training, and validation until quality gates pass.",
  },
  {
    n: "04",
    title: "Deploy & Monitor",
    desc: "Production rollout with monitoring, docs, and team handoff.",
  },
] as const;

export function ProcessSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.2 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process" className="section process-section">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-header section-header--center"
        >
          <span className="label-eyebrow">How We Work</span>
          <h2 className="h2-section">From Discovery to Deployed in 5 Days</h2>
          <p className="section-subtitle">
            A lean engineering workflow from technical discovery to production deployment.
          </p>
        </motion.div>

        <div
          ref={ref}
          className={`process-flow${inView ? " process-flow--active" : ""}`}
          style={{ ["--progress" as string]: inView ? "100%" : "0%" } as CSSProperties}
        >
          <div className="process-track" aria-hidden />

          {STEPS.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="process-card"
            >
              <div className="process-index">
                <span>{s.n}</span>
              </div>
              <h3 className="process-card-title">{s.title}</h3>
              <p className="process-card-desc">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
