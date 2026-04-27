import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | NexorAI",
  description: "Terms and service scope for NexorAI engagements.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 md:px-8">
      <h1 className="text-4xl font-black">Terms of Service</h1>
      <p className="mt-4 text-slate-300">
        Project timelines, support scope, service levels, and billing terms are provided in signed client agreements.
      </p>
    </section>
  );
}
