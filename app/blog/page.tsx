import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "AI & Data Insights",
  description: "Field notes on ML, data engineering, computer vision and AI product work from the NexorAI team.",
};

export default function BlogIndex() {
  return (
    <section className="section" style={{ background: "var(--bg-primary)", paddingTop: 140 }}>
      <div className="container-x">
        <span className="label-eyebrow">JOURNAL</span>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            marginTop: 14,
          }}
        >
          AI &amp; Data Insights
        </h1>
        <p className="mt-4 max-w-[560px] text-[16px]" style={{ color: "var(--text-secondary)" }}>
          Field notes on ML, data engineering, computer vision and AI product work.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="self-start rounded-full px-3 py-1 text-[10px] uppercase"
                style={{
                  background: "rgba(0,229,255,0.08)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  color: "var(--accent-cyan)",
                  fontWeight: 600,
                  letterSpacing: 2,
                }}
              >
                {p.tag}
              </span>
              <h2
                className="mt-5 font-display group-hover:text-accent-cyan"
                style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.5px", lineHeight: 1.25 }}
              >
                {p.title}
              </h2>
              <p className="mt-3 flex-1 text-[14px]" style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {p.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between text-[12px]" style={{ color: "var(--text-muted)" }}>
                <span>{p.date}</span>
                <span>{p.read}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
