import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Syne } from "next/font/google";
import { CustomCursor } from "@/components/cursor";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexorai.io"),
  title: "NexorAI — AI Automation Agency for Growing Businesses",
  description:
    "We build custom AI systems, chatbots, and workflow automations that save time and drive revenue. Trusted by 50+ businesses worldwide.",
  keywords: [
    "AI automation agency",
    "AI chatbot development",
    "business automation",
    "workflow automation",
    "AI agency",
    "custom AI solutions",
  ],
  openGraph: {
    title: "NexorAI — AI Automation Agency for Growing Businesses",
    description:
      "Custom AI automation, intelligent chatbots, and revenue-driving workflows for businesses worldwide.",
    url: "https://nexorai.io",
    siteName: "NexorAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexorAI website preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nexorai",
    creator: "@nexorai",
    title: "NexorAI — AI Automation Agency",
    description:
      "We build AI that grows your business with automation systems and chatbots.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://nexorai.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden flex flex-col bg-[#05070F] text-white">
        <Script id="gtag-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID ?? "G-XXXXXXXXXX"}');
          `}
        </Script>
        <CustomCursor />
        <div className="noise-overlay" aria-hidden />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
