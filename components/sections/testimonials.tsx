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
] as const;

function getTestimonialCards(track: HTMLDivElement) {
  return Array.from(track.querySelectorAll<HTMLElement>("[data-testimonial-card]"));
}

function scrollTrackToIndex(track: HTMLDivElement, index: number) {
  const cards = getTestimonialCards(track);
  if (!cards.length) return 0;

  const normalized = ((index % cards.length) + cards.length) % cards.length;
  const card = cards[normalized];
  const paddingLeft = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;

  track.scrollTo({
    left: Math.max(0, card.offsetLeft - paddingLeft),
    behavior: "smooth",
  });

  return normalized;
}

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
}: {
  item: (typeof TESTIMONIALS)[number];
}) {
  return (
    <article
      data-testimonial-card
      className="relative flex w-[min(85vw,400px)] shrink-0 grow-0 snap-center flex-col rounded-2xl border border-white/[0.08] bg-[var(--bg-elevated)] p-7 md:w-[400px] md:snap-start md:p-8"
      style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.22)" }}
    >
      <span
        className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl"
        style={{
          background: `linear-gradient(180deg, ${item.accent}, transparent 88%)`,
        }}
        aria-hidden
      />

      <StarRating />

      <blockquote className="mt-5 flex-1 text-[15px] leading-[1.75] text-[var(--text-secondary)]">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <footer className="mt-6 border-t border-white/[0.06] pt-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 font-display text-sm font-bold text-[var(--text-primary)]"
            style={{
              background: `color-mix(in srgb, ${item.accent} 14%, var(--bg-primary))`,
            }}
          >
            {item.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-[var(--text-primary)]">
              {item.name}
            </p>
            <p className="mt-0.5 text-[13px] leading-snug text-[var(--text-secondary)]">
              {item.title} · {item.company}
            </p>
            <p className="text-[12px] text-[var(--text-muted)]">{item.location}</p>
          </div>
        </div>
      </footer>
    </article>
  );
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const normalized = scrollTrackToIndex(track, index);
    setActive(normalized);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    track.setPointerCapture(event.pointerId);
    setPaused(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;

    const delta = event.clientX - dragRef.current.startX;
    track.scrollLeft = dragRef.current.scrollLeft - delta;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;

    dragRef.current.active = false;
    track.releasePointerCapture(event.pointerId);
    setPaused(false);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = getTestimonialCards(track);
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const distance = Math.abs(cardCenter - center);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = index;
          }
        });

        setActive(closest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      setActive((current) => {
        const next = (current + 1) % TESTIMONIALS.length;
        const normalized = scrollTrackToIndex(track, next);
        return normalized;
      });
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused]);

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
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            if (!dragRef.current.active) setPaused(false);
          }}
          className="no-scrollbar flex w-full min-w-0 cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-2 active:cursor-grabbing md:gap-6 md:px-8 lg:px-[max(32px,calc((100vw-1200px)/2+32px))]"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollPaddingInline: "24px",
            touchAction: "pan-x",
          }}
        >
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
          <div className="w-4 shrink-0 sm:w-6" aria-hidden />
        </div>
      </div>

      <div className="container-x mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => goTo(active - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[var(--text-secondary)] transition-colors hover:border-white/20 hover:text-[var(--text-primary)]"
        >
          ←
        </button>

        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show testimonial ${index + 1}`}
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
          onClick={() => goTo(active + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[var(--text-secondary)] transition-colors hover:border-white/20 hover:text-[var(--text-primary)]"
        >
          →
        </button>
      </div>
    </section>
  );
}
