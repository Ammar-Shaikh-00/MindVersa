"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const springX = useSpring(0, { stiffness: 350, damping: 30 });
  const springY = useSpring(0, { stiffness: 350, damping: 30 });

  useEffect(() => {
    const updateCursor = (event: MouseEvent) => {
      setIsVisible(true);
      springX.set(event.clientX);
      springY.set(event.clientY);
    };

    const updateHoverState = () => {
      const active = document.activeElement;
      const hovered = document.querySelector(":hover");
      const selector = "a, button, [role='button'], input, textarea, select";
      const hoveringInteractive = Boolean(hovered?.closest(selector));
      const focusedInteractive =
        active instanceof HTMLElement && Boolean(active.closest(selector));
      setIsHovering(hoveringInteractive || focusedInteractive);
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseover", updateHoverState);
    window.addEventListener("focusin", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseover", updateHoverState);
      window.removeEventListener("focusin", updateHoverState);
    };
  }, [springX, springY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] h-2 w-2 rounded-full bg-[#00E5FF] shadow-[0_0_16px_#00E5FF]"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[119] rounded-full border border-[#00E5FF]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          backgroundColor: isHovering ? "rgba(0, 229, 255, 0.2)" : "transparent",
          boxShadow: isHovering ? "0 0 26px rgba(0, 229, 255, 0.45)" : "none",
        }}
      />
    </>
  );
}
