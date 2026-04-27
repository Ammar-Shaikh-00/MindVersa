import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogProgress } from "@/components/blog-progress";
import { ShareButtons } from "@/components/share-buttons";
import { getPostBySlug, posts } from "@/lib/blog";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | NexorAI Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexorai.io"}/blog/${post.slug}`;

  return (
    <article className="mx-auto max-w-4xl px-4 py-24 md:px-8">
      <BlogProgress />
      <p className="text-sm tracking-[0.2em] text-[#00E5FF]">{post.category}</p>
      <h1 className="mt-2 text-5xl font-black">{post.title}</h1>
      <p className="mt-3 text-sm text-slate-400">{post.date} · {post.readTime}</p>
      <div className="mt-8 space-y-6 text-lg text-slate-200">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <ShareButtons shareUrl={shareUrl} />
      <section className="mt-16">
        <h2 className="text-3xl font-black">Related Posts</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {related.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} className="glass rounded-xl p-4">
              <p className="text-xs text-[#00E5FF]">{item.category}</p>
              <p className="mt-2 text-lg font-black">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
