"use client";

import Link from "next/link";

export function ShareButtons({ shareUrl }: { shareUrl: string }) {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <Link
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
        className="rounded-lg border border-white/20 px-4 py-2 text-sm"
      >
        Share on Twitter
      </Link>
      <Link
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        className="rounded-lg border border-white/20 px-4 py-2 text-sm"
      >
        Share on LinkedIn
      </Link>
      <button
        className="rounded-lg border border-white/20 px-4 py-2 text-sm"
        onClick={() => navigator.clipboard.writeText(shareUrl)}
      >
        Copy Link
      </button>
    </div>
  );
}
