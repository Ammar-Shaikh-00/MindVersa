import Link from "next/link";

const COL_COMPANY = [
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

const COL_SERVICES = [
  { href: "/#services", label: "ML Models" },
  { href: "/#services", label: "Data Analytics" },
  { href: "/#services", label: "AI Automation" },
  { href: "/#services", label: "Computer Vision" },
];

const COL_CONNECT = [
  { href: "https://www.linkedin.com/", label: "LinkedIn", external: true },
  { href: "https://github.com/", label: "GitHub", external: true },
  { href: "https://x.com/", label: "Twitter / X", external: true },
  { href: "https://www.upwork.com/", label: "Upwork", external: true },
];

const COL_LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <p
        className="text-[11px] font-semibold uppercase tracking-[2px]"
        style={{ color: "var(--text-muted)" }}
      >
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[14px] leading-snug transition-colors duration-150 hover:text-[var(--text-primary)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-[14px] leading-snug transition-colors duration-150 hover:text-[var(--text-primary)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        background: "#030407",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-x pt-14 pb-8 md:pt-16 md:pb-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex font-display text-[22px] font-extrabold tracking-tight">
              <span style={{ color: "var(--text-primary)" }}>Nexor</span>
              <span style={{ color: "var(--accent-cyan)" }}>AI</span>
            </Link>
            <p className="mt-4 text-[14px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
              AI and ML engineering for production systems — from data pipelines to deployed models.
            </p>
            <a
              href="mailto:hello@nexorai.io"
              className="mt-5 inline-block text-[14px] font-medium transition-colors duration-150 hover:text-[var(--accent-cyan)]"
              style={{ color: "var(--text-primary)" }}
            >
              hello@nexorai.io
            </a>
            <p className="mt-2 text-[12px]" style={{ color: "var(--text-muted)" }}>
              US · UK · EU · AUS · Middle East
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-6 lg:gap-x-10">
            <FooterColumn title="Company" items={COL_COMPANY} />
            <FooterColumn title="Services" items={COL_SERVICES} />
            <FooterColumn title="Connect" items={COL_CONNECT} />
            <FooterColumn title="Legal" items={COL_LEGAL} />
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-4 border-t pt-8 md:mt-14 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
            © {year} NexorAI. All rights reserved.
          </p>
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
            Built for teams that need AI shipped, not slideware.
          </p>
        </div>
      </div>
    </footer>
  );
}
