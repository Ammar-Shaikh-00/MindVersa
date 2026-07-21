import Link from "next/link";
import { Logo } from "@/components/logo";
import { CONTACT_EMAIL, CONTACT_MAILTO, SOCIAL_LINKS } from "@/lib/site";

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

const COL_CONNECT = SOCIAL_LINKS.map((s) => ({
  href: s.href,
  label: s.label,
  external: true as const,
}));

const COL_LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

function FooterColumn({
  title,
  items,
  linkStyle = "muted",
}: {
  title: string;
  items: { href: string; label: string; external?: boolean }[];
  linkStyle?: "muted" | "accent";
}) {
  const color =
    linkStyle === "accent" ? "var(--accent-cyan)" : "var(--text-secondary)";
  const hoverClass =
    linkStyle === "accent"
      ? "hover:opacity-80"
      : "hover:text-[var(--text-primary)]";

  return (
    <div>
      <p
        className="text-[12px] font-semibold uppercase tracking-[2px]"
        style={{ color: "var(--text-primary)" }}
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
                className={`text-[15px] leading-snug transition-all duration-150 ${hoverClass}`}
                style={{ color }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-[15px] leading-snug transition-colors duration-150 hover:text-[var(--text-primary)]"
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
            <Logo size="lg" />
            <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
              End-to-end AI software — chatbots, automation, data platforms, and custom systems for growing businesses.
            </p>
            <a
              href={CONTACT_MAILTO}
              className="mt-5 inline-block text-[15px] font-medium transition-colors duration-150 hover:text-[var(--accent-cyan)]"
              style={{ color: "var(--text-primary)" }}
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
              US · UK · EU · AUS · Middle East
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-6 lg:gap-x-10">
            <FooterColumn title="Company" items={COL_COMPANY} />
            <FooterColumn title="Services" items={COL_SERVICES} />
            <FooterColumn title="Connect" items={COL_CONNECT} linkStyle="accent" />
            <FooterColumn title="Legal" items={COL_LEGAL} />
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-4 border-t pt-8 md:mt-14 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
            © {year} MindVersa. All rights reserved.
          </p>
          <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
            Built for teams that need AI shipped, not slideware.
          </p>
        </div>
      </div>
    </footer>
  );
}
