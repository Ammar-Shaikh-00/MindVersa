"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { sectionHref } from "@/lib/nav-links";
import { staggerContainer, staggerItem } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

const ThreeHero = dynamic(
  () => import("@/components/three-hero").then((m) => m.ThreeHero),
  { ssr: false },
);

const heroStats = [
  { value: "50+", label: "Automations Built" },
  { value: "3x", label: "Avg Efficiency Gain" },
  { value: "48hr", label: "First Demo" },
  { value: "$2M+", label: "Revenue Generated" },
];

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const container = staggerContainer(0.065, 0.06);
  const motionProps = reduceMotion
    ? {}
    : {
        variants: container,
        initial: "hidden" as const,
        animate: "show" as const,
      };

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#05070F] px-6 pb-12 pt-20 sm:pb-16">
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
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(5,7,15,0.55) 0%, transparent 100%)",
          }}
        />
        <motion.div className="relative z-10 flex w-full flex-col items-center" {...motionProps}>
          <motion.div
            variants={reduceMotion ? undefined : staggerItem}
            className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-emerald-500/10 px-3 py-1.5 text-xs sm:mb-8 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            Trusted by 50+ businesses worldwide
          </motion.div>
          <motion.h1
            variants={reduceMotion ? undefined : staggerItem}
            className="relative z-10 mx-auto max-w-[800px] text-balance font-heading font-extrabold"
            style={{
              fontSize: "clamp(40px, 8vw, 100px)",
              letterSpacing: "clamp(-4px, -0.04em, -1px)",
              lineHeight: 0.95,
            }}
          >
            <span className="block text-[#F0F4FF]">We Build AI Systems That Work While</span>
            <span className="block text-[#00E5FF]">You Sleep</span>
          </motion.h1>
          <motion.p
            variants={reduceMotion ? undefined : staggerItem}
            className="relative z-10 mx-auto mt-6 max-w-[520px] font-sans font-light text-[#8892A4]"
            style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
          >
            Custom AI automation, intelligent chatbots, and revenue-driving workflows for forward-thinking businesses
            worldwide.
          </motion.p>
          <motion.div
            variants={reduceMotion ? undefined : staggerItem}
            className="relative z-10 mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-3"
          >
            <Link href={sectionHref("contact")} className="btn-primary w-full text-center sm:w-auto">
              Book free AI audit — 30 min
            </Link>
            <Link href={sectionHref("results")} className="btn-ghost w-full text-center sm:w-auto">
              See proof &amp; results
            </Link>
          </motion.div>

          <motion.div
            variants={reduceMotion ? undefined : staggerItem}
            className="relative z-10 mt-12 w-full max-w-4xl sm:mt-16"
          >
            <div className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:flex sm:flex-wrap sm:items-start sm:justify-center sm:gap-x-0 sm:gap-y-0">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col items-center justify-start text-center sm:min-w-[120px] sm:px-5 md:px-8 lg:px-10",
                    index > 0 && "sm:border-l sm:border-[rgba(255,255,255,0.08)]",
                  )}
                >
                  <p className="font-heading text-[clamp(28px,6vw,40px)] font-extrabold leading-none text-[#00E5FF]">
                    {stat.value}
                  </p>
                  <p className="mt-2 max-w-[140px] font-sans text-[11px] font-normal leading-snug text-[#8892A4] sm:text-[13px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
