"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Mark Davies",
    title: "CTO",
    company: "IndustrialEdge",
    location: "United Kingdom",
    initials: "MD",
    accent: "#00E5FF",
    quote:
      "The computer vision system replaced three full-time QA inspectors and catches defects our team was missing. ROI was positive within six weeks.",
  },
  {
    name: "Jessica Liu",
    title: "Head of Risk",
    company: "PaySafe",
    location: "United States",
    initials: "JL",
    accent: "#7B61FF",
    quote:
      "They built our fraud detection model from scratch — data cleaning, feature engineering, training, and API deployment. Genuinely impressed by the technical depth.",
  },
  {
    name: "Khalid Al-Mansoori",
    title: "COO",
    company: "RetailFirst",
    location: "United Arab Emirates",
    initials: "KA",
    accent: "#FF6B35",
    quote:
      "Demand forecasting is now accurate to 94%. We reduced overstock by 89% and freed working capital we did not know we were losing.",
  },
  {
    name: "Emma Clarke",
    title: "CMO",
    company: "Vibe Agency",
    location: "Australia",
    initials: "EC",
    accent: "#10B981",
    quote:
      "Not just coders — actual AI engineers who understand the business problem first. The NLP pipeline processes 10,000 customer reviews overnight.",
  },
  {
    name: "Sarah Mitchell",
    title: "Founder",
    company: "CloudDesk",
    location: "United States",
    initials: "SM",
    accent: "#7B61FF",
    quote:
      "Their workflow automation connected our CRM, billing, and support stack end to end. We cut 26 hours of manual work per employee each week within the first month.",
  },
  {
    name: "Omar Farooq",
    title: "Operations Lead",
    company: "Karachi Freight Co.",
    location: "Pakistan",
    initials: "OF",
    accent: "#00E5FF",
    quote:
      "We were drowning in WhatsApp updates and Excel sheets. They hooked our dispatch board to live tracking — drivers hate fewer phone calls, which is how I know it worked.",
  },
  {
    name: "Priya Nair",
    title: "Product Manager",
    company: "Hearthline Health",
    location: "Canada",
    initials: "PN",
    accent: "#FF6B35",
    quote:
      "Honestly I expected a demo that never shipped. We got a working intake triage assistant in production, and our nurses stopped asking me when the pilot would end.",
  },
] as const;

const GAP_PX = 24;

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FFB800" aria-hidden>
          <path d="M7 1.2l1.55 3.14 3.47.5-2.51 2.45.59 3.45L7 9.35 3.9 10.74l.59-3.45L2 4.84l3.47-.5L7 1.2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  height,
}: {
  item: (typeof TESTIMONIALS)[number];
  height: number;
}) {
  return (
    <article
      data-testimonial-card
      className="relative w-[min(85vw,400px)] shrink-0 grow-0 rounded-2xl border border-white/[0.08] bg-[var(--bg-elevated)] p-7 md:w-[400px] md:p-8"
      style={{
        boxShadow: "0 16px 40px rgba(0,0,0,0.22)",
        display: "flex",
        flexDirection: "column",
        height,
        minHeight: 340,
      }}
    >
      <span
        className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl"
        style={{
          background: `linear-gradient(180deg, ${item.accent}, transparent 88%)`,
        }}
        aria-hidden
      />

      <div style={{ flex: "0 0 auto" }}>
        <StarRating />
      </div>

      <blockquote
        className="m-0 text-left text-[16px] text-[var(--text-secondary)]"
        style={{
          flex: "1 1 auto",
          marginTop: 20,
          lineHeight: 1.75,
        }}
      >
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <footer
        className="border-t border-white/[0.06]"
        style={{ flex: "0 0 auto", marginTop: 24, paddingTop: 20 }}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 font-sans text-[13px] font-semibold tracking-[0.02em] text-[var(--text-primary)]"
            style={{
              background: `color-mix(in srgb, ${item.accent} 14%, var(--bg-primary))`,
              lineHeight: 1,
            }}
          >
            <span className="block translate-y-px leading-none">{item.initials}</span>
          </div>
          <div className="min-w-0 text-left">
            <p className="m-0 truncate text-[15px] font-semibold leading-[1.25] text-[var(--text-primary)]">
              {item.name}
            </p>
            <p className="m-0 mt-1 truncate text-[13px] leading-[1.3] text-[var(--text-secondary)]">
              {item.title} · {item.company}
            </p>
            <p className="m-0 mt-1 text-[12px] leading-[1.3] text-[var(--text-muted)]">
              {item.location}
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
}

export function TestimonialsSection() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    originOffset: 0,
  });
  const wheelLockRef = useRef(false);
  const activeRef = useRef(0);
  const maxIndexRef = useRef(0);
  const metricsRef = useRef({ step: 424, maxOffset: 0 });

  const [active, setActive] = useState(0);
  const [step, setStep] = useState(424);
  const [maxOffset, setMaxOffset] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(340);
  const [dragOffset, setDragOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [instant, setInstant] = useState(false);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-testimonial-card]"));
    if (!cards.length) return;

    // Measure natural content height, then equalize so footers line up.
    cards.forEach((card) => {
      card.style.height = "auto";
    });
    let tallest = 340;
    for (const card of cards) {
      tallest = Math.max(tallest, Math.ceil(card.getBoundingClientRect().height));
    }
    cards.forEach((card) => {
      card.style.height = `${tallest}px`;
    });
    setCardHeight(tallest);

    const cardWidth = cards[0].getBoundingClientRect().width;
    const nextStep = cardWidth + GAP_PX;
    const trackWidth =
      cards.length * cardWidth + Math.max(0, cards.length - 1) * GAP_PX;
    const styles = getComputedStyle(viewport);
    const padX =
      (Number.parseFloat(styles.paddingLeft) || 0) +
      (Number.parseFloat(styles.paddingRight) || 0);
    const innerWidth = Math.max(0, viewport.clientWidth - padX);
    const nextMaxOffset = Math.max(0, trackWidth - innerWidth);
    const nextMaxIndex =
      nextMaxOffset <= 0 ? 0 : Math.ceil(nextMaxOffset / nextStep - 1e-6);

    metricsRef.current = { step: nextStep, maxOffset: nextMaxOffset };
    maxIndexRef.current = nextMaxIndex;
    setStep(nextStep);
    setMaxOffset(nextMaxOffset);
    setMaxIndex(nextMaxIndex);

    if (activeRef.current > nextMaxIndex) {
      activeRef.current = nextMaxIndex;
      setActive(nextMaxIndex);
    }
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => measure());
    const viewport = viewportRef.current;
    const observer = viewport ? new ResizeObserver(() => measure()) : null;
    if (viewport && observer) observer.observe(viewport);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(id);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const clampIndex = useCallback((index: number) => {
    const max = maxIndexRef.current;
    if (max <= 0) return 0;
    if (index < 0) return max;
    if (index > max) return 0;
    return index;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const next = clampIndex(index);
      activeRef.current = next;
      setDragOffset(0);
      setActive(next);
    },
    [clampIndex],
  );

  const goNext = useCallback(() => goTo(activeRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(activeRef.current - 1), [goTo]);

  const offsetForIndex = useCallback(
    (index: number) => Math.min(index * step, maxOffset),
    [step, maxOffset],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      originOffset: dragOffset,
    };
    viewport.setPointerCapture(event.pointerId);
    setPaused(true);
    setInstant(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 6) dragRef.current.moved = true;
    setDragOffset(dragRef.current.originOffset + delta);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const viewport = viewportRef.current;
    const didMove = dragRef.current.moved;
    const delta = event.clientX - dragRef.current.startX;

    dragRef.current.active = false;
    dragRef.current.moved = false;

    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    setInstant(false);

    if (!didMove) {
      setDragOffset(0);
      setPaused(false);
      return;
    }

    const { step: s } = metricsRef.current;
    const threshold = Math.min(80, s * 0.2);
    if (delta <= -threshold) {
      goTo(activeRef.current + 1);
    } else if (delta >= threshold) {
      goTo(activeRef.current - 1);
    } else {
      setDragOffset(0);
    }
    setPaused(false);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (event: WheelEvent) => {
      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      const delta = absX > absY ? event.deltaX : event.deltaY;
      if (delta === 0) return;

      event.preventDefault();
      if (wheelLockRef.current) return;

      wheelLockRef.current = true;
      setPaused(true);

      if (delta > 0) goTo(activeRef.current + 1);
      else goTo(activeRef.current - 1);

      window.setTimeout(() => {
        wheelLockRef.current = false;
        setPaused(false);
      }, 560);
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [goTo]);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      goTo(activeRef.current + 1);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused, goTo]);

  const translateX = -offsetForIndex(active) + dragOffset;
  const stopCount = maxIndex + 1;

  return (
    <section id="testimonials" className="section bg-[var(--bg-surface)]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-header section-header--left"
        >
          <span className="label-eyebrow">TESTIMONIALS</span>
          <h2 className="h2-section">What Clients Say</h2>
          <p className="section-subtitle">
            Feedback from engineering leaders after real-world deployments.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-12 w-full max-w-[100vw] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--bg-surface)] to-transparent md:w-20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--bg-surface)] to-transparent md:w-20"
          aria-hidden
        />

        <div
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            if (!dragRef.current.active) {
              setDragOffset(0);
              setPaused(false);
            }
          }}
          className="relative w-full cursor-grab overflow-hidden px-6 pb-2 active:cursor-grabbing md:px-8 lg:px-[max(32px,calc((100vw-1200px)/2+32px))]"
          style={{ touchAction: "none" }}
        >
          <div
            ref={trackRef}
            className="flex items-stretch will-change-transform"
            style={{
              gap: GAP_PX,
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: instant ? "none" : "transform 550ms cubic-bezier(0.25, 0.8, 0.25, 1)",
            }}
          >
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={item.name} item={item} height={cardHeight} />
            ))}
          </div>
        </div>
      </div>

      <div className="container-x mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={goPrev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[var(--text-secondary)] transition-colors hover:border-white/20 hover:text-[var(--text-primary)]"
        >
          ←
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: stopCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show testimonial set ${index + 1}`}
              aria-current={active === index}
              onClick={() => goTo(index)}
              className="relative flex h-2 items-center justify-center rounded-full transition-colors duration-200"
              style={{ width: active === index ? 28 : 8 }}
            >
              {active === index ? (
                <motion.span
                  layoutId="testimonial-dot"
                  className="block h-2 w-full rounded-full bg-[var(--accent-cyan)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : (
                <span className="block h-2 w-2 rounded-full bg-white/20" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={goNext}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[var(--text-secondary)] transition-colors hover:border-white/20 hover:text-[var(--text-primary)]"
        >
          →
        </button>
      </div>
    </section>
  );
}
