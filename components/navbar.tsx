"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/logo";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#results", label: "Results" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{
          background: scrolled ? "rgba(5,7,15,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "background 220ms ease, border-color 220ms ease",
        }}
      >
        <div className="container-x flex h-full items-center justify-between">
          <Logo size="sm" className="md:hidden" />
          <Logo size="md" className="hidden md:inline-flex" />

          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[14px] font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary xl:text-[15px]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            className="hidden md:inline-flex items-center rounded-lg border border-[rgba(255,255,255,0.15)] px-4 py-2 text-[14px] font-semibold text-text-primary transition-all duration-200 hover:border-accent-cyan hover:text-accent-cyan hover:bg-[rgba(0,229,255,0.05)] lg:px-5 lg:py-2.5 lg:text-[15px]"
          >
            Get Free Audit
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            data-hover
            className="lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className="block h-[2px] w-[18px] bg-text-primary transition-transform duration-300"
              style={{ transform: open ? "rotate(45deg) translate(4px,4px)" : "none" }}
            />
            <span
              className="block h-[2px] w-[18px] bg-text-primary transition-transform duration-300"
              style={{ transform: open ? "rotate(-45deg) translate(4px,-4px)" : "none" }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background: "rgba(5,7,15,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <nav className="flex h-full flex-col items-center justify-center gap-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-[28px] font-bold text-text-primary"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: LINKS.length * 0.06 }}
                className="mt-4"
              >
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary"
                >
                  Get Free Audit
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
