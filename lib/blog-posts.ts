export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  read: string;
  /** Primary SEO target phrase */
  focusKeyword: string;
};

export const POSTS: BlogPost[] = [
  {
    slug: "hire-ml-engineer-agency",
    title: "How to Hire an ML Engineering Agency (Without Wasting Budget)",
    excerpt:
      "A practical checklist for founders and CTOs evaluating custom machine learning partners — scope, data readiness, delivery model, and red flags.",
    tag: "Buying Guide",
    date: "Jul 14, 2026",
    read: "8 min read",
    focusKeyword: "hire ML engineer",
  },
  {
    slug: "ai-chatbot-for-saas",
    title: "AI Chatbots for SaaS Companies: What Actually Works in Production",
    excerpt:
      "How SaaS teams ship support and onboarding assistants that reduce ticket volume without hallucinating product answers.",
    tag: "NLP / LLM",
    date: "Jul 10, 2026",
    read: "9 min read",
    focusKeyword: "AI chatbot for SaaS companies",
  },
  {
    slug: "automate-customer-support-ai",
    title: "How to Automate Customer Support with AI (Without Killing UX)",
    excerpt:
      "A staged playbook: classification, RAG answers, escalation rules, and the metrics that prove ROI.",
    tag: "Automation",
    date: "Jul 02, 2026",
    read: "8 min read",
    focusKeyword: "automate customer support AI",
  },
  {
    slug: "fraud-detection-99-accuracy",
    title: "How We Built a Fraud Detection Model with 99.1% Accuracy",
    excerpt:
      "A walk-through of the data pipeline, feature engineering, and XGBoost-based model that now blocks $2.3M of fraud annually for a US fintech.",
    tag: "ML Engineering",
    date: "Jun 12, 2026",
    read: "9 min read",
    focusKeyword: "fraud detection machine learning",
  },
  {
    slug: "computer-vision-manufacturing",
    title: "Computer Vision in Manufacturing: A Real Case Study",
    excerpt:
      "YOLOv8, edge inference, and the FastAPI service that cut QA costs by 67% at a UK industrial customer.",
    tag: "Computer Vision",
    date: "May 24, 2026",
    read: "7 min read",
    focusKeyword: "computer vision for manufacturing",
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs Fine-Tuning: Which Should You Choose in 2026?",
    excerpt:
      "When to retrieve, when to fine-tune, and when to do both. Practical guidance from production deployments.",
    tag: "NLP / LLM",
    date: "May 03, 2026",
    read: "11 min read",
    focusKeyword: "RAG chatbot development",
  },
];
