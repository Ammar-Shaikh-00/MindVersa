import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/blog-posts";
import { ReadingProgress } from "./reading-progress";

type Params = { slug: string };

const FULL_POST_BY_SLUG: Record<string, { title: string; tag: string; date: string; read: string; body: string }> = {
  "fraud-detection-99-accuracy": {
    title: "How We Built a Fraud Detection Model with 99.1% Accuracy",
    tag: "ML Engineering",
    date: "Jun 12, 2026",
    read: "9 min read",
    body: `When a US fintech reached out, their fraud loss rate sat at 2.8% of monthly transaction volume — roughly $190,000 a month leaking out the back door. The brief was simple to write and hard to deliver: build a real-time fraud detection model that drops that loss rate below 0.5%, integrates with their existing payments stack, and never blocks more than 1% of legitimate transactions.

This post walks through how we did it.

## The Data Problem
We started with 14 months of transaction logs — about 38 million rows. Roughly 0.6% of those were labeled fraud, which makes the problem severely imbalanced. Before touching a model we spent two weeks on the unsexy part: cleaning, joining card-on-file metadata, deriving velocity features (transactions per card per minute, per merchant per hour), and building a leak-proof temporal split.

If you only remember one thing from this article: **the model is downstream of the data**. We have never had a project where fixing the data wasn't the biggest unlock.

## Feature Engineering
Tabular fraud is still XGBoost territory. We engineered ~80 features across three buckets — behavioural (deviation from a card's normal spend profile), graph-derived (shared device/IP signals), and merchant-side (risk score by MCC × geo × time-of-day). We dropped a third of those features after permutation importance on a held-out set.

## Model & Validation
A single XGBoost classifier with focal loss handled the imbalance well enough that we didn't need SMOTE. Calibration with isotonic regression got the predicted probabilities honest. The validation gate was a precision/recall curve evaluated on a four-week rolling window — not on a fixed test set.

Production accuracy held at 99.1% with a recall of 92% on the fraud class. False positive rate stayed below 0.8%.

## Deployment
A FastAPI service in a Docker container behind their existing API gateway. Sub-50ms p99 latency at 400 requests/second. We also shipped a small React dashboard for the risk team to inspect flagged transactions and feed reviewed labels back into the next retraining cycle.

## What Would We Do Differently
Honestly, less feature engineering by hand. Twelve months later we've moved similar projects toward a gradient-boosting + small tabular transformer ensemble that handles a chunk of the feature interactions automatically.

If you have a fraud problem and a year of labeled data, talk to us.`,
  },
  "computer-vision-manufacturing": {
    title: "Computer Vision in Manufacturing: A Real Case Study",
    tag: "Computer Vision",
    date: "May 24, 2026",
    read: "7 min read",
    body: `Manufacturing QA used to mean a person standing on a line for eight hours looking for surface defects. It's hard work, it's inconsistent across operators, and at speed it misses things. Here's how we replaced that process for a UK industrial customer using YOLOv8 and a small inference box that lives next to the conveyor.

## The Setup
…full case study coming soon.`,
  },
  "rag-vs-fine-tuning": {
    title: "RAG vs Fine-Tuning: Which Should You Choose in 2026?",
    tag: "NLP / LLM",
    date: "May 03, 2026",
    read: "11 min read",
    body: `RAG and fine-tuning are not competitors. They solve different problems and the cleanest LLM products usually do both. This post breaks down the decision tree we use in our first technical call with a client.

…full guide coming soon.`,
  },
};

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = FULL_POST_BY_SLUG[slug];
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.body.slice(0, 160),
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = FULL_POST_BY_SLUG[slug];
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <ReadingProgress />
      <article className="section" style={{ background: "var(--bg-primary)", paddingTop: 140 }}>
        <div className="container-x" style={{ maxWidth: 760 }}>
          <Link href="/blog" className="text-[13px] text-accent-cyan hover:opacity-80">
            ← Back to journal
          </Link>
          <span
            className="mt-6 inline-block rounded-full px-3 py-1 text-[10px] uppercase"
            style={{
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
              color: "var(--accent-cyan)",
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            {post.tag}
          </span>
          <h1
            className="mt-4 font-display"
            style={{
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.read}</span>
          </div>

          <div
            className="mt-10 space-y-5 text-[17px]"
            style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
          >
            {post.body.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="font-display"
                    style={{
                      fontWeight: 700,
                      fontSize: 26,
                      color: "var(--text-primary)",
                      marginTop: 32,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {para.slice(3)}
                  </h2>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Share:</span>
            <ShareLink label="LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://nexorai.io/blog/${slug}`)}`} />
            <ShareLink label="Twitter / X" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://nexorai.io/blog/${slug}`)}`} />
            <ShareLink label="Copy link" href={`https://nexorai.io/blog/${slug}`} />
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="font-display" style={{ fontWeight: 700, fontSize: 22 }}>
                Related reading
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="text-[11px] uppercase" style={{ color: "var(--accent-cyan)", letterSpacing: 2, fontWeight: 600 }}>
                      {r.tag}
                    </div>
                    <h4 className="mt-3 font-display" style={{ fontWeight: 700, fontSize: 18 }}>
                      {r.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

function ShareLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="rounded-lg px-3 py-1.5 text-[12px] transition-all duration-200 hover:border-accent-cyan hover:text-accent-cyan"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        color: "var(--text-secondary)",
      }}
    >
      {label}
    </a>
  );
}
