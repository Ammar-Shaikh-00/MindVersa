"use client";

import { useEffect, useState } from "react";

export function BlogProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const value = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[100] h-1 w-full bg-white/10">
      <div className="h-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]" style={{ width: `${progress}%` }} />
    </div>
  );
}
