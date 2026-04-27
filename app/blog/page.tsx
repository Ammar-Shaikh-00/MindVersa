import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "NexorAI Blog | AI Automation Insights",
  description: "Insights on AI automation, business growth, and case studies from NexorAI.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <h1 className="text-5xl font-black">NexorAI Blog</h1>
      <p className="mt-4 text-slate-300">Actionable AI automation playbooks for growth teams.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#00E5FF]">{post.category}</p>
            <h2 className="mt-2 text-2xl font-black leading-tight">{post.title}</h2>
            <p className="mt-3 text-sm text-slate-300">{post.excerpt}</p>
            <p className="mt-4 text-xs text-slate-400">{post.date} · {post.readTime}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm text-[#00E5FF]">
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
