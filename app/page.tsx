import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "NexorAI | AI Automation Agency",
  description:
    "Custom AI automation for startups, ecommerce brands, SaaS, and SMBs across US, UK, Europe, Middle East, and Australia.",
};

export default function Home() {
  return <HomePage />;
}
