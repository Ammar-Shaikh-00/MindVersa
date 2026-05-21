"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, sectionHref } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#results");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .filter((item) => item.hash)
      .map((item) => document.querySelector(item.hash))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.2 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isHome || !window.location.hash) return;

    const scrollToHash = () => {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveHash(window.location.hash);
      }
    };

    const frame = requestAnimationFrame(scrollToHash);
    return () => cancelAnimationFrame(frame);
  }, [isHome, pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  const closeMenu = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "sticky top-0 z-[90] h-16 border-b border-white/[0.06] transition-all duration-200",
        scrolled ? "bg-[rgba(5,7,15,0.85)] backdrop-blur-[20px]" : "bg-transparent",
      )}
    >
      <nav className="site-container grid h-16 grid-cols-[1fr_auto] items-center md:grid-cols-[200px_1fr_200px]">
        <Link href="/" className="justify-self-start font-heading text-[20px] font-extrabold tracking-tight">
          <span className="text-[#F0F4FF]">Nexor</span>
          <span className="text-[#00E5FF]">AI</span>
        </Link>
        <motion.div className="hidden items-center justify-center gap-6 lg:gap-7 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-sans text-[14px] font-medium text-[#8892A4] transition-colors duration-200 hover:text-[#F0F4FF]",
                isHome && item.hash && activeHash === item.hash && "text-[#00E5FF]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="justify-self-end rounded-[8px] border border-white/15 p-2 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <motion.div className="hidden justify-self-end md:block">
          <Link
            href={sectionHref("contact")}
            className="rounded-[8px] border border-white/15 bg-transparent px-5 py-2.5 font-sans text-[14px] font-medium text-[#F0F4FF] transition-all duration-200 hover:border-[#00E5FF] hover:bg-[rgba(0,229,255,0.05)] hover:text-[#00E5FF]"
          >
            Get Free Audit
          </Link>
        </motion.div>
      </nav>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 top-16 z-[95] flex flex-col items-center justify-center gap-6 bg-[#05070F]/98 backdrop-blur-2xl md:hidden"
        >
          {navLinks.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.06 }}
            >
              <Link href={item.href} className="text-2xl font-bold text-white" onClick={closeMenu}>
                {item.label}
              </Link>
            </motion.div>
          ))}
          <Link href={sectionHref("contact")} className="btn-primary mt-4" onClick={closeMenu}>
            Get Free Audit
          </Link>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
