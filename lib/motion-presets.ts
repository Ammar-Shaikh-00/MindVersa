/** Shared motion timing — cubic-bezier approximates ease-out-expo for premium UI. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
} as const;

export const staggerContainer = (stagger = 0.08, delayChildren = 0) =>
  ({
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren },
    },
  }) as const;

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
} as const;
