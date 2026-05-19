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
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#05070F]">
      <div className="site-container grid gap-8 py-12 sm:py-14 md:grid-cols-3">
        <div>
          <p className="font-heading text-[20px] font-extrabold tracking-tight">
            <span className="text-[#F0F4FF]">Nexor</span>
            <span className="text-[#00E5FF]">AI</span>
          </p>
          <p className="mt-3 font-sans text-sm font-normal leading-relaxed text-[#8892A4]">
            AI automation and revenue systems for teams that outgrow manual work.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-[#8892A4] sm:max-w-xs">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors duration-200 hover:text-[#F0F4FF]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-start gap-4 text-sm text-[#8892A4]">
          <Link href="https://linkedin.com" className="transition-colors duration-200 hover:text-[#00E5FF]">
            LinkedIn
          </Link>
          <Link href="https://twitter.com" className="transition-colors duration-200 hover:text-[#00E5FF]">
            Twitter/X
          </Link>
          <Link href="https://github.com" className="transition-colors duration-200 hover:text-[#00E5FF]">
            GitHub
          </Link>
          <Link href="https://upwork.com" aria-label="Upwork" className="transition-colors duration-200 hover:text-[#00E5FF]">
            Upwork
          </Link>
        </div>
      </div>
      <p className="border-t border-white/[0.06] py-4 text-center text-xs text-[#8892A4]">
        © {new Date().getFullYear()} NexorAI. All rights reserved.
      </p>
    </footer>
  );
}
