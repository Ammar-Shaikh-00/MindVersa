"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MessageCircle, Rocket, ScanSearch, Settings2 } from "lucide-react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AuditForm } from "@/components/forms/audit-form";
import { ContactForm } from "@/components/forms/contact-form";

const ThreeHero = dynamic(
  () => import("@/components/three-hero").then((module) => module.ThreeHero),
  { ssr: false },
);

gsap.registerPlugin(ScrollTrigger);

const serviceCards = [
  { title: "AI Chatbots & Voice Agents", desc: "Deploy intelligent assistants for web, WhatsApp, and voice channels.", roi: "Saves 30hrs/week" },
  { title: "Workflow Automation", desc: "Remove repetitive admin work with robust no-code and custom pipelines.", roi: "Cuts ops time 65%" },
  { title: "AI Lead Generation & CRM", desc: "Capture, score, and nurture every lead through automated sequences.", roi: "Boosts conversion 2.8x" },
  { title: "Content & SEO Automation", desc: "Generate and optimize high-intent content at scale with quality control.", roi: "3x content output" },
  { title: "Data Analytics & Reporting", desc: "Real-time KPI dashboards and AI summaries for faster decisions.", roi: "Weekly reporting in minutes" },
  { title: "Custom AI Development", desc: "Purpose-built AI systems integrated deeply with your internal stack.", roi: "Revenue impact focused" },
];

const faqItems = [
  "What industries do you work with?",
  "How long does it take to build an automation?",
  "Do I need technical knowledge to use your AI systems?",
  "What tools do you integrate with?",
  "Is my business data secure?",
  "What if the automation doesn't work as expected?",
  "Do you offer ongoing support after launch?",
  "How do I get started?",
];

export function HomePage() {
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const processTrackRef = useRef<HTMLDivElement>(null);
  const [isQuarterly, setIsQuarterly] = useState(false);

  useEffect(() => {
    if (heroHeadingRef.current) {
      gsap.fromTo(
        heroHeadingRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.15 },
      );
    }

    if (processTrackRef.current && window.innerWidth >= 1024) {
      const track = processTrackRef.current;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 48),
        ease: "none",
        scrollTrigger: {
          trigger: "#process",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const heroStats = [
    { value: "50+", label: "Automations Built" },
    { value: "3x", label: "Avg Efficiency Gain" },
    { value: "48hr", label: "First Demo" },
    { value: "$2M+", label: "Revenue Generated" },
  ];

  return (
    <div className="relative z-10 overflow-x-clip">
      <section className="relative flex min-h-screen items-center justify-center bg-[#05070F] px-6 pt-20">
        <div className="mesh-bg" />
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-[#090f21] to-[#05070F]" />}>
          <ThreeHero />
        </Suspense>
        <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center justify-center text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[min(900px,95vw)] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(5,7,15,0.6) 0%, transparent 100%)",
            }}
          />
          <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-emerald-500/10 px-3 py-1.5 text-xs sm:mb-8 sm:px-4 sm:py-2 sm:text-sm">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            Trusted by 50+ businesses worldwide
          </div>
          <h1
            ref={heroHeadingRef}
            className="relative z-10 mx-auto max-w-[800px] text-balance font-heading font-extrabold"
            style={{
              fontSize: "clamp(56px, 8vw, 100px)",
              letterSpacing: "-4px",
              lineHeight: 0.95,
            }}
          >
            <span className="block text-[#F0F4FF]">We Build AI Systems That Work While</span>
            <span className="block text-[#00E5FF]">You Sleep</span>
          </h1>
          <p
            className="relative z-10 mx-auto mt-6 max-w-[520px] font-sans font-light text-[#8892A4]"
            style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
          >
            Custom AI automation, intelligent chatbots, and revenue-driving workflows for forward-thinking businesses worldwide.
          </p>
          <div className="relative z-10 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3">
            <Link
              href="#contact"
              className="w-full rounded-[8px] bg-gradient-to-br from-[#00E5FF] to-[#7B61FF] px-8 py-[14px] text-center font-sans text-base font-bold text-[#05070F] sm:w-auto"
            >
              Get Free AI Audit
            </Link>
            <Link
              href="#results"
              className="w-full rounded-[8px] border border-white/10 px-8 py-[14px] text-center font-sans text-base font-bold text-[#F0F4FF] hover:border-[#00E5FF] sm:w-auto"
            >
              View Case Studies
            </Link>
          </div>

          <div className="relative z-10 mt-16 w-full max-w-4xl">
            <div className="mx-auto flex items-center justify-center gap-12">
              {heroStats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-12">
                  <div className="text-center">
                    <p className="font-heading text-[40px] font-extrabold leading-none text-[#00E5FF]">{stat.value}</p>
                    <p className="mt-2 font-sans text-[13px] font-normal text-[#8892A4]">{stat.label}</p>
                  </div>
                  {index < heroStats.length - 1 ? (
                    <span aria-hidden className="h-12 w-px bg-[rgba(255,255,255,0.08)]" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
        <ChevronDown className="absolute bottom-5 left-1/2 h-7 w-7 -translate-x-1/2 animate-pulse text-[#00E5FF] sm:bottom-7 sm:h-8 sm:w-8" />
      </section>

      <Marquee />
      <ServicesSection />
      <ProcessSection processTrackRef={processTrackRef} />
      <ResultsSection />
      <TechStrip />
      <PricingSection isQuarterly={isQuarterly} onToggle={setIsQuarterly} />
      <Testimonials />
      <FaqSection />
      <CtaSection />
      <ContactSection />
    </div>
  );
}

function Marquee() {
  const rowOne = "E-commerce | SaaS | Healthcare | Real Estate | Logistics | Finance | EdTech | Legal | Hospitality | Marketing Agencies";
  const rowTwo = "OpenAI | Zapier | Make.com | HubSpot | Shopify | Notion | Slack | Airtable | Stripe | Salesforce";
  return (
    <section className="section-block bg-[#0B0E1A]">
      <div className="section-inner glass overflow-hidden border-y border-white/6 py-5 sm:py-6">
      <div className="animate-[marquee_28s_linear_infinite] whitespace-nowrap px-2 text-base text-[#8892A4] sm:text-xl">{rowOne}   {rowOne}</div>
      <div className="mt-2 animate-[marqueeReverse_26s_linear_infinite] whitespace-nowrap px-2 text-base text-[#00E5FF] sm:mt-3 sm:text-xl">{rowTwo}   {rowTwo}</div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const cardClasses = [
    "service-card service-card-1",
    "service-card service-card-2",
    "service-card service-card-3",
    "service-card service-card-4",
    "service-card service-card-5",
    "service-card service-card-6",
  ];

  return (
    <section id="services" className="section-block bg-[#05070F]">
      <div className="section-inner">
      <p className="section-label">WHAT WE BUILD</p>
      <h2 className="section-title max-w-3xl">AI Solutions That Replace Repetitive Work</h2>
      <div className="services-grid mt-10">
        {serviceCards.map((card, idx) => (
          <article key={card.title} className={cardClasses[idx]}>
            {idx === 5 ? (
              <div className="service-card-6-layout">
                <div>
                  <div className="mb-4 inline-flex rounded-lg bg-[#00E5FF]/15 p-2 text-[#00E5FF]">
                    <Settings2 className="h-5 w-5 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-black sm:text-2xl">{card.title}</h3>
                  <p className="section-body mt-2">{card.desc}</p>
                  <span className="mt-4 inline-block rounded-full bg-[#7B61FF]/20 px-3 py-1 text-xs text-[#cfc8ff]">{card.roi}</span>
                </div>
                <div className="service-code-mockup" aria-hidden>
                  <span>{`if (lead.score > 80) {`}</span>
                  <span>{`  sendToCRM("priority");`}</span>
                  <span>{`  triggerFollowup();`}</span>
                  <span>{`}`}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4 inline-flex rounded-lg bg-[#00E5FF]/15 p-2 text-[#00E5FF]">
                  <Settings2 className="h-5 w-5 animate-pulse" />
                </div>
                <h3 className="text-xl font-black sm:text-2xl">{card.title}</h3>
                <p className="section-body mt-2">{card.desc}</p>
                <span className="mt-4 inline-block rounded-full bg-[#7B61FF]/20 px-3 py-1 text-xs text-[#cfc8ff]">{card.roi}</span>
              </>
            )}
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}

function ProcessSection({ processTrackRef }: { processTrackRef: React.RefObject<HTMLDivElement | null> }) {
  const steps = [
    { icon: ScanSearch, title: "Free Discovery Call", desc: "We map your workflows and identify automation ROI." },
    { icon: MessageCircle, title: "Custom AI Blueprint", desc: "Tailored strategy with no generic templates." },
    { icon: Settings2, title: "Build & Integrate", desc: "We connect your tools and test every edge case." },
    { icon: Rocket, title: "Launch & Scale", desc: "Go live fast, train your team, and keep improving." },
  ];
  return (
    <section id="process" className="section-block relative overflow-hidden bg-[#0B0E1A]">
      <div className="section-inner">
        <p className="section-label">THE PROCESS</p>
        <h2 className="section-title max-w-3xl">From Discovery to Live in 5 Days</h2>
      </div>
      <div ref={processTrackRef} className="section-inner mt-10 flex flex-col gap-4 sm:gap-6 lg:mt-12 lg:w-[2200px] lg:flex-row">
        {steps.map((step, idx) => (
          <div key={step.title} className="glass relative min-h-[220px] w-full rounded-3xl p-5 sm:min-h-[240px] sm:p-6 lg:min-h-[260px] lg:w-[500px]">
            <p className="absolute right-4 top-3 text-6xl font-black text-white/5 sm:text-7xl">{idx + 1}</p>
            <step.icon className="h-8 w-8 text-[#00E5FF]" />
            <h3 className="mt-4 text-xl font-black sm:text-2xl">{step.title}</h3>
            <p className="section-body mt-2">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResultsSection() {
  const metrics = [
    ["Time Saved", 85],
    ["Lead Conversion", 72],
    ["Revenue Impact", 67],
    ["Client Satisfaction", 94],
    ["Cost Reduction", 55],
  ] as const;

  return (
    <section id="results" className="section-block bg-[#05070F]">
      <div className="section-inner grid gap-6 sm:gap-8 md:grid-cols-2">
      <div>
        <p className="section-label">REAL RESULTS</p>
        <h2 className="section-title">Case Studies That Convert</h2>
        {[
          "E-commerce client — 340% increase in lead response rate",
          "SaaS company — 28 hours saved per week per employee",
          "Real estate agency — 3x more booked consultations in month 1",
        ].map((item) => (
          <div key={item} className="glass section-body mt-4 rounded-2xl p-5">{item}</div>
        ))}
      </div>
      <div className="glass rounded-3xl p-6">
        {metrics.map(([label, value]) => (
          <MetricBar key={label} label={label} value={value} />
        ))}
      </div>
      </div>
    </section>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-4">
      <div className="mb-2 flex justify-between text-sm text-[#8892A4]">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 0.8 }}
          className="h-2 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]"
        />
      </div>
    </div>
  );
}

function TechStrip() {
  const names = ["OpenAI GPT-4", "Claude AI", "Llama", "LangChain", "Zapier", "Make.com", "n8n", "Supabase", "Pinecone", "Vercel"];
  return (
    <section className="section-block bg-[#0B0E1A]">
      <div className="section-inner">
      <p className="section-label text-center">POWERED BY CUTTING-EDGE AI</p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {names.map((item) => (
          <div key={item} className="glass rounded-xl p-4 text-center text-sm text-[#8892A4] hover:text-[#00E5FF]">{item}</div>
        ))}
      </div>
      </div>
    </section>
  );
}

function PricingSection({ isQuarterly, onToggle }: { isQuarterly: boolean; onToggle: (value: boolean) => void }) {
  const multiplier = isQuarterly ? 0.9 : 1;
  const starter = Math.round(299 * multiplier);
  const growth = Math.round(699 * multiplier);
  return (
    <section id="pricing" className="section-block bg-[#05070F]">
      <div className="section-inner">
      <p className="section-label">TRANSPARENT PRICING</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <h2 className="section-title">Simple Plans. Real ROI.</h2>
        <button onClick={() => onToggle(!isQuarterly)} className="rounded-[8px] border border-white/10 px-4 py-2 text-xs text-[#8892A4] sm:px-5 sm:text-sm">
          {isQuarterly ? "Quarterly (10% off)" : "Monthly"}
        </button>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <PriceCard title="Starter" price={`$${starter}/mo`} points={["1 AI Chatbot", "Basic lead capture automation", "Monthly performance report", "Email support (48hr)", "✗ Custom workflows", "✗ CRM integration"]} />
        <PriceCard title="Growth" featured price={`$${growth}/mo`} points={["3 AI agents", "Lead gen + nurture sequences", "3 custom workflows", "CRM integrations", "Weekly dashboard", "Priority support (4hr)", "30-day results guarantee"]} />
        <PriceCard title="Enterprise" price="Custom" points={["Unlimited automations", "Model fine-tuning", "Full-stack integrations", "Dedicated AI engineer", "99.9% uptime SLA", "24/7 support"]} />
      </div>
      </div>
    </section>
  );
}

function PriceCard({ title, price, points, featured = false }: { title: string; price: string; points: string[]; featured?: boolean }) {
  return (
    <div className={`glass rounded-3xl p-5 sm:p-6 ${featured ? "gradient-border" : ""}`}>
      <p className="text-2xl font-black">{title}</p>
      <p className="mt-3 text-3xl font-black text-[#00E5FF] sm:text-4xl">{price}</p>
      <ul className="section-body mt-4 space-y-2 text-sm">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <Link href="#contact" className="mt-6 inline-block rounded-[8px] border border-white/10 px-4 py-2 font-semibold text-[#F0F4FF] hover:border-[#00E5FF] hover:text-[#00E5FF]">
        Get Started
      </Link>
    </div>
  );
}

function Testimonials() {
  const testimonials = useMemo(
    () => [
      "★★★★★ James Thornton, CEO @ GrowthLab (UK) — \"Lead response speed exploded after launch.\"",
      "★★★★★ Sarah Mitchell, Founder @ CloudDesk (USA) — \"Our workflows now run with almost zero manual work.\"",
      "★★★★★ Omar Al-Rashid, Director @ PropNest (UAE) — \"3x more booked consultations in month one.\"",
      "★★★★★ Emma Clarke, CMO @ Vibe Agency (Australia) — \"Content automation paid back in weeks.\"",
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="section-block bg-[#0B0E1A]">
      <div className="section-inner">
      <p className="section-label">CLIENT STORIES</p>
      <h2 className="section-title">Results That Speak for Themselves</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((text, i) => (
          <motion.div
            key={text}
            animate={{ opacity: Math.abs(i - index) <= 2 ? 1 : 0.5, y: i === index ? -4 : 0 }}
            className="glass section-body rounded-2xl p-5 text-sm"
          >
            {text}
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section-block bg-[#05070F]">
      <div className="section-inner max-w-4xl">
      <h2 className="section-title text-center">FAQ</h2>
      <Accordion type="single" collapsible className="mt-8">
        {faqItems.map((q) => (
          <AccordionItem key={q} value={q}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent>
              We tailor each implementation for your stack, goals, and budget. During discovery, we map your workflow and share exact timelines.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="section-block relative overflow-hidden bg-[#0B0E1A]">
      <div className="mesh-bg" />
      <div className="section-inner">
      <div className="glass mx-auto max-w-5xl rounded-3xl px-4 py-10 text-center sm:px-6 sm:py-14">
        <h2 className="section-title">Ready to Automate Your Business?</h2>
        <p className="section-body mt-3">Book a free 30-minute discovery call. No pitch. Just clarity.</p>
        <AuditForm />
      </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-block bg-[#05070F]">
      <div className="section-inner grid gap-8 md:grid-cols-2">
      <div>
        <h2 className="section-title">Let&apos;s Talk</h2>
        <p className="mt-4 inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-400">⚡ We respond within 2 hours</p>
        <p className="section-body mt-5">Available across US, UK, EU, AUS, ME timezones</p>
        <p className="section-body mt-2">hello@nexorai.io</p>
        <Link className="mt-2 inline-block text-[#00E5FF]" href="https://calendly.com">
          Or book directly →
        </Link>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#8892A4]">
          <Link href="https://linkedin.com">LinkedIn</Link>
          <Link href="https://twitter.com">Twitter/X</Link>
          <Link href="https://github.com">GitHub</Link>
        </div>
      </div>
      <ContactForm />
      </div>
    </section>
  );
}
