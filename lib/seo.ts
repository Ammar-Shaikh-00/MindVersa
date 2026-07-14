import { BRAND_NAME, CONTACT_EMAIL, SITE_URL } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/faq";

export const SITE_DESCRIPTION =
  "MindVersa builds end-to-end AI software — chatbots, automation, custom models, data platforms, and production systems for growing businesses worldwide.";

export const PRIMARY_KEYWORDS = [
  "hire ML engineer",
  "custom machine learning development",
  "AI ML engineering agency",
  "computer vision solutions",
  "AI chatbot development for SaaS",
  "data pipeline consulting",
  "MLOps consulting",
  "automate customer support with AI",
  "RAG chatbot development",
  "fraud detection machine learning",
  "hire AI automation expert",
  "workflow automation services",
];

const BRAND_IMAGE = `${SITE_URL}/opengraph-image`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: BRAND_IMAGE,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    areaServed: ["US", "GB", "EU", "AU", "Middle East"],
    priceRange: "$$",
    sameAs: [],
    serviceType: [
      "AI Software Development",
      "Machine Learning Development",
      "Computer Vision",
      "NLP and AI Chatbots",
      "Data Engineering",
      "MLOps Consulting",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
    inLanguage: "en-US",
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
}) {
  const url = `${SITE_URL}/blog/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    image: [BRAND_IMAGE],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${SITE_URL}${item.path}`,
    })),
  };
}

/** ISO date helpers for posts that use "Mon DD, YYYY" */
export function toIsoDate(label: string): string {
  const d = new Date(label);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}
