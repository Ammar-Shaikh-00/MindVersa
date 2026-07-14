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
          {/* Keep pulses readable without lighting up the whole hero */}
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
          {/* Soft base lattice (static) — edges + corners, fades under center copy */}
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

          {/* Traveling neon pulses */}
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

          {/* Network nodes */}
          <g className="hero-network-nodes">
            <circle className="network-node network-node-glow" cx="880" cy="180" r="3.5" fill="#00E5FF" opacity="0.85" style={{ animationDelay: "0s" }} />
            <circle className="network-node network-node-glow" cx="1100" cy="340" r="3" fill="#7B61FF" opacity="0.8" style={{ animationDelay: "1s" }} />
            <circle className="network-node network-node-glow" cx="180" cy="200" r="3.5" fill="#00E5FF" opacity="0.8" style={{ animationDelay: "2s" }} />
            <circle className="network-node network-node-glow" cx="940" cy="550" r="3" fill="#7B61FF" opacity="0.75" style={{ animationDelay: "1.5s" }} />
            <circle className="network-node" cx="1040" cy="120" r="2.5" fill="rgba(0,229,255,0.55)" />
            <circle className="network-node" cx="220" cy="420" r="2.5" fill="rgba(123,97,255,0.5)" />
            <circle className="network-node" cx="1160" cy="450" r="2" fill="rgba(0,229,255,0.45)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
