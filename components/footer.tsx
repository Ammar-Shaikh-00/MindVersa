import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#05070F]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="text-2xl font-black">
            Nexor<span className="text-[#FF6B35]">AI</span>
          </p>
          <p className="mt-3 text-sm text-slate-300">
            We Build AI That Grows Your Business
          </p>
          <p className="mt-4 text-sm text-slate-400">Built with ❤️ and a lot of AI</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-300 sm:max-w-xs">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-[#00E5FF]">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-start gap-4">
          <Link href="https://linkedin.com" className="text-slate-300 hover:text-[#00E5FF]">LinkedIn</Link>
          <Link href="https://twitter.com" className="text-slate-300 hover:text-[#00E5FF]">Twitter/X</Link>
          <Link href="https://github.com" className="text-slate-300 hover:text-[#00E5FF]">GitHub</Link>
          <Link href="https://upwork.com" aria-label="Upwork" className="text-slate-300 hover:text-[#00E5FF]">
            Upwork
          </Link>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} NexorAI. All rights reserved.
      </p>
    </footer>
  );
}
