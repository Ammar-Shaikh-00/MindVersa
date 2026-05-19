import { techNames } from "@/lib/home-data";
import { SectionReveal } from "@/components/section-reveal";

export function TechStripSection() {
  return (
    <section className="section-block bg-[#0B0E1A]">
      <div className="section-inner">
        <SectionReveal>
          <p className="section-label text-center">POWERED BY CUTTING-EDGE AI</p>
          <p className="section-body mx-auto mt-4 max-w-2xl text-center text-[#8892A4]">
            Models and platforms we integrate, monitor, and ship to production for clients worldwide.
          </p>
        </SectionReveal>
        <SectionReveal className="mt-8" delay={0.05}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {techNames.map((item) => (
              <div
                key={item}
                className="glass rounded-xl p-4 text-center text-sm text-[#8892A4] transition-[color,border-color,transform] duration-200 hover:border-[rgba(0,229,255,0.25)] hover:text-[#00E5FF] motion-safe:hover:-translate-y-0.5"
              >
                {item}
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
