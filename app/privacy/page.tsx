import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MindVersa privacy policy and data handling practices.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 md:px-8">
      <h1 className="text-4xl font-black">Privacy Policy</h1>
      <p className="mt-4 text-slate-300">
        MindVersa processes your information solely to deliver requested services, communicate updates, and improve performance.
      </p>
    </section>
  );
}
