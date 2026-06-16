import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Syne } from "next/font/google";
import { CustomCursor } from "@/components/cursor";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Noise } from "@/components/noise";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  preload: true,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
  preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexorai.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NexorAI — AI/ML Engineering & Data Science Agency",
    template: "%s | NexorAI",
  },
  description:
    "Custom ML models, data pipelines, computer vision, NLP systems, and full-stack AI software. 50+ projects delivered worldwide.",
  keywords: [
    "AI ML engineering agency",
    "machine learning development",
    "data science consulting",
    "computer vision solutions",
    "NLP development",
    "custom AI software",
    "data pipeline engineering",
    "MLOps consulting",
    "hire ML engineer",
    "AI automation agency",
  ],
  authors: [{ name: "NexorAI", url: SITE_URL }],
  creator: "NexorAI",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "NexorAI",
    title: "NexorAI — AI/ML Engineering & Data Science Agency",
    description:
      "Custom ML models, data pipelines, computer vision, NLP systems, and full-stack AI software.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NexorAI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexorAI — AI/ML Engineering & Data Science Agency",
    description:
      "Custom ML models, data pipelines, computer vision, NLP systems, and full-stack AI software.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-bg-primary text-text-primary antialiased">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        <CustomCursor />
        <Noise />
        <Navbar />
        <main className="pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
