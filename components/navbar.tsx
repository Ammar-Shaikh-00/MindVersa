"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#results", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#services");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = links
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.2 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "sticky top-0 z-[90] border-b border-white/6 transition-all duration-200",
        scrolled ? "bg-[rgba(5,7,15,0.85)] backdrop-blur-[20px]" : "bg-transparent",
      )}
    >
      <nav className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto] items-center px-4 md:grid-cols-[220px_1fr_220px] md:px-8">
        <Link href="/" className="justify-self-start font-heading text-[20px] font-extrabold tracking-tight">
          <span className="text-[#F0F4FF]">Nexor</span>
          <span className="text-[#00E5FF]">AI</span>
        </Link>
        <div className="hidden items-center justify-center gap-7 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-sans text-[14px] font-medium text-[#8892A4] transition-colors duration-200 hover:text-[#F0F4FF]",
                active === item.href && "text-[#00E5FF]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button
          aria-label="Toggle menu"
          className="justify-self-end rounded-md border border-white/15 p-2 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <div className="hidden justify-self-end md:block">
          <Link
            href="#contact"
            className="rounded-[8px] border border-white/15 bg-transparent px-5 py-2.5 font-sans text-[14px] font-medium text-[#F0F4FF] transition-all duration-200 hover:border-[#00E5FF] hover:bg-[rgba(0,229,255,0.05)] hover:text-[#00E5FF]"
          >
            Get Free Audit
          </Link>
        </div>
      </nav>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 top-16 z-[95] flex flex-col items-center justify-center gap-6 bg-[#05070F]/95 backdrop-blur-2xl sm:top-20 md:hidden"
        >
          {links.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.06 }}
            >
              <Link
                href={item.href}
                className="text-2xl font-bold text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </motion.header>
  );
}
