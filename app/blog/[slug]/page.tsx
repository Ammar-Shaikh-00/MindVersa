import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/blog-posts";
import { BRAND_NAME, SITE_URL } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd, toIsoDate } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ReadingProgress } from "./reading-progress";

type Params = { slug: string };

const FULL_POST_BY_SLUG: Record<
  string,
  { title: string; tag: string; date: string; read: string; description: string; body: string }
> = {
  "hire-ml-engineer-agency": {
    title: "How to Hire an ML Engineering Agency (Without Wasting Budget)",
    tag: "Buying Guide",
    date: "Jul 14, 2026",
    read: "8 min read",
    description:
      "Practical checklist for hiring an ML engineering agency: scope, data readiness, delivery model, and red flags before you sign.",
    body: `If you need to hire an ML engineer or a custom machine learning team, the hard part is not finding vendors — it is knowing who can ship production systems versus demos.

This guide is the process we recommend to founders and CTOs before they sign a statement of work.

## Start with the business outcome
Skip “we need AI.” Define the metric: fraud loss below 0.5%, support deflection above 35%, defect escape rate down 50%. Agencies that cannot map work to a KPI will spend your budget on architecture theater.

## Check data readiness before model talk
Ask what data you already have, how it is labeled, and who owns it. A serious partner will spend the first week on data quality, not model choice. If they promise high accuracy with no data audit, walk away.

## Evaluate delivery, not slide decks
Request a sample architecture for your use case: training pipeline, evaluation gates, deployment path, monitoring. Custom machine learning development should include retraining and ownership after launch.

## Pricing models that stay sane
Prefer staged delivery: discovery → prototype → production → MLOps. Avoid open-ended “AI retainers” with no milestones. Fixed milestone gates protect both sides.

## Red flags
- Guaranteed accuracy numbers before seeing your data
- No talk of false positives, latency, or security
- No plan for human review / fallbacks
- Refusing an NDA before data access

## How MindVersa works
We start with a free technical discovery call, then a scoped proposal with timelines, risks, and success metrics. If you are ready to hire an ML engineering partner, use the contact form and we will tell you honestly whether the problem is feasible.

Talk to us when you have a measurable problem and at least a path to data — even imperfect data.`,
  },
  "ai-chatbot-for-saas": {
    title: "AI Chatbots for SaaS Companies: What Actually Works in Production",
    tag: "NLP / LLM",
    date: "Jul 10, 2026",
    read: "9 min read",
    description:
      "How SaaS companies build production AI chatbots with RAG, guardrails, and escalation — without hallucinating product answers.",
    body: `An AI chatbot for SaaS companies only works when it is grounded in your product truth: docs, release notes, ticket history, and support macros.

Generic “ChatGPT plugged into help center” projects fail because they skip retrieval quality and escalation design.

## What buyers actually want
SaaS teams usually want three outcomes: faster onboarding answers, fewer Tier-1 tickets, and 24/7 coverage without hiring overnight staff. Measure those explicitly.

## Architecture that survives launch
Production assistants we ship usually look like this:
- RAG over curated docs + selected tickets
- Tool calling for account lookups (with auth)
- Strict refusal policy when confidence is low
- Smooth handoff to human agents with context

## Content quality beats model size
A medium model with clean chunks and metadata filters beats a frontier model on noisy PDFs. Invest in doc hygiene first.

## Guardrails you should require
Citation links, PII scrubbing, rate limits, prompt-injection defenses, and audit logs. If your chatbot can invent pricing or compliance claims, it is not ready.

## Rollout plan
Start with a single workflow (password reset FAQs, billing FAQ, or onboarding). Expand only after deflection and CSAT hold for two weeks.

If you need a production AI chatbot for your SaaS product, MindVersa can scope a 2–4 week pilot with clear success criteria.`,
  },
  "automate-customer-support-ai": {
    title: "How to Automate Customer Support with AI (Without Killing UX)",
    tag: "Automation",
    date: "Jul 02, 2026",
    read: "8 min read",
    description:
      "Staged playbook to automate customer support with AI: triage, RAG answers, escalation rules, and ROI metrics that matter.",
    body: `Teams that want to automate customer support with AI usually fail by trying to replace humans on day one. The winning pattern is partial automation with clear human takeover.

## Stage 1 — Triage
Classify tickets by intent, urgency, and language. Even without full answering, smarter routing cuts wait times.

## Stage 2 — Suggested replies
Agents get drafts they can edit. This builds trust in the model and creates labeled data for improvement.

## Stage 3 — Autonomous answers with escalation
Only well-bounded intents go fully automatic: password resets, plan limits, shipping status. High-risk intents (billing disputes, legal, account deletion) stay human-led.

## Metrics that prove ROI
Track deflection rate, median first response time, reopen rate, and CSAT for automated vs human replies. Ignore vanity “messages handled” counts.

## Workflow automation around the bot
Real gains come when AI sits inside your helpdesk, CRM, and status pages — not in a disconnected chat widget.

MindVersa builds workflow automation and NLP systems as one stack: models, APIs, and the process design that keeps customers happy.`,
  },
  "fraud-detection-99-accuracy": {
    title: "How We Built a Fraud Detection Model with 99.1% Accuracy",
    tag: "ML Engineering",
    date: "Jun 12, 2026",
    read: "9 min read",
    description:
      "Case study: fraud detection machine learning pipeline with XGBoost, feature engineering, and sub-50ms FastAPI inference for a US fintech.",
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
    description:
      "Computer vision for manufacturing case study: YOLOv8 edge inference that cut QA costs 67% for a UK industrial customer.",
    body: `Manufacturing QA used to mean a person standing on a line for eight hours looking for surface defects. It's hard work, it's inconsistent across operators, and at speed it misses things. Here's how we replaced that process for a UK industrial customer using YOLOv8 and a small inference box that lives next to the conveyor.

## The Setup
Cameras above the line captured each unit. Lighting was industrial and imperfect. We trained a YOLOv8 detector on labeled defect classes (scratch, dent, missing fastener) with heavy augmentation for motion blur and specular highlights.

## Edge Inference
Cloud round-trips were too slow and risky for plant networks. We deployed ONNX Runtime on an industrial PC next to the line. Decisions came in under 40ms so reject actuators could fire before packing.

## Results
Defect escape rate dropped and QA labor cost fell about 67% on the covered lines. Operators moved from continuous visual inspection to exception review — a better job and a clearer audit trail.

## Lessons
Computer vision for manufacturing fails when teams ignore lighting, camera vibration, and labeled edge cases. Budget for data collection days on-site, not just model training in the cloud.

If your plant has a high-volume inspection bottleneck, MindVersa can assess feasibility from a short video sample and one week of labels.`,
  },
  "rag-vs-fine-tuning": {
    title: "RAG vs Fine-Tuning: Which Should You Choose in 2026?",
    tag: "NLP / LLM",
    date: "May 03, 2026",
    read: "11 min read",
    description:
      "RAG chatbot development vs fine-tuning in 2026: when to retrieve, when to fine-tune, and when production systems need both.",
    body: `RAG and fine-tuning are not competitors. They solve different problems and the cleanest LLM products usually do both. This is the decision tree we use in a first technical call.

## Choose RAG when facts change often
Product docs, pricing, policies, and ticket macros change weekly. Retrieval-augmented generation keeps answers current without retraining. Most RAG chatbot development work is chunking strategy, metadata filters, and evaluation — not model drama.

## Choose fine-tuning when style or format is rigid
If you need a specific JSON tool schema, terse agent voice, or domain abbreviations the base model mishandles, lightweight fine-tuning or preference tuning helps. Do not fine-tune to “memorize” docs.

## Combine both in production
Retrieve the right evidence, then apply a tuned policy model for tone, refusal, and tool use. That pattern is what we ship for enterprise assistants.

## Evaluation first
Build an offline eval set of 100–300 real questions with expected cites. If a vendor cannot show score movement on your eval, they are guessing.

## Cost reality
RAG ops cost is storage + embedding + retrieval latency. Fine-tune ops cost is data labeling + training runs + regression testing. Start RAG-first unless you have a proven format problem.

MindVersa designs RAG systems and fine-tunes only when metrics demand it. If you are stuck choosing, send us three example questions from your domain and we will recommend an architecture in the discovery call.`,
  },
};

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = POSTS.find((p) => p.slug === slug);
  const post = FULL_POST_BY_SLUG[slug];
  if (!post || !meta) return { title: "Post not found" };

  const url = `${SITE_URL}/blog/${slug}`;
  const description = post.description;

  return {
    title: post.title,
    description,
    keywords: [meta.focusKeyword, BRAND_NAME, meta.tag],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      siteName: BRAND_NAME,
      publishedTime: toIsoDate(post.date),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = FULL_POST_BY_SLUG[slug];
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 2);
  const urlPath = `/blog/${slug}`;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          slug,
          datePublished: toIsoDate(post.date),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: urlPath },
        ])}
      />
      <ReadingProgress />
      <article className="section" style={{ background: "var(--bg-primary)", paddingTop: 140 }}>
        <div className="container-x" style={{ maxWidth: 760 }}>
          <Link
            href="/blog"
            className="inline-block text-[13px] text-accent-cyan hover:opacity-80"
          >
            ← Back to journal
          </Link>
          <span
            className="mt-6 block w-fit rounded-full px-3 py-1 text-[10px] uppercase"
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
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: 700,
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-[14px]" style={{ color: "var(--text-secondary)" }}>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.read}</span>
          </div>

          <div className="mt-10 space-y-5 text-[18px]" style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
            {post.body.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="font-display"
                    style={{
                      fontWeight: 700,
                      fontSize: 28,
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
            <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
              Share:
            </span>
            <ShareLink
              label="LinkedIn"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}${urlPath}`)}`}
            />
            <ShareLink
              label="Twitter / X"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${SITE_URL}${urlPath}`)}&text=${encodeURIComponent(post.title)}`}
            />
            <ShareLink label="Copy link" href={`${SITE_URL}${urlPath}`} />
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-[22px] font-bold">Related reading</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="rounded-2xl p-5 transition-colors hover:border-[rgba(0,229,255,0.25)]"
                    style={{ border: "1px solid rgba(255,255,255,0.06)", background: "var(--bg-elevated)" }}
                  >
                    <p className="text-[12px]" style={{ color: "var(--accent-cyan)" }}>
                      {p.tag}
                    </p>
                    <p className="mt-2 font-display text-[17px] font-bold" style={{ letterSpacing: "-0.3px" }}>
                      {p.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14 rounded-2xl p-7" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="font-display text-[20px] font-bold">Need this built for your team?</p>
            <p className="mt-2 text-[15px]" style={{ color: "var(--text-secondary)" }}>
              Book a free technical discovery call with MindVersa.
            </p>
            <Link href="/#contact" className="mt-5 inline-block text-[14px] font-semibold text-accent-cyan hover:opacity-80">
              Contact us →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

function ShareLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target={label === "Copy link" ? undefined : "_blank"}
      rel="noreferrer noopener"
      className="rounded-full px-3 py-1.5 text-[12px] transition-opacity hover:opacity-80"
      style={{ border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)" }}
    >
      {label}
    </a>
  );
}
