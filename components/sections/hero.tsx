"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
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

export function HeroSection() {
  const [showScroll, setShowScroll] = useState(true);
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setShowSpline(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
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

      {showSpline && (
        <Suspense fallback={null}>
          <SplineHero />
        </Suspense>
      )}

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1200px] items-center px-4 sm:px-5 md:px-6">
        <div className="mx-auto w-full max-w-[760px] pt-[100px] pb-10 text-center sm:pt-[120px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] sm:mb-7 sm:px-4 sm:text-[13px]"
            style={{
              background: "rgba(0,229,255,0.06)",
              borderColor: "rgba(0,229,255,0.18)",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            <span className="pulse-dot inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: "#10B981" }} />
            <span className="truncate">AI Engineering Team · 50+ Projects</span>
          </motion.div>

          <h1
            className="mx-auto w-full max-w-full text-center font-display font-extrabold"
            style={{
              fontSize: "clamp(26px, 7.2vw, 68px)",
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="block whitespace-nowrap text-center"
              style={{ color: "var(--text-primary)" }}
            >
              AI Systems That
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="block whitespace-nowrap text-center"
              style={{
                background: "linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Deliver Results.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mx-auto mt-5 px-1 sm:mt-6"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 3.6vw, 21px)",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: 640,
            }}
          >
            End-to-end AI software — chatbots, automation, data platforms, and custom systems built by engineers for measurable business outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-lg px-8 py-[14px] text-[15px] font-bold sm:w-auto sm:text-[16px]"
              style={{ background: "#00E5FF", color: "#05070F" }}
            >
              Start a Project
            </Link>
            <Link
              href="#results"
              className="inline-flex w-full items-center justify-center rounded-lg border px-8 py-[14px] text-[15px] font-bold transition-colors duration-200 hover:border-[#00E5FF] hover:text-[#00E5FF] sm:w-auto sm:text-[16px]"
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
            className="mt-10 w-full border-t pb-10 pt-8 sm:mt-12 sm:pb-14 sm:pt-9"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="hero-stats grid w-full grid-cols-2 md:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="hero-stat flex flex-col items-center justify-start px-3 py-1 text-center sm:px-4"
                >
                  <div
                    className="font-display font-extrabold tabular-nums"
                    style={{
                      fontSize: "clamp(28px, 5vw, 44px)",
                      color: "var(--accent-cyan)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <CountUp target={s.target} suffix={s.suffix} delayMs={1000 + i * 120} />
                  </div>
                  <div
                    className="mt-2 max-w-[9.5rem] text-[11px] leading-snug tracking-[0.3px] sm:text-[12px] md:text-[13px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8 sm:flex"
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
