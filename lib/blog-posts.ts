export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  read: string;
};

export const POSTS: BlogPost[] = [
  {
    slug: "fraud-detection-99-accuracy",
    title: "How We Built a Fraud Detection Model with 99.1% Accuracy",
    excerpt:
      "A walk-through of the data pipeline, feature engineering, and XGBoost-based model that now blocks $2.3M of fraud annually for a US fintech.",
    tag: "ML Engineering",
    date: "Jun 12, 2026",
    read: "9 min read",
  },
  {
    slug: "computer-vision-manufacturing",
    title: "Computer Vision in Manufacturing: A Real Case Study",
    excerpt:
      "YOLOv8, edge inference, and the FastAPI service that cut QA costs by 67% at a UK industrial customer.",
    tag: "Computer Vision",
    date: "May 24, 2026",
    read: "7 min read",
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs Fine-Tuning: Which Should You Choose in 2026?",
    excerpt:
      "When to retrieve, when to fine-tune, and when to do both. Practical guidance from production deployments.",
    tag: "NLP / LLM",
    date: "May 03, 2026",
    read: "11 min read",
  },
];
