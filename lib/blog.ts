export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: "AI Automation" | "Business Growth" | "Case Studies";
  readTime: string;
  excerpt: string;
  content: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "how-ai-chatbots-replace-support-2025",
    title: "How AI Chatbots Are Replacing Customer Support Teams in 2025",
    date: "2026-04-20",
    category: "AI Automation",
    readTime: "7 min read",
    excerpt: "AI chatbot systems now resolve complex support queries with lower response times and higher CSAT.",
    content: [
      "In 2025, support leaders are shifting from ticket-based models to AI-first resolution systems.",
      "The best implementations blend retrieval, agent handoff logic, and CRM context.",
      "Teams that connect chatbot telemetry to revenue and retention metrics see stronger ROI.",
      "Businesses still need human specialists, but automation now handles most first-line operations.",
    ],
  },
  {
    slug: "ai-workflows-for-saas-growth",
    title: "AI Workflows for SaaS Growth: What Actually Moves Revenue",
    date: "2026-04-14",
    category: "Business Growth",
    readTime: "5 min read",
    excerpt: "A practical framework for SaaS founders implementing AI automation without adding complexity.",
    content: ["Placeholder."],
  },
  {
    slug: "case-study-real-estate-ai-nurture",
    title: "Case Study: Real Estate Lead Nurture Automation That Tripled Bookings",
    date: "2026-04-08",
    category: "Case Studies",
    readTime: "6 min read",
    excerpt: "How a UAE agency used AI lead qualification to book more consultations in month one.",
    content: ["Placeholder."],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
