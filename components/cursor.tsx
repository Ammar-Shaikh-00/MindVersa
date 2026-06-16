"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const CHAIN_LENGTH = 26;
const SEGMENT_LERP = 0.24;

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(hoverCapable);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = { x: -100, y: -100 };
    const chain: Point[] = Array.from({ length: CHAIN_LENGTH }, () => ({ x: -100, y: -100 }));
    let active = false;
    let rafId = 0;

    const initChain = (x: number, y: number) => {
      for (const point of chain) {
        point.x = x;
        point.y = y;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawLine = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const head = chain[0];
      const tail = chain[chain.length - 1];

      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);

      for (let i = chain.length - 2; i > 0; i -= 1) {
        const xc = (chain[i].x + chain[i + 1].x) * 0.5;
        const yc = (chain[i].y + chain[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(chain[i + 1].x, chain[i + 1].y, xc, yc);
      }

      ctx.quadraticCurveTo(chain[1].x, chain[1].y, head.x, head.y);

      const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      gradient.addColorStop(0, "rgba(0, 229, 255, 0)");
      gradient.addColorStop(0.3, "rgba(0, 229, 255, 0.08)");
      gradient.addColorStop(0.65, "rgba(123, 97, 255, 0.32)");
      gradient.addColorStop(1, "rgba(0, 229, 255, 0.5)");

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 8;
      ctx.shadowBlur = 16;
      ctx.shadowColor = "rgba(0, 229, 255, 0.45)";
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.lineWidth = 2;
      ctx.strokeStyle = gradient;
      ctx.stroke();
    };

    const moveDot = (x: number, y: number) => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      if (!active) initChain(e.clientX, e.clientY);
      pos.x = e.clientX;
      pos.y = e.clientY;
      moveDot(pos.x, pos.y);
      active = true;
      dot.classList.add("is-active");
      canvas.classList.add("is-active");
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [data-hover], input, textarea, select, label, summary, [role='button']",
      );
      dot.classList.toggle("is-hover", !!interactive);
    };

    const onLeave = () => {
      active = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      dot.classList.remove("is-active", "is-hover");
      canvas.classList.remove("is-active");
    };

    const tick = () => {
      if (active) {
        chain[0].x = pos.x;
        chain[0].y = pos.y;

        for (let i = 1; i < chain.length; i += 1) {
          chain[i].x += (chain[i - 1].x - chain[i].x) * SEGMENT_LERP;
          chain[i].y += (chain[i - 1].y - chain[i].y) * SEGMENT_LERP;
        }

        drawLine();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={canvasRef} className="custom-cursor-trail" aria-hidden />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden>
        <span className="custom-cursor-glow" aria-hidden />
        <span className="custom-cursor-core" aria-hidden />
      </div>
    </>
  );
}
