"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/faq";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container-x" style={{ maxWidth: 800 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-header section-header--center"
        >
          <span className="label-eyebrow">FAQ</span>
          <h2 className="h2-section">Common Questions</h2>
          <p className="section-subtitle">
            Practical answers about hiring an ML partner, chatbots, data quality, security, and model performance.
          </p>
        </motion.div>

        <div className="mt-12 space-y-2">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl transition-colors duration-200"
                style={{
                  border: `1px solid ${isOpen ? "rgba(0,229,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                  background: isOpen ? "var(--bg-elevated)" : "transparent",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  data-hover
                  className="faq-question-btn flex w-full items-center justify-between gap-3 text-left transition-colors sm:gap-4"
                  style={{
                    padding: "18px 16px",
                    fontFamily: "var(--font-heading), sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: isOpen ? "var(--accent-cyan)" : "var(--text-primary)",
                  }}
                >
                  <span>{item.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 220ms ease",
                      flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div
                        className="px-6 pb-6 text-[16px]"
                        style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
