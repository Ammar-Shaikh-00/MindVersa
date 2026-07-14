import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/blog-posts";
import { BRAND_NAME, SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI & ML Insights",
  description:
    "Guides on hiring ML engineers, AI chatbots for SaaS, customer support automation, computer vision, and RAG systems from the MindVersa team.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `AI & ML Insights | ${BRAND_NAME}`,
    description:
      "Practical articles on custom machine learning, chatbots, automation, and production AI systems.",
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogIndex() {
  return (
    <section className="section" style={{ background: "var(--bg-primary)", paddingTop: 140 }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <div className="container-x">
        <span className="label-eyebrow">JOURNAL</span>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(44px, 5.2vw, 68px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            marginTop: 14,
          }}
        >
          AI &amp; ML Insights
        </h1>
        <p className="mt-4 max-w-[640px] text-[17px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
          High-intent guides for teams that want to hire ML engineers, ship SaaS chatbots, automate support, and deploy computer vision — written from production work at MindVersa.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.5px", lineHeight: 1.25 }}
              >
                {p.title}
              </h2>
              <p className="mt-3 flex-1 text-[15px]" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {p.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between text-[13px]" style={{ color: "var(--text-muted)" }}>
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
