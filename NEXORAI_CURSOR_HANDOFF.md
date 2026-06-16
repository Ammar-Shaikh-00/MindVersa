# NexorAI — Complete Cursor Handoff Document
**Project:** nexorai.io — Global AI Automation Agency Website  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · GSAP · React Three Fiber  
**Last Updated:** 2025  

> **How to use this file:** Open Cursor, press `Ctrl+L`, paste any section below prefixed with "Using the NexorAI handoff doc:" and Cursor will have full context to build/fix exactly what you need.

---

## 📁 COMPLETE FILE STRUCTURE

```
nexorai/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, metadata, cursor, noise
│   ├── page.tsx                    # Homepage (imports all sections)
│   ├── globals.css                 # CSS variables, base styles, marquee, scrollbar
│   ├── blog/
│   │   ├── page.tsx                # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx            # Blog post template
│   └── api/
│       ├── contact/
│       │   └── route.ts            # Contact form → Resend + Supabase
│       └── audit/
│           └── route.ts            # Email capture → Resend + Supabase
├── components/
│   ├── cursor.tsx                  # Custom animated cursor
│   ├── noise.tsx                   # SVG noise overlay
│   ├── navbar.tsx                  # Sticky navbar with scroll behavior
│   ├── footer.tsx                  # Footer with links + socials
│   ├── three-hero.tsx              # React Three Fiber particle canvas
│   ├── sections/
│   │   ├── hero.tsx                # Section 1 — Hero
│   │   ├── marquee.tsx             # Section 2 — Infinite marquee
│   │   ├── services.tsx            # Section 3 — Bento grid services
│   │   ├── process.tsx             # Section 4 — Horizontal scroll steps
│   │   ├── results.tsx             # Section 5 — Case studies + metrics
│   │   ├── tech-stack.tsx          # Section 6 — Tech logos strip
│   │   ├── pricing.tsx             # Section 7 — 3 tier pricing
│   │   ├── testimonials.tsx        # Section 8 — Drag carousel
│   │   ├── faq.tsx                 # Section 9 — Accordion
│   │   ├── cta-banner.tsx          # Section 10 — Email capture CTA
│   │   └── contact.tsx             # Section 11 — Contact form
│   └── ui/                         # shadcn/ui components (auto-generated)
├── lib/
│   ├── supabase.ts                 # Supabase client
│   ├── resend.ts                   # Resend email client
│   ├── validations.ts              # Zod schemas
│   └── utils.ts                    # cn() helper + misc utils
├── public/
│   └── images/                     # Static images
├── styles/
│   └── fonts.ts                    # next/font/google config
├── .env.local                      # Environment variables (never commit)
├── next.config.ts                  # Next.js config
├── tailwind.config.ts              # Full design system tokens
├── next-sitemap.config.js          # Sitemap + robots.txt
└── tsconfig.json                   # TypeScript strict config
```

---

## 🎨 DESIGN SYSTEM

### Colors (defined in tailwind.config.ts AND globals.css)

```typescript
// tailwind.config.ts
colors: {
  'bg-primary':   '#05070F',   // Page background
  'bg-surface':   '#0B0E1A',   // Alternating sections
  'bg-elevated':  '#101422',   // Cards, inputs
  'accent-cyan':  '#00E5FF',   // Primary accent — CTA, highlights
  'accent-violet':'#7B61FF',   // Secondary accent — gradients
  'accent-orange':'#FF6B35',   // Highlight — badges, warnings
  'success':      '#10B981',   // Success states
  'text-primary': '#F0F4FF',   // Headings, primary text
  'text-secondary':'#8892A4',  // Body text, descriptions
  'text-tertiary': '#4A5568',  // Muted, placeholders
  'border-subtle': 'rgba(255,255,255,0.06)',  // Card borders at rest
  'border-default':'rgba(255,255,255,0.10)',  // Card borders on hover
}
```

```css
/* globals.css */
:root {
  --bg-primary:    #05070F;
  --bg-surface:    #0B0E1A;
  --bg-elevated:   #101422;
  --accent-cyan:   #00E5FF;
  --accent-violet: #7B61FF;
  --accent-orange: #FF6B35;
  --success:       #10B981;
  --text-primary:  #F0F4FF;
  --text-secondary:#8892A4;
  --text-tertiary: #4A5568;
  --border-subtle: rgba(255,255,255,0.06);
  --border-default:rgba(255,255,255,0.10);
}
```

### Typography

```
Display fonts:  Syne (Google Fonts) — weights 700, 800
Body font:      DM Sans (Google Fonts) — weights 300, 400, 500

Scale:
  display-2xl:  Syne 800, 96px,  -4px tracking, 0.95 line-height
  display-xl:   Syne 800, 72px,  -3px tracking, 1.0  line-height
  display-lg:   Syne 700, 56px,  -2px tracking, 1.05 line-height
  display-md:   Syne 700, 40px,  -1.5px tracking, 1.1 line-height
  body-lg:      DM Sans 400, 18px, 1.7 line-height
  body-md:      DM Sans 400, 16px, 1.65 line-height
  body-sm:      DM Sans 400, 14px, 1.6 line-height
  label:        DM Sans 600, 11px, 2.5px tracking, UPPERCASE

Responsive H1 hero: clamp(56px, 8vw, 100px)
Responsive H2 sections: clamp(36px, 4.5vw, 60px)
```

### Spacing System
```
Base unit: 4px
Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 96 · 128 · 160
Section padding desktop: 140px top/bottom
Section padding mobile:  80px top/bottom
Max content width: 1200px (mx-auto px-6)
Grid gap: 16px
```

### Border Radius
```
Cards:       16px (rounded-2xl)
Buttons:     8px  (rounded-lg) — NEVER pill/rounded-full
Inputs:      8px  (rounded-lg)
Badges/tags: 100px (rounded-full) — only for small pills
Avatars:     50%
```

### Animation Tokens
```
Duration fast:    150ms
Duration default: 250ms
Duration slow:    400ms
Duration reveal:  700ms
Easing default:   cubic-bezier(0.16, 1, 0.3, 1)  (ease-out-expo)
Easing in-out:    cubic-bezier(0.45, 0, 0.55, 1)
GSAP ease:        power3.out
Framer spring:    stiffness 150, damping 15
Stagger:          0.07s between children
```

### Section Background Alternation
```
Hero:         #05070F  (bg-primary)
Marquee:      #0B0E1A  (bg-surface)
Services:     #05070F  (bg-primary)
Process:      #0B0E1A  (bg-surface)
Results:      #05070F  (bg-primary)
Tech Stack:   #0B0E1A  (bg-surface)
Pricing:      #05070F  (bg-primary)
Testimonials: #0B0E1A  (bg-surface)
FAQ:          #05070F  (bg-primary)
CTA Banner:   #0B0E1A  (bg-surface)
Contact:      #05070F  (bg-primary)
Footer:       #030508  (darker than bg-primary)
```

---

## 🧩 COMPONENT SPECS

### `cursor.tsx`
```
Two DOM elements, position: fixed, pointer-events: none, z-index: 9999

DOT:
  Size: 8px × 8px
  Background: var(--accent-cyan)
  Border-radius: 50%
  Follows mouse with zero delay (direct style.transform update in mousemove)
  
RING:
  Size: 40px × 40px
  Border: 1.5px solid rgba(0,229,255,0.5)
  Border-radius: 50%
  Follows with Framer Motion useSpring (stiffness:150, damping:15)
  
HOVER STATE (on all a, button, [data-cursor="hover"]):
  Ring: scale 2.2, background rgba(0,229,255,0.08), border opacity 0.8
  Dot: scale 0, opacity 0
  Transition: 200ms
  
CSS: html, * { cursor: none !important }
```

### `noise.tsx`
```
Position: fixed, inset: 0
Z-index: 100 (above everything except cursor at 9999)
Pointer-events: none
Background: SVG feTurbulence noise filter
Opacity: 0.035
Mix-blend-mode: overlay
```

### `navbar.tsx`
```
Height: 64px
Position: fixed, top: 0, z-index: 50
Width: 100%

AT TOP (scrollY < 60px):
  background: transparent
  border-bottom: none

AFTER SCROLL (scrollY >= 60px):
  background: rgba(5,7,15,0.85)
  backdrop-filter: blur(20px) saturate(180%)
  border-bottom: 1px solid rgba(255,255,255,0.06)

LAYOUT (px-6 max-w-[1200px] mx-auto):
  Left:   Logo — "Nexor" (#F0F4FF) + "AI" (#00E5FF), Syne 800, 20px
  Center: Links — Services | Process | Results | Pricing | Blog | Contact
          DM Sans 500, 14px, #8892A4 → #F0F4FF on hover
          Active: #00E5FF with 2px bottom dot indicator
  Right:  "Get Free Audit" button
          border: 1px solid rgba(255,255,255,0.15)
          background: transparent → rgba(0,229,255,0.05) on hover
          border-color on hover: #00E5FF
          color on hover: #00E5FF
          padding: 10px 20px, border-radius: 8px

MOBILE (<768px):
  Show hamburger (two 18px lines, 2px height, #F0F4FF, gap 5px)
  On open: lines animate to X (top rotates 45°, bottom -45°)
  Menu: full screen overlay, bg rgba(5,7,15,0.97) blur(20px)
  Links: Syne 700, 32px, stagger in with Framer Motion (y:20→0, stagger:0.07s)
  
ENTRANCE: Framer Motion, initial:{y:-80, opacity:0} animate:{y:0, opacity:1} duration:0.5s
```

### `three-hero.tsx`
```
CRITICAL: Dynamic import only, SSR: false

import dynamic from 'next/dynamic'
const ThreeHero = dynamic(() => import('@/components/three-hero'), { ssr: false })

CANVAS:
  Position: absolute, inset: 0
  Width: 100%, Height: 100%
  Z-index: 0
  Parent div: position absolute, inset 0, overflow hidden

SCENE SETUP:
  Camera: PerspectiveCamera, fov:60, near:0.1, far:100, position z:6
  Renderer: alpha:true, antialias:true
  Background: null (transparent — CSS background handles it)
  Fog: FogExp2(0x05070F, 0.12)

PARTICLES:
  Count: 2000
  Geometry: BufferGeometry with random positions
    x: (Math.random() - 0.5) * 16   // -8 to +8
    y: (Math.random() - 0.5) * 10   // -5 to +5
    z: (Math.random() - 0.5) * 8    // -4 to +4
  Material: PointsMaterial
    size: 0.018
    color: #FFFFFF
    opacity: 0.5
    transparent: true
    sizeAttenuation: true

LINES:
  Connect particles within distance threshold: 2.8 units
  Max connections per particle: 4
  LineBasicMaterial: color #00E5FF, opacity 0.06, transparent true
  Rebuild line geometry on each frame (or use instancing for performance)

ANIMATION (useFrame):
  Slow rotation: points.rotation.y += 0.0003, points.rotation.x += 0.0001
  Mouse parallax:
    Target rotation x: mouseY * 0.0003 (mouseY normalized -1 to 1)
    Target rotation y: mouseX * 0.0005 (mouseX normalized -1 to 1)
    Lerp: current += (target - current) * 0.05

POST-PROCESSING (optional, adds ~20% performance cost):
  Bloom: intensity 0.3, luminanceThreshold 0.8, luminanceSmoothing 0.9
  Use @react-three/postprocessing EffectComposer + Bloom
```

---

## 📄 SECTION-BY-SECTION SPECS

### SECTION 1 — Hero (`hero.tsx`)

```
Container: position relative, min-height: 100svh, overflow: hidden
Background: #05070F

LAYERING (z-index):
  z-0:   Three.js canvas (absolute, inset 0)
  z-1:   Radial gradient overlay (absolute, inset 0)
         background: radial-gradient(ellipse 70% 60% at 50% 50%, 
                     rgba(5,7,15,0.3) 0%, rgba(5,7,15,0.0) 100%)
  z-10:  All content

CONTENT (centered, flex col, items-center, justify-center, text-center):
  Gap between elements: see below

  1. BADGE
     display: inline-flex, align-items: center, gap: 8px
     background: rgba(0,229,255,0.06)
     border: 1px solid rgba(0,229,255,0.2)
     border-radius: 100px
     padding: 6px 16px
     Font: DM Sans 500, 13px, #F0F4FF
     Left dot: 7px circle, #10B981, pulsing animation
     Text: "Trusted by 50+ businesses worldwide"
     Entrance: {opacity:0, y:20} → {opacity:1, y:0}, delay:0.2s

  2. H1 HEADLINE
     "We Build AI That Works" — color: #F0F4FF
     "While You Sleep."       — color: #00E5FF
     Font: Syne 800, clamp(56px, 8vw, 100px)
     Letter-spacing: -4px, Line-height: 0.95
     Max-width: 900px
     Margin-top: 24px
     Animation: GSAP SplitText char-by-char
       y:50 → 0, opacity:0 → 1
       stagger: 0.018s, ease: power3.out, delay: 0.3s
     Fallback (no GSAP): Framer Motion {opacity:0,y:30} → {opacity:1,y:0}, delay:0.4s

  3. SUBHEADING
     "Custom AI automation, chatbots, and workflows
      that save time and drive revenue — for businesses worldwide."
     Font: DM Sans 300, clamp(16px, 1.6vw, 20px)
     Color: #8892A4, Max-width: 520px
     Line-height: 1.7, Margin-top: 24px
     Entrance: {opacity:0, y:20} → {opacity:1, y:0}, delay:0.7s

  4. CTA BUTTONS
     Margin-top: 40px, display: flex, gap: 12px, flex-wrap: wrap, justify-center
     
     Button 1 — "Get Free AI Audit" (href: #contact)
       background: linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)
       color: #05070F, Font: DM Sans 700, 15px
       Padding: 14px 32px, border-radius: 8px
       Hover: translateY(-2px), box-shadow: 0 8px 32px rgba(0,229,255,0.3)
       Transition: 250ms
       
     Button 2 — "View Case Studies" (href: #results)
       background: transparent
       border: 1px solid rgba(255,255,255,0.15)
       color: #F0F4FF, Font: DM Sans 500, 15px
       Padding: 14px 32px, border-radius: 8px
       Hover: border-color rgba(0,229,255,0.5), color #00E5FF
       Transition: 250ms

  5. STATS ROW
     Margin-top: 64px
     Padding-top: 48px
     Border-top: 1px solid rgba(255,255,255,0.07)
     Display: flex, gap: 0, align-items: center, justify-content: center
     
     4 stats with dividers between them:
     [50+] [divider] [3x] [divider] [48hr] [divider] [$2M+]
     
     Each stat: padding 0 48px
     Divider: width 1px, height 48px, background rgba(255,255,255,0.08)
     
     Number: Syne 800, 40px, #00E5FF (count-up animation on mount)
     Label: DM Sans 400, 13px, #8892A4, margin-top: 4px
     
     Labels: "Automations Built" | "Efficiency Gain" | "First Demo" | "Revenue Generated"
     
     Entrance: {opacity:0, y:20} → {opacity:1, y:0}, delay:1.0s

  6. SCROLL INDICATOR
     Position: absolute, bottom: 40px, left: 50%, translateX(-50%)
     Display: flex, flex-direction: column, align-items: center, gap: 8px
     Font: DM Sans 400, 11px, 1.5px tracking, uppercase, #4A5568
     Text: "Scroll"
     Chevron: SVG down arrow, bouncing animation (y: 0→6px, repeat, duration:1.2s)
     Opacity: 1 → 0 when scrollY > 100px (JS scroll listener)
```

### SECTION 2 — Marquee (`marquee.tsx`)

```
Background: #0B0E1A
Border-top: 1px solid rgba(255,255,255,0.06)
Border-bottom: 1px solid rgba(255,255,255,0.06)
Padding: 28px 0
Overflow: hidden
Position: relative

FADE MASKS:
  ::before and ::after pseudo-elements on container
  background: linear-gradient(to right, #0B0E1A, transparent) — left side
  background: linear-gradient(to left, #0B0E1A, transparent) — right side
  Width: 120px, position: absolute, height: 100%, z-index: 2

ROW 1 (left scroll):
  Animation: marquee-left 35s linear infinite
  Pause on hover: animation-play-state: paused on container hover
  Content (duplicated for seamless loop):
  "E-COMMERCE · SAAS · HEALTHCARE · REAL ESTATE · LOGISTICS · FINANCE · 
   EDTECH · LEGAL · HOSPITALITY · MARKETING AGENCIES · FINTECH · HR TECH"
  Font: Syne 600, 18px, #4A5568, letter-spacing: 1px

ROW 2 (right scroll):
  Animation: marquee-right 35s linear infinite
  Content:
  "OpenAI · Claude AI · LangChain · n8n · Make.com · HubSpot · Shopify · 
   Zapier · Supabase · Pinecone · Vercel · Anthropic · LlamaIndex"
  Font: DM Sans 500, 14px, #4A5568

CSS Animations in globals.css:
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
```

### SECTION 3 — Services (`services.tsx`)

```
Background: #05070F
Padding: 140px 0

HEADER (centered):
  Label: "WHAT WE BUILD" — DM Sans 600, 11px, 2.5px tracking, #00E5FF, uppercase
  H2: "AI That Replaces Repetitive Work" — Syne 800, clamp(36px,4.5vw,56px), #F0F4FF
  Subtitle: "Six core solutions, one mission — automate everything that slows you down."
  Margin-bottom: 64px

BENTO GRID:
  display: grid
  grid-template-columns: repeat(12, 1fr)
  gap: 16px
  max-width: 1200px, margin: 0 auto

  CARD A — AI Chatbots & Voice Agents
    grid-column: span 7
    height: 300px
    Visual: animated chat UI mockup (right side, CSS only)
    ROI badge: "Saves 30hrs/week"
    Tag color: accent-cyan

  CARD B — Workflow Automation  
    grid-column: span 5
    height: 300px
    Visual: animated flow arrows (CSS)
    ROI badge: "Zero manual work"
    Tag color: accent-violet

  CARD C — AI Lead Generation
    grid-column: span 4
    height: 260px
    Background number: "3x" in Syne 800, 140px, rgba(0,229,255,0.04)
    ROI badge: "3x more leads"
    Tag color: accent-orange

  CARD D — Content & SEO AI
    grid-column: span 4
    height: 260px
    ROI badge: "10x faster content"
    Tag color: accent-cyan

  CARD E — Analytics & Reporting
    grid-column: span 4
    height: 260px
    Visual: mini animated bar chart (3 bars, CSS height animation)
    ROI badge: "Real-time insights"
    Tag color: accent-violet

  CARD F — Custom AI Development
    grid-column: span 12
    height: 180px
    Layout: horizontal (text left 50%, code right 50%)
    Right side: code block mockup with syntax highlighting
      (static HTML, styled to look like VS Code dark theme)
    Cursor blinking at end of last code line

ALL CARDS:
  background: #101422
  border: 1px solid rgba(255,255,255,0.06)
  border-radius: 16px
  padding: 32px
  overflow: hidden
  position: relative
  transition: transform 300ms, border-color 300ms, box-shadow 300ms
  
  Hover:
    transform: translateY(-4px)
    border-color: rgba(0,229,255,0.25)
    box-shadow: 0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,229,255,0.08)

  Inside each card:
    Tag pill: 11px, DM Sans 600, uppercase, 2px tracking
      bg: rgba(accent,0.08), border: 1px solid rgba(accent,0.2)
      color: accent color, border-radius: 100px, padding: 3px 10px
    Title: Syne 700, 20px, #F0F4FF, margin-top: auto (pushed to bottom)
    Description: DM Sans 400, 14px, #8892A4, margin-top: 8px
    ROI pill: same as tag but #10B981 color, bottom of card

Framer Motion: staggerChildren 0.08s, each card {opacity:0,y:24}→{opacity:1,y:0}
Trigger: useInView, once: true, margin: "-100px"

MOBILE: all cards span 12 (single column), heights auto
```

### SECTION 4 — Process (`process.tsx`)

```
Background: #0B0E1A
Padding: 140px 0

HEADER (left-aligned):
  Label + H2: "From Discovery to Live in 5 Days"

DESKTOP (≥1024px) — GSAP Horizontal Scroll:
  Outer wrapper: position relative, overflow hidden
  Pin target: the outer section div
  
  GSAP setup:
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      scrub: 1,
      start: "top top",
      end: "+=400%",  // 4 panels × 100%
    })
    
    gsap.to(trackRef.current, {
      x: () => -(trackRef.current.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: { same as above, scrub: 1 }
    })

  Track: display flex, width: fit-content
  Each panel: width: 100vw, height: 100%, flex-shrink: 0
               padding: 0 10vw, display flex, flex-direction column, justify-content center

  PROGRESS BAR:
    Position: absolute, bottom: 0, left: 0
    Height: 2px, background: #101422
    Inner fill: height 100%, background: #00E5FF
    Width: synced to scroll progress via ScrollTrigger onUpdate

  STEPS (4 panels):
    01 — Discovery Call
    02 — AI Blueprint  
    03 — Build & Integrate
    04 — Launch & Scale

  Each panel content:
    Step badge: "STEP 01" — label style, accent-cyan
    Large faded number: Syne 800, 200px, rgba(255,255,255,0.02)
                        position: absolute, right: 10vw, top: 50%, translateY(-50%)
    Title: Syne 700, 48px, #F0F4FF
    Description: DM Sans 400, 18px, #8892A4, max-width: 480px, margin-top: 16px
    Icon: 48px SVG, accent-cyan, margin-top: 32px

MOBILE (<1024px):
  Vertical stack, gap: 24px
  Each step: bg #101422, border border-subtle, rounded-2xl, padding: 32px
  Left border: 3px solid accent-cyan (active) or border-subtle
  Connecting dotted line between cards (SVG or border-left with dashes)
```

### SECTION 5 — Results (`results.tsx`)

```
Background: #05070F
Padding: 140px 0
id="results"

HEADER:
  Label: "REAL RESULTS"
  H2: "Numbers That Matter"

GRID: 
  Two columns: 55fr 45fr, gap: 80px, align-items: start
  Mobile: single column

LEFT — Case Study Cards (stacked, gap: 20px):
  3 cards, each:
    background: #101422
    border-radius: 14px
    padding: 32px
    border-left: 3px solid [accent color per card]
    transition: transform 300ms, box-shadow 300ms
    hover: translateY(-4px)
    
    Framer Motion: stagger 0.15s, {opacity:0,x:-24}→{opacity:1,x:0}
    useInView trigger

  Card 1 (border: accent-cyan):
    "🇬🇧 E-Commerce · UK"
    Headline: "340% more qualified leads"
    Syne 700, 26px, #00E5FF
    Metrics row: 
      "Lead response: 4 hours → 8 seconds"
      "Chatbot handles: 0% → 78% of queries"
    Client: "GrowthLab — James Thornton, CEO"

  Card 2 (border: accent-violet):
    "🇺🇸 SaaS · USA"
    Headline: "28 hours saved per employee weekly"
    Syne 700, 26px, #7B61FF
    Metrics: "Manual tasks: 40hrs/wk → 12hrs/wk"
    Client: "CloudDesk — Sarah Mitchell, Founder"

  Card 3 (border: accent-orange):
    "🇦🇪 Real Estate · UAE"
    Headline: "3x consultation bookings in month 1"
    Syne 700, 26px, #FF6B35
    Metrics: "Follow-up rate: 23% → 91%"
    Client: "PropNest — Omar Al-Rashid, Director"

RIGHT — Metric Bars:
  Title: "Average Impact Across All Clients"
  Syne 700, 20px, margin-bottom: 32px

  5 metric bars, stagger on useInView:
  
  Each bar:
    Metric label: DM Sans 500, 14px, #F0F4FF
    Percentage: DM Sans 700, 14px, #00E5FF (right-aligned)
    Bar track: height 6px, background rgba(255,255,255,0.06), border-radius 100px
    Bar fill: 
      Framer Motion: animate width from 0% to target% 
      duration: 1.2s, ease: [0.16,1,0.3,1]
      stagger: 0.15s between bars
      gradient: linear-gradient(90deg, #00E5FF, #7B61FF)
    
    Metrics:
      Time Saved Weekly:     85%
      Lead Response Speed:   92%
      Revenue Impact:        67%
      Customer Satisfaction: 94%
      Cost Reduction:        55%
```

### SECTION 6 — Tech Stack (`tech-stack.tsx`)

```
Background: #0B0E1A
Padding: 80px 0

Header (centered):
  Label: "POWERED BY"
  Subtitle: "We use the best AI tools available, not just the trendiest."
  DM Sans 400, 16px, #8892A4

Items row (horizontal, scrollable on mobile):
  display: flex, gap: 12px, flex-wrap: wrap, justify-content: center

  Items: OpenAI · Claude AI · LangChain · n8n · Make.com · 
         Zapier · HubSpot · Supabase · Pinecone · Vercel

  Each item:
    background: #101422
    border: 1px solid rgba(255,255,255,0.06)
    border-radius: 12px
    padding: 12px 20px
    Font: DM Sans 500, 14px, #8892A4
    Hover: translateY(-3px), border-color rgba(0,229,255,0.2), color #F0F4FF
    Transition: 200ms
```

### SECTION 7 — Pricing (`pricing.tsx`)

```
Background: #05070F
Padding: 140px 0

Header (centered):
  Label + H2: "Simple Pricing. Real ROI."
  Subtitle: "No hidden fees. No long contracts. Cancel anytime."

TOGGLE — Monthly / Quarterly:
  Pill container: background #101422, border border-subtle, border-radius: 100px
  Two options: "Monthly" | "Quarterly"
  Active indicator: Framer Motion layout animation, 
    background: rgba(0,229,255,0.1), border: 1px solid rgba(0,229,255,0.3)
    border-radius: 100px
  Quarterly: shows "Save 10%" badge in accent-orange
  State: React useState, affects displayed prices

3 PRICING CARDS (grid, 3 cols desktop, 1 col mobile):
  Gap: 24px

STARTER — $299/mo (Quarterly: $269):
  background: #101422
  border: 1px solid rgba(255,255,255,0.08)
  border-radius: 24px, padding: 40px 32px
  Hover: translateY(-6px), transition: 300ms

GROWTH — $699/mo (Quarterly: $629) — FEATURED:
  Scale: transform scale(1.03) relative to others
  background: linear-gradient(160deg, #0d1a2e 0%, #0B0E1A 100%)
  border: none
  Position: relative
  
  Glowing animated border (CSS conic-gradient trick):
    ::before pseudo-element:
      content: ''
      position: absolute, inset: -1.5px
      border-radius: 26px (2px more than card)
      background: conic-gradient(from var(--angle), #00E5FF, #7B61FF, #FF6B35, #7B61FF, #00E5FF)
      z-index: -1
      animation: border-rotate 4s linear infinite
      
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    @keyframes border-rotate {
      to { --angle: 360deg; }
    }
  
  "MOST POPULAR" badge: 
    Position: absolute, top: -14px, left: 50%, translateX(-50%)
    background: linear-gradient(135deg, #00E5FF, #7B61FF)
    color: #05070F, Font: DM Sans 700, 11px, 1.5px tracking, uppercase
    Padding: 4px 16px, border-radius: 100px

ENTERPRISE — Custom:
  Same as Starter styling

ALL CARDS content:
  Plan name: label style, #8892A4, margin-bottom: 12px
  Price: Syne 800, 52px, #F0F4FF
    Currency: DM Sans 400, 20px, vertical-align: top, margin-top: 10px
    Period: DM Sans 400, 16px, #8892A4
  Description: DM Sans 400, 15px, #8892A4, margin: 12px 0 28px
  Divider: 1px solid rgba(255,255,255,0.06), margin-bottom: 24px
  
  Features list: gap: 12px
    ✓ items: #F0F4FF, checkmark #00E5FF
    ✗ items: #4A5568, X mark #4A5568
    Font: DM Sans 400, 15px, line-height: 1.5
  
  CTA Button: margin-top: auto, full-width
    Starter/Enterprise: outlined (border: rgba(255,255,255,0.15), color: #F0F4FF)
    Growth: solid gradient (linear-gradient(135deg, #00E5FF, #7B61FF), color: #05070F)
    All: padding: 14px, border-radius: 8px, DM Sans 700, 15px
    Hover: Growth button: box-shadow 0 8px 32px rgba(0,229,255,0.3), translateY(-1px)
```

### SECTION 8 — Testimonials (`testimonials.tsx`)

```
Background: #0B0E1A
Padding: 140px 0

Header (centered):
  Label + H2: "Results That Speak for Themselves"

CAROUSEL:
  Container: overflow: hidden, position: relative
  Track: display flex, gap: 24px
  Drag: Framer Motion drag="x", dragConstraints (calculated from track width)
  Snap: dragTransition with bounceStiffness:300, bounceDamping:30
  
  Auto-advance: setInterval 5000ms, paused on hover/drag
  
  3 cards visible desktop (card width: 420px)
  1 card visible mobile (card width: 85vw)

TESTIMONIAL CARD:
  Width: 420px (desktop), 85vw (mobile)
  Flex-shrink: 0
  background: #101422
  border: 1px solid rgba(255,255,255,0.06)
  border-top: 2px solid #7B61FF
  border-radius: 20px, padding: 36px
  Hover: border-color rgba(255,255,255,0.12), translateY(-4px)
  Transition: 300ms

  Content:
    Stars: "★★★★★" color #FFB800, font-size: 14px, letter-spacing: 2px
    Quote: DM Sans 300, 16px, #8892A4, font-style: italic, line-height: 1.75
           margin: 16px 0 24px
    Divider: 1px solid rgba(255,255,255,0.06)
    Author row (margin-top: 20px):
      Avatar: 44px circle, gradient background, Syne 700, 15px initials
      Name: DM Sans 600, 15px, #F0F4FF
      Role + Country: DM Sans 400, 13px, #8892A4

4 TESTIMONIALS:
  James Thornton · CEO @ GrowthLab · UK 🇬🇧
    "NexorAI built a lead qualification bot that filters 200+ daily inquiries. 
     Our sales team now only talks to pre-qualified prospects. Conversion went up 340%."
    Avatar: JT, gradient #00E5FF→#7B61FF

  Sarah Mitchell · Founder @ CloudDesk · USA 🇺🇸
    "Every week we were drowning in manual data entry. Their automation 
     pipeline eliminated 28 hours of repetitive work per employee. Game-changer."
    Avatar: SM, gradient #7B61FF→#FF6B35

  Omar Al-Rashid · Director @ PropNest · UAE 🇦🇪
    "The AI follow-up system books calls while I sleep. Literally tripled 
     our monthly consultations in the first 30 days. Worth every penny."
    Avatar: OA, gradient #FF6B35→#00E5FF

  Emma Clarke · CMO @ Vibe Agency · Australia 🇦🇺
    "Our social media content is now fully automated. 30 posts/week, 
     zero manual effort, and engagement is up 180%. Absolutely brilliant work."
    Avatar: EC, gradient #10B981→#00E5FF

DOT NAVIGATION:
  Row of dots below carousel, centered, margin-top: 32px
  Each dot: 8px circle, background rgba(255,255,255,0.2)
  Active: 24px wide × 8px (pill shape), background #00E5FF
  Framer Motion layout animation on active indicator
  Clickable (sets active index)
```

### SECTION 9 — FAQ (`faq.tsx`)

```
Background: #05070F
Padding: 120px 0
Max-width: 800px, margin: 0 auto

shadcn/ui Accordion, type="single" collapsible

CUSTOM STYLING (override shadcn defaults):
  AccordionItem:
    border: 1px solid rgba(255,255,255,0.06)
    border-radius: 12px
    margin-bottom: 8px
    overflow: hidden
    transition: border-color 200ms
    
  AccordionItem[data-state="open"]:
    border-color: rgba(0,229,255,0.2)
    background: #101422
    
  AccordionTrigger:
    padding: 24px 28px
    Font: Syne 600, 17px, #F0F4FF
    Hover: color #00E5FF, no underline
    Chevron: custom SVG, rotates 180° on open (CSS transform)
    
  AccordionContent:
    padding: 0 28px 24px
    Font: DM Sans 400, 15px, #8892A4, line-height: 1.7
    Animation: height 0→auto smooth (shadcn handles this)

8 QUESTIONS:
  1. "What industries do you work with?"
     Answer: We've built AI systems for e-commerce, SaaS, healthcare, 
     real estate, logistics, fintech, legal, and marketing agencies worldwide.
     
  2. "How long does it take to build an automation?"
     Answer: Most projects go live within 5–10 business days. 
     Simple chatbots in 48 hours. Complex multi-system integrations 
     take 2–3 weeks. We always agree on a timeline before starting.
     
  3. "Do I need technical knowledge to use the AI systems you build?"
     Answer: Zero technical knowledge required. We build systems 
     that your existing team can use from day one, with full training included.
     
  4. "What tools and platforms do you integrate with?"
     Answer: We integrate with 100+ tools including HubSpot, Salesforce, 
     Shopify, Notion, Slack, WhatsApp, Gmail, Airtable, and any platform 
     with an API.
     
  5. "Is my business data safe and secure?"
     Answer: All data is encrypted in transit and at rest. We never 
     train AI models on your data without explicit consent. 
     GDPR and SOC2 compliant workflows available.
     
  6. "What if the automation doesn't deliver results?"
     Answer: Every Growth and Enterprise project comes with a 30-day 
     results guarantee. If we don't hit agreed metrics, we fix it free 
     or issue a refund. No exceptions.
     
  7. "Do you offer ongoing support after launch?"
     Answer: Yes. All plans include support — Starter gets email (48hr), 
     Growth gets priority Slack (4hr), Enterprise gets 24/7 dedicated support.
     
  8. "How do I get started?"
     Answer: Book a free 30-minute discovery call below or fill out the 
     contact form. We'll analyze your business and show you exactly 
     where AI can save you time and make you money — no pitch, just value.
```

### SECTION 10 — CTA Banner (`cta-banner.tsx`)

```
Background: #0B0E1A
Padding: 140px 0
Position: relative, overflow: hidden

BACKGROUND VISUAL:
  3 blurred radial gradient blobs (position absolute, z-index 0):
    Blob 1: rgba(0,229,255,0.04), 600px, top-left
    Blob 2: rgba(123,97,255,0.03), 400px, bottom-right
    Blob 3: rgba(255,107,53,0.02), 300px, center
  Grid overlay: 
    background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    background-size: 48px 48px

CONTENT (centered, max-width 600px, z-index 10):
  H2: "Ready to Automate Your Business?"
      Syne 800, clamp(36px,4vw,52px), #F0F4FF
  Subtitle: "Book a free 30-min discovery call. No pitch. Just clarity."
            DM Sans 400, 18px, #8892A4, margin-top: 16px

EMAIL FORM (margin-top: 40px):
  Display: flex, gap: 12px (stack on mobile: flex-direction column)
  
  Input:
    flex: 1, background: #101422
    border: 1px solid rgba(255,255,255,0.1)
    border-radius: 8px, padding: 14px 18px
    Font: DM Sans 400, 15px, #F0F4FF
    Placeholder: "Enter your business email" — color #4A5568
    Focus: border-color #00E5FF, box-shadow: 0 0 0 3px rgba(0,229,255,0.08)
    
  Button: "Book Free Call"
    background: #00E5FF, color: #05070F
    Font: DM Sans 700, 15px
    Padding: 14px 28px, border-radius: 8px
    Hover: box-shadow: 0 0 24px rgba(0,229,255,0.4), translateY(-1px)

STATES:
  Success: 
    Form hides, replaced by:
    SVG checkmark (draw animation, stroke-dashoffset: length→0, 600ms)
    Text: "We'll reach out within 2 hours ✓"
    Font: DM Sans 500, 16px, #10B981
    Framer Motion: scale 0→1, opacity 0→1
    
  Error:
    Input border → accent-orange
    Shake animation (x: 0→-8→8→-8→0, duration: 400ms)

SOCIAL PROOF (below form, margin-top: 24px):
  5 overlapping avatar circles (initials, 36px, gradient backgrounds)
  Text: "Join 50+ businesses already automating with NexorAI"
  Font: DM Sans 400, 14px, #8892A4
```

### SECTION 11 — Contact (`contact.tsx`)

```
Background: #05070F
Padding: 140px 0
id="contact"

GRID: 40% / 60%, gap: 80px
Mobile: single column

LEFT COLUMN:
  H2: "Let's Build Something" — Syne 800, 48px, #F0F4FF
  Subtext: "Tell us about your business and we'll show you exactly 
            how AI can transform it."
            DM Sans 400, 16px, #8892A4, margin-top: 16px, margin-bottom: 40px
  
  Response badge:
    display: flex, align-items: center, gap: 8px
    green dot (8px, #10B981, pulsing)
    "We respond within 2 hours" — DM Sans 500, 14px, #F0F4FF
  
  Timezone note (margin-top: 8px):
    "Available across US · UK · EU · AUS · ME timezones"
    DM Sans 400, 13px, #8892A4
  
  Email (margin-top: 32px):
    Icon + "hello@nexorai.io" — DM Sans 500, 15px, #F0F4FF, underline on hover
  
  Calendly link (margin-top: 16px):
    "Prefer to pick a time? Book directly →" — #00E5FF, underline hover
  
  Social links (margin-top: 40px):
    4 icons: LinkedIn | Twitter/X | GitHub | Upwork
    Each: 40px circle, background #101422, border border-subtle
    Hover: border-color #00E5FF, icon color #00E5FF
    Gap: 12px

RIGHT COLUMN — Form:
  React Hook Form + Zod validation

  FIELDS:
    Row 1: Full Name | Company Name
    Row 2: Email | Phone (optional label)
    Row 3: 
      Country (select with flag-ish option):
        Options: United States, United Kingdom, UAE, Australia, Canada,
                 Germany, Singapore, India, Pakistan, Other
      Service (select):
        Options: AI Chatbot | Workflow Automation | Lead Generation |
                 Content Automation | Analytics | Custom AI Dev | Not sure yet
    Row 4:
      Budget (select):
        Options: Under $500/mo | $500–$1k/mo | $1k–$5k/mo | $5k+/mo
    Row 5: Project description (textarea, 5 rows)
           "Tell us about your business and what you want to automate..."

  INPUT STYLING:
    background: #101422
    border: 1px solid rgba(255,255,255,0.08)
    border-radius: 8px, padding: 14px 16px
    Font: DM Sans 400, 15px, color #F0F4FF
    Placeholder: #4A5568
    Focus: border-color #00E5FF, box-shadow: 0 0 0 3px rgba(0,229,255,0.08)
    Error: border-color #FF6B35, shake animation
    Label: DM Sans 500, 12px, 0.8px tracking, uppercase, #8892A4, margin-bottom: 6px
    form-row: display grid, grid-template-columns: 1fr 1fr, gap: 16px
    Mobile form-row: grid-template-columns: 1fr

  SUBMIT BUTTON:
    Width: 100%, height: 56px
    background: linear-gradient(135deg, #00E5FF, #7B61FF)
    color: #05070F, Font: DM Sans 700, 16px
    border-radius: 8px, border: none
    
    States:
      Default: "Send Message →"
      Loading: spinner SVG + "Sending..."
        Spinner: 20px circle, border 2px, top border #05070F, others transparent
        animation: spin 600ms linear infinite
      Success: "Message sent! We'll reply within 2 hours ✓"
        background: #10B981
      Error: "Something went wrong. Email us directly →"
        background: rgba(255,107,53,0.2), border: 1px solid #FF6B35, color: #FF6B35
```

---

## 🔌 API ROUTES

### `/app/api/contact/route.ts`

```typescript
// Full implementation spec:

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase'
import { Resend } from 'resend'

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Please select your country'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = ContactSchema.parse(body)
    
    // 1. Save to Supabase
    const supabase = createClient()
    await supabase.from('leads').insert({
      ...data,
      source: 'contact_form',
      created_at: new Date().toISOString(),
    })
    
    // 2. Send notification email to agency
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'NexorAI Website <noreply@nexorai.io>',
      to: 'hello@nexorai.io',
      subject: `New Lead: ${data.name} from ${data.company}`,
      html: `<!-- Formatted HTML email with all fields -->`,
    })
    
    // 3. Send confirmation to user
    await resend.emails.send({
      from: 'NexorAI <hello@nexorai.io>',
      to: data.email,
      subject: "We received your message — talk soon!",
      html: `<!-- Confirmation email template -->`,
    })
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### `/app/api/audit/route.ts`

```typescript
// Email capture for CTA banner
// Validates email → saves to audit_leads table → sends welcome email
// Same pattern as contact route but simpler schema: z.object({ email: z.string().email() })
```

---

## 🗄️ DATABASE SCHEMA (Supabase)

```sql
-- Run in Supabase SQL Editor

CREATE TABLE leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT,
  phone       TEXT,
  country     TEXT,
  service     TEXT,
  budget      TEXT,
  message     TEXT,
  source      TEXT DEFAULT 'contact_form',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  source      TEXT DEFAULT 'cta_banner',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts from API (service role key bypasses RLS)
CREATE POLICY "Allow inserts" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow inserts" ON audit_leads FOR INSERT WITH CHECK (true);
```

---

## 🌍 SEO SETUP

### `/app/layout.tsx` Metadata

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://nexorai.io'),
  title: {
    default: 'NexorAI — AI Automation Agency for Growing Businesses',
    template: '%s | NexorAI',
  },
  description: 'We build custom AI systems, chatbots, and workflow automations that save time and drive revenue. Trusted by 50+ businesses worldwide.',
  keywords: [
    'AI automation agency', 'AI chatbot development', 'business automation',
    'workflow automation', 'AI agency', 'custom AI solutions',
    'AI lead generation', 'n8n automation', 'make.com consultant',
    'hire AI engineer', 'automate business processes',
  ],
  authors: [{ name: 'NexorAI', url: 'https://nexorai.io' }],
  creator: 'NexorAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexorai.io',
    siteName: 'NexorAI',
    title: 'NexorAI — AI Automation Agency',
    description: 'Custom AI systems that work while you sleep.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexorAI — AI Automation Agency',
    description: 'Custom AI systems that work while you sleep.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'your-google-verification-code',
  },
}
```

### `/next-sitemap.config.js`

```javascript
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://nexorai.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
```

---

## 🔑 ENVIRONMENT VARIABLES

```bash
# .env.local — never commit this file

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c...

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Site
NEXT_PUBLIC_SITE_URL=https://nexorai.io

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📦 PACKAGE.JSON DEPENDENCIES

```json
{
  "dependencies": {
    "next": "14.2.x",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.0",
    "@react-three/fiber": "^8.16.0",
    "@react-three/drei": "^9.105.0",
    "@react-three/postprocessing": "^2.16.0",
    "three": "^0.163.0",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.23.0",
    "resend": "^3.2.0",
    "@supabase/supabase-js": "^2.43.0",
    "next-sitemap": "^4.2.0",
    "lucide-react": "^0.378.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-dialog": "^1.1.0"
  }
}
```

---

## ⚡ PERFORMANCE RULES (Never Violate)

```
1. Three.js canvas MUST use dynamic import with { ssr: false }
   const ThreeHero = dynamic(() => import('@/components/three-hero'), { ssr: false })

2. All animations MUST only animate transform and opacity
   NEVER animate: width, height, top, left, margin, padding (causes layout reflow)

3. Add will-change: transform to all animated elements

4. Respect prefers-reduced-motion:
   @media (prefers-reduced-motion: reduce) {
     * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
   }
   In Framer Motion: const prefersReduced = useReducedMotion()

5. All images: next/image with explicit width and height (prevents CLS)

6. Fonts: next/font/google with display: 'swap' and preload: true

7. Lazy load sections below fold with dynamic imports + Suspense

8. GSAP ScrollTrigger: always call ScrollTrigger.refresh() after 
   any layout change and cleanup in useEffect return

9. Three.js: dispose geometry and materials on component unmount
   useEffect(() => { return () => { geometry.dispose(); material.dispose() } }, [])
```

---

## 🐛 COMMON CURSOR FIX PROMPTS

Save these for when things break:

```
FIX THREE.JS NOT FILLING BACKGROUND:
"The Three.js canvas is not filling the full hero background.
 Fix: canvas parent must be position:absolute, inset:0, width:100%, height:100%.
 Canvas itself position:absolute, width:100%, height:100%, z-index:0.
 Hero content must be position:relative, z-index:10."

FIX GSAP HORIZONTAL SCROLL ON MOBILE:
"The GSAP horizontal scroll in the Process section should only 
 activate on desktop (min-width: 1024px). On mobile, convert to 
 vertical stacked cards. Use a useEffect with window.innerWidth check 
 and ScrollTrigger.matchMedia()."

FIX ANIMATED BORDER ON PRICING CARD:
"Implement the rotating gradient border on the featured pricing card 
 using @property --angle and conic-gradient on a ::before pseudo-element.
 The pseudo-element should be position:absolute, inset:-1.5px, z-index:-1,
 border-radius: 2px more than the card, with overflow:hidden on the card."

FIX FRAMER MOTION CAROUSEL:
"The testimonials carousel drag is not snapping correctly.
 Fix: use useDragControls, calculate snap points as array of 
 -(index * (cardWidth + gap)) for each card, use onDragEnd to 
 snap to nearest point using animate()."

FIX FORM NOT SUBMITTING:
"The contact form is not calling the API route. 
 Check: onSubmit handler calls fetch('/api/contact', {method:'POST', 
 body: JSON.stringify(data), headers:{'Content-Type':'application/json'}}).
 API route must export async function POST(req: Request).
 Both must handle errors with try/catch."
```

---

## 🚀 DEPLOYMENT CHECKLIST

```
Before pushing to Vercel:

[ ] npm run build — must complete with 0 errors
[ ] npm run lint — 0 warnings
[ ] Test contact form → email received
[ ] Test audit form → Supabase row created
[ ] Custom cursor works
[ ] Three.js loads without SSR error
[ ] Mobile nav opens/closes
[ ] Pricing toggle works
[ ] All scroll animations trigger
[ ] No console errors in production build
[ ] OG image exists at /public/og-image.png (1200×630px)
[ ] .env.local values added to Vercel dashboard
[ ] Custom domain connected in Vercel
[ ] Google Search Console verified
[ ] Sitemap submitted: nexorai.io/sitemap.xml
```

---

*NexorAI Cursor Handoff v2.0 — Keep this file in your project root as HANDOFF.md*
*Share the relevant section with Cursor whenever you need to build or fix something.*
