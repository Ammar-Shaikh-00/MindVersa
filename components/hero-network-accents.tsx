type OrbTone = "cyan" | "violet";

function NetworkOrb({
  cx,
  cy,
  r = 7,
  tone = "cyan",
  pulse = false,
  delay = "0s",
}: {
  cx: number;
  cy: number;
  r?: number;
  tone?: OrbTone;
  pulse?: boolean;
  delay?: string;
}) {
  const fill = tone === "cyan" ? "url(#orb-core-cyan)" : "url(#orb-core-violet)";
  const glow = tone === "cyan" ? "url(#orb-aura-cyan)" : "url(#orb-aura-violet)";
  const rim = tone === "cyan" ? "rgba(180, 245, 255, 0.55)" : "rgba(210, 195, 255, 0.5)";

  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g
        className={pulse ? "network-orb network-orb-pulse" : "network-orb"}
        style={pulse ? { animationDelay: delay } : undefined}
      >
        {/* Soft ambient aura */}
        <circle r={r * 2.4} fill={glow} opacity="0.9" />
        {/* Depth shadow under the orb */}
        <ellipse
          cx={0.4}
          cy={r * 0.55}
          rx={r * 0.85}
          ry={r * 0.35}
          fill="rgba(0,0,0,0.45)"
          filter="url(#orb-blur-soft)"
        />
        {/* Sphere body */}
        <circle r={r} fill={fill} />
        {/* Rim light */}
        <circle r={r * 0.92} fill="none" stroke={rim} strokeWidth={0.6} opacity="0.65" />
        {/* Specular highlight */}
        <circle
          cx={-r * 0.28}
          cy={-r * 0.32}
          r={r * 0.32}
          fill="url(#orb-highlight)"
        />
        {/* Tiny glass chip */}
        <circle
          cx={-r * 0.42}
          cy={-r * 0.45}
          r={r * 0.12}
          fill="rgba(255,255,255,0.9)"
        />
      </g>
    </g>
  );
}

/** Decorative SVG neon network accents for the hero — CSS/SVG only, no JS. */
export function HeroNetworkAccents() {
  return (
    <div className="hero-network-accents" aria-hidden>
      <div className="neon-beam" />

      <svg
        className="hero-network-svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="neon-gradient-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
            <stop offset="45%" stopColor="#00E5FF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="neon-gradient-violet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B61FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#7B61FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="orb-core-cyan" cx="32%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#E7FFFF" />
            <stop offset="28%" stopColor="#5CF0FF" />
            <stop offset="62%" stopColor="#00B8D4" />
            <stop offset="100%" stopColor="#045A6E" />
          </radialGradient>
          <radialGradient id="orb-core-violet" cx="32%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#F3ECFF" />
            <stop offset="28%" stopColor="#B39BFF" />
            <stop offset="62%" stopColor="#7B61FF" />
            <stop offset="100%" stopColor="#2A1A6E" />
          </radialGradient>
          <radialGradient id="orb-aura-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#00E5FF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-aura-violet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#7B61FF" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-highlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <filter id="orb-blur-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>

          <radialGradient id="hero-edge-fade" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="1" />
          </radialGradient>
          <mask id="hero-network-mask">
            <rect width="1200" height="800" fill="url(#hero-edge-fade)" />
          </mask>
        </defs>

        <g mask="url(#hero-network-mask)">
          <g className="hero-network-base" fill="none" strokeWidth="1.1">
            <path d="M40 120 L180 200 L80 340 L220 420" stroke="rgba(0,229,255,0.22)" />
            <path d="M60 520 L200 460 L140 640 L280 700" stroke="rgba(123,97,255,0.18)" />
            <path d="M720 100 L880 180 L1040 120 L1160 240" stroke="rgba(0,229,255,0.24)" />
            <path d="M740 300 L920 250 L1100 340 L1180 280" stroke="rgba(123,97,255,0.2)" />
            <path d="M700 460 L880 400 L1040 520 L1160 450" stroke="rgba(0,229,255,0.2)" />
            <path d="M760 600 L940 550 L1100 680 L1180 600" stroke="rgba(123,97,255,0.18)" />
            <path d="M880 180 L920 250 L880 400 L940 550" stroke="rgba(0,229,255,0.16)" />
            <path d="M180 200 L120 400 L200 460" stroke="rgba(123,97,255,0.14)" />
          </g>

          <g className="hero-neon-pulses" fill="none" strokeWidth="2" strokeLinecap="round">
            <path
              className="hero-neon-pulse"
              d="M720 100 L880 180 L1040 120 L1160 240"
              stroke="url(#neon-gradient-cyan)"
              strokeDasharray="10 280"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-290"
                dur="3.8s"
                begin="0s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </path>

            <path
              className="hero-neon-pulse"
              d="M740 300 L920 250 L1100 340 L1180 280"
              stroke="url(#neon-gradient-violet)"
              strokeDasharray="10 280"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-290"
                dur="4.2s"
                begin="0.8s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </path>

            <path
              className="hero-neon-pulse"
              d="M700 460 L880 400 L1040 520 L1160 450"
              stroke="url(#neon-gradient-cyan)"
              strokeDasharray="10 280"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-290"
                dur="4s"
                begin="1.6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </path>

            <path
              className="hero-neon-pulse"
              d="M40 120 L180 200 L80 340 L220 420"
              stroke="url(#neon-gradient-violet)"
              strokeDasharray="10 280"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-290"
                dur="4.4s"
                begin="2.4s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </path>

            <path
              className="hero-neon-pulse"
              d="M880 180 L920 250 L880 400 L940 550"
              stroke="url(#neon-gradient-cyan)"
              strokeDasharray="10 280"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-290"
                dur="4.8s"
                begin="3.2s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </path>
          </g>

          <g className="hero-network-nodes">
            <NetworkOrb cx={880} cy={180} r={8} tone="cyan" pulse delay="0s" />
            <NetworkOrb cx={1100} cy={340} r={7} tone="violet" pulse delay="1s" />
            <NetworkOrb cx={180} cy={200} r={8} tone="cyan" pulse delay="2s" />
            <NetworkOrb cx={940} cy={550} r={7.5} tone="violet" pulse delay="1.5s" />
            <NetworkOrb cx={1040} cy={120} r={5} tone="cyan" />
            <NetworkOrb cx={220} cy={420} r={5} tone="violet" />
            <NetworkOrb cx={1160} cy={450} r={4.5} tone="cyan" />
          </g>
        </g>
      </svg>
    </div>
  );
}
