export const MARQUEE_ROW_ONE =
  "E-commerce | SaaS | Healthcare | Real Estate | Logistics | Finance | EdTech | Legal | Hospitality | Marketing Agencies";

export const MARQUEE_ROW_TWO =
  "OpenAI | Zapier | Make.com | HubSpot | Shopify | Notion | Slack | Airtable | Stripe | Salesforce";

export type ServiceIconKey = "bot" | "zap" | "users" | "pen" | "chart" | "code";

export const serviceCards: { title: string; desc: string; roi: string; icon: ServiceIconKey }[] = [
  {
    title: "AI Chatbots & Voice Agents",
    desc: "Deploy intelligent assistants for web, WhatsApp, and voice channels.",
    roi: "Saves 30hrs/week",
    icon: "bot",
  },
  {
    title: "Workflow Automation",
    desc: "Remove repetitive admin work with robust no-code and custom pipelines.",
    roi: "Cuts ops time 65%",
    icon: "zap",
  },
  {
    title: "AI Lead Generation & CRM",
    desc: "Capture, score, and nurture every lead through automated sequences.",
    roi: "Boosts conversion 2.8x",
    icon: "users",
  },
  {
    title: "Content & SEO Automation",
    desc: "Generate and optimize high-intent content at scale with quality control.",
    roi: "3x content output",
    icon: "pen",
  },
  {
    title: "Data Analytics & Reporting",
    desc: "Real-time KPI dashboards and AI summaries for faster decisions.",
    roi: "Weekly reporting in minutes",
    icon: "chart",
  },
  {
    title: "Custom AI Development",
    desc: "Purpose-built AI systems integrated deeply with your internal stack.",
    roi: "Revenue impact focused",
    icon: "code",
  },
];

/** Contact form service dropdown — kept in sync with serviceCards titles */
export const contactServiceOptions = serviceCards.map((card) => card.title);

export const faqItems = [
  {
    question: "What industries do you work with?",
    answer:
      "We work with SaaS, e-commerce, agencies, real estate, healthcare admin, logistics, and professional services. If you have repeatable workflows and customer data, we can usually automate them.",
  },
  {
    question: "How long does it take to build an automation?",
    answer:
      "Most projects ship a first working version within 5–10 business days. Complex multi-system builds typically run 2–4 weeks with weekly milestones so you see progress early.",
  },
  {
    question: "Do I need technical knowledge to use your AI systems?",
    answer:
      "No. We design for operators and founders — clear dashboards, documented handoffs, and training on launch day. Your team uses simple interfaces; we handle the engineering.",
  },
  {
    question: "What tools do you integrate with?",
    answer:
      "HubSpot, Salesforce, Shopify, Zapier, Make, Slack, Notion, Airtable, Google Workspace, WhatsApp Business, and custom APIs. If it has a webhook or API, we can likely connect it.",
  },
  {
    question: "Is my business data secure?",
    answer:
      "Yes. We use encrypted connections, least-privilege access, and your preferred region or cloud. NDAs and SOC-aligned practices are available for enterprise clients.",
  },
  {
    question: "What if the automation doesn't work as expected?",
    answer:
      "Every engagement includes a 30-day refinement window on Growth plans. We monitor, fix edge cases, and tune prompts or rules until the workflow hits the agreed KPIs.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes — monthly retainers cover monitoring, updates, new workflows, and priority support. You can also book ad-hoc hours if you prefer a lighter touch.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free 30-minute audit. We map your highest-ROI workflow, share a fixed-scope proposal, and can begin discovery within 48 hours of approval.",
  },
] as const;

export type ProcessIconKey = "scan" | "message" | "settings" | "rocket";

export const processSteps: { icon: ProcessIconKey; title: string; desc: string }[] = [
  {
    icon: "scan",
    title: "Free Discovery Call",
    desc: "We map your workflows and identify automation ROI.",
  },
  {
    icon: "message",
    title: "Custom AI Blueprint",
    desc: "Tailored strategy with no generic templates.",
  },
  {
    icon: "settings",
    title: "Build & Integrate",
    desc: "We connect your tools and test every edge case.",
  },
  {
    icon: "rocket",
    title: "Launch & Scale",
    desc: "Go live fast, train your team, and keep improving.",
  },
];

export const caseStudies = [
  {
    industry: "E-commerce",
    metric: "340%",
    outcome: "Lead response rate",
    detail: "From hours to minutes within 30 days of go-live.",
  },
  {
    industry: "SaaS",
    metric: "28 hrs",
    outcome: "Saved per employee / week",
    detail: "Workflow automation removed repetitive ops work.",
  },
  {
    industry: "Real estate",
    metric: "3×",
    outcome: "Booked consultations",
    detail: "More qualified meetings in the first month after launch.",
  },
] as const;

export const resultsKpis = [
  { value: "50+", label: "Automations delivered" },
  { value: "5 days", label: "Average time to first demo" },
  { value: "3×", label: "Typical efficiency gain" },
  { value: "94%", label: "Client satisfaction score" },
] as const;

export const techNames = [
  "OpenAI GPT-4",
  "Claude AI",
  "Llama",
  "LangChain",
  "Zapier",
  "Make.com",
  "n8n",
  "Supabase",
  "Pinecone",
  "Vercel",
] as const;

export const testimonials = [
  {
    quote:
      "Lead response speed exploded after launch. We went from hours to minutes without adding headcount.",
    name: "James Thornton",
    role: "CEO",
    company: "GrowthLab",
    region: "UK",
  },
  {
    quote:
      "Our workflows now run with almost zero manual work. The team finally focuses on clients, not admin.",
    name: "Sarah Mitchell",
    role: "Founder",
    company: "CloudDesk",
    region: "USA",
  },
  {
    quote:
      "Three times more booked consultations in month one. The nurture sequences paid for the project in weeks.",
    name: "Omar Al-Rashid",
    role: "Director",
    company: "PropNest",
    region: "UAE",
  },
  {
    quote:
      "Content automation paid back in weeks. We publish more, rank faster, and spend less time in spreadsheets.",
    name: "Emma Clarke",
    role: "CMO",
    company: "Vibe Agency",
    region: "Australia",
  },
] as const;
