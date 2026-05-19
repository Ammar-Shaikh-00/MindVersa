"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function StickyAuditBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-[#05070F]/92 px-4 py-3 backdrop-blur-xl md:bottom-6 md:left-1/2 md:right-auto md:w-full md:max-w-xl md:-translate-x-1/2 md:rounded-2xl md:border md:shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
      )}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 md:max-w-none">
        <p className="hidden text-sm text-[#8892A4] sm:block">
          <span className="font-semibold text-[#F0F4FF]">Free AI audit</span> — roadmap in 48 hours.
        </p>
        <Link href="#contact" className="btn-primary shrink-0 px-5 py-3 text-sm sm:px-6 sm:text-base">
          Get audit
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          className="shrink-0 rounded-lg border border-white/10 p-2 text-[#8892A4] hover:text-[#F0F4FF]"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
