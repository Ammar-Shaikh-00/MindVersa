"use client";

import { motion } from "framer-motion";

const TECH_ROWS = [
  {
    category: "AI / ML",
    direction: "left" as const,
    duration: 38,
    items: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "XGBoost",
      "HuggingFace",
      "LangChain",
      "OpenAI",
      "Anthropic Claude",
      "LlamaIndex",
      "Keras",
    ],
  },
  {
    category: "Data & Backend",
    direction: "right" as const,
    duration: 44,
    items: [
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "Redis",
      "Apache Spark",
      "Airflow",
      "Docker",
      "Kubernetes",
      "AWS",
      "Google Cloud",
      "Vercel",
    ],
  },
  {
    category: "Frontend & Tools",
    direction: "left" as const,
    duration: 36,
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "n8n",
      "Make.com",
      "Grafana",
      "Metabase",
      "Tableau",
      "Git",
    ],
  },
];

function TechChip({ name }: { name: string }) {
  return (
    <span className="tech-marquee-chip inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.08] bg-[var(--bg-elevated)] px-5 py-3 font-sans text-sm font-medium text-[var(--text-secondary)]">
      {name}
    </span>
  );
}

function TechMarqueeTrack({
  items,
  direction,
  duration,
}: {
  items: readonly string[];
  direction: "left" | "right";
  duration: number;
}) {
  const marqueeClass = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="tech-marquee-viewport relative w-full overflow-hidden">
      <div
        className={`marquee ${marqueeClass} flex w-max`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center gap-3 pr-3">
          {items.map((item) => (
            <TechChip key={item} name={item} />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden>
          {items.map((item) => (
            <TechChip key={`${item}-copy`} name={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TechStackSection() {
  return (
    <section id="tech-stack" className="section tech-stack-section overflow-hidden">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-header section-header--center"
        >
          <span className="label-eyebrow">OUR TECH STACK</span>
          <h2 className="h2-section">Production-Proven Tools</h2>
          <p className="section-subtitle">
            Battle-tested technologies we ship in production — not slide decks.
          </p>
        </motion.div>
      </div>

      <div className="tech-marquee-shell mt-12 md:mt-14">
        {TECH_ROWS.map((row) => (
          <div key={row.category} className="tech-marquee-row">
            <div className="container-x mb-3">
              <span className="tech-marquee-category">{row.category}</span>
            </div>
            <TechMarqueeTrack
              items={row.items}
              direction={row.direction}
              duration={row.duration}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
