"use client";

import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";
import { MessageCircle, Rocket, ScanSearch, Settings2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { processSteps, type ProcessIconKey } from "@/lib/home-data";
import { EASE_OUT } from "@/lib/motion-presets";
import { SectionReveal } from "@/components/section-reveal";

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = 64;

const processIcons: Record<ProcessIconKey, LucideIcon> = {
  scan: ScanSearch,
  message: MessageCircle,
  settings: Settings2,
  rocket: Rocket,
};

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 48),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: `top ${NAV_OFFSET}px`,
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 320, 900)}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} id="process" className="section-block relative overflow-hidden bg-[#05070F]">
      <div className="section-inner">
        <SectionReveal>
          <p className="section-label">THE PROCESS</p>
          <h2 className="section-title max-w-3xl">From Discovery to Live in 5 Days</h2>
          <p className="section-body mt-4 max-w-2xl">
            Four focused phases — discovery, blueprint, build, and launch — delivered in under one week.
          </p>
        </SectionReveal>
      </div>
      <div className="process-scroll-wrapper">
        <div ref={trackRef} className="process-scroll-track">
          {processSteps.map((step, idx) => {
            const Icon = processIcons[step.icon];
            return (
              <motion.div
                key={step.title}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: EASE_OUT }}
                className="glass relative min-h-[220px] w-full rounded-3xl p-5 sm:min-h-[240px] sm:p-6 lg:min-h-[260px] lg:w-[min(500px,calc(100vw-48px))] lg:shrink-0"
              >
                <p className="absolute right-4 top-3 font-heading text-6xl font-extrabold text-white/5 sm:text-7xl">
                  {idx + 1}
                </p>
                <Icon className="h-8 w-8 text-[#00E5FF]" strokeWidth={1.75} />
                <h3 className="mt-4 font-heading text-xl font-extrabold sm:text-2xl">{step.title}</h3>
                <p className="section-body mt-2">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
