import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: { mark: 26, text: 16, gap: 10 },
  md: { mark: 30, text: 18, gap: 11 },
  lg: { mark: 34, text: 21, gap: 12 },
} as const;

/**
 * MindVersa mark — core (Mind) + orbit (Versa).
 * Abstract intelligence symbol, not a letter monogram.
 */
export function LogoMark({ size = 30 }: { size?: number }) {
  const uid = `mv-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${uid}-ring`} x1="8" y1="10" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E5FF" />
          <stop offset="1" stopColor="#7B61FF" />
        </linearGradient>
        <radialGradient id={`${uid}-core`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) scale(5.5)">
          <stop stopColor="#00E5FF" />
          <stop offset="1" stopColor="#5EE7FF" stopOpacity="0.7" />
        </radialGradient>
      </defs>

      {/* Soft plate */}
      <rect x="1.25" y="1.25" width="37.5" height="37.5" rx="11" fill="#0B0F1A" />
      <rect
        x="1.25"
        y="1.25"
        width="37.5"
        height="37.5"
        rx="11"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1"
      />

      {/* Versa — orbital ring (tilted ellipse) */}
      <ellipse
        cx="20"
        cy="20"
        rx="11.5"
        ry="7.2"
        transform="rotate(-28 20 20)"
        stroke={`url(#${uid}-ring)`}
        strokeWidth="1.85"
        strokeLinecap="round"
        opacity="0.95"
      />

      {/* Secondary path — depth / range */}
      <ellipse
        cx="20"
        cy="20"
        rx="7.2"
        ry="11.5"
        transform="rotate(-28 20 20)"
        stroke="rgba(123,97,255,0.45)"
        strokeWidth="1.25"
        strokeDasharray="2.5 3.5"
        opacity="0.9"
      />

      {/* Mind — core */}
      <circle cx="20" cy="20" r="4.2" fill={`url(#${uid}-core)`} />
      <circle cx="20" cy="20" r="4.2" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" />

      {/* Active node on orbit */}
      <circle cx="28.6" cy="14.2" r="2.15" fill="#F0F4FF" />
      <circle cx="28.6" cy="14.2" r="2.15" stroke="#00E5FF" strokeWidth="1.1" />
    </svg>
  );
}

export function Logo({ href = "/", size = "md", className = "" }: LogoProps) {
  const s = SIZES[size];

  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center", className)}
      style={{ gap: s.gap }}
      aria-label="MindVersa home"
    >
      <span className="relative shrink-0 transition-transform duration-200 group-hover:scale-[1.03]">
        <LogoMark size={s.mark} />
      </span>

      <span
        className="font-display font-bold"
        style={{
          fontSize: s.text,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "var(--text-primary)",
        }}
      >
        MindVersa
      </span>
    </Link>
  );
}
