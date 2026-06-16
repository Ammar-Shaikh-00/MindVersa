"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

const SplineHero = dynamic(() => import("@/components/spline-hero"), {
  ssr: false,
  loading: () => null,
});

const STATS: { value: string; target: number; suffix: string; label: string }[] = [
  { value: "50+", target: 50, suffix: "+", label: "Models Deployed" },
  { value: "10M+", target: 10, suffix: "M+", label: "Data Points Processed" },
  { value: "99%", target: 99, suffix: "%", label: "Average Accuracy" },
  { value: "5d", target: 5, suffix: "d", label: "Average Delivery" },
];

function CountUp({ target, suffix, delayMs }: { target: number; suffix: string; delayMs: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    let raf = 0;
    let cleanup = () => {};
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !ref.current) return;
      const obj = { v: 0 };
      const tween = gsap.to(obj, {
        v: target,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.round(obj.v).toString() + suffix;
        },
      });
      cleanup = () => tween.kill();
    }, delayMs);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, [target, suffix, delayMs]);
  return <span ref={ref}>0{suffix}</span>;
}

function HeadlineSplit({
  text,
  color,
  delay,
  style,
  className,
}: {
  text: string;
  color?: string;
  delay: number;
  style?: CSSProperties;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    (async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !containerRef.current) return;
      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-word]");
      const tween = gsap.fromTo(
        spans,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08, delay },
      );
      cleanup = () => tween.kill();
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [delay]);

  const words = text.split(" ");
  return (
    <span ref={containerRef} className={className} style={{ color, display: "inline-block", ...style }}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.06em" }}>
          <span data-word style={{ display: "inline-block", transform: "translateY(40px)", opacity: 0 }}>
            {w}
            {i < words.length - 1 ? "\u00a0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const [showScroll, setShowScroll] = useState(true);
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: "#05070F", minHeight: "100svh" }}
    >
      <div className="hero-blob" style={{ width: 500, height: 500, top: "10%", left: "60%", background: "rgba(0,229,255,0.06)" }} />
      <div className="hero-blob" style={{ width: 400, height: 400, bottom: "20%", right: "10%", background: "rgba(123,97,255,0.05)" }} />
      <div className="hero-dot-grid" />

      <Suspense fallback={null}>
        <SplineHero />
      </Suspense>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-content items-center px-4 md:px-6">
        <div className="mx-auto w-full max-w-[760px] pt-[120px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px]"
            style={{
              background: "rgba(0,229,255,0.06)",
              borderColor: "rgba(0,229,255,0.18)",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            <span className="pulse-dot inline-block h-2 w-2 rounded-full" style={{ background: "#10B981" }} />
            AI Engineering Team · 50+ Projects Delivered
          </motion.div>

          <h1
            className="mx-auto font-display font-extrabold"
            style={{
              fontSize: "clamp(40px, 5vw, 74px)",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            <span className="block whitespace-nowrap">
              <HeadlineSplit text="AI Systems That" color="var(--text-primary)" delay={0.2} />
            </span>
            <span className="block whitespace-nowrap">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Deliver Results.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mx-auto mt-6"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(16px, 1.45vw, 20px)",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: 620,
            }}
          >
            Custom ML models, data platforms, and production AI software built by engineers for measurable business outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg px-7 py-[13px] text-[15px] font-bold"
              style={{ background: "#00E5FF", color: "#05070F" }}
            >
              Start a Project
            </Link>
            <Link
              href="#results"
              className="inline-flex items-center justify-center rounded-lg border px-7 py-[13px] text-[15px] font-bold transition-colors duration-200 hover:border-[#00E5FF] hover:text-[#00E5FF]"
              style={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "#F0F4FF",
              }}
            >
              View Case Studies
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t pb-14 pt-9 md:grid-cols-4 md:gap-x-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="text-center md:border-r"
                style={{ borderColor: i < STATS.length - 1 ? "rgba(255,255,255,0.06)" : "transparent" }}
              >
                <div
                  className="font-display font-extrabold"
                  style={{ fontSize: "clamp(34px, 3.2vw, 46px)", color: "var(--accent-cyan)", lineHeight: 1 }}
                >
                  <CountUp target={s.target} suffix={s.suffix} delayMs={1000 + i * 120} />
                </div>
                <div className="mt-1 text-[12px] tracking-[0.4px]" style={{ color: "var(--text-secondary)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] uppercase"
          style={{ letterSpacing: "2px", color: "var(--text-muted)", fontWeight: 400 }}
        >
          scroll
        </span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
