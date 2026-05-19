import { MARQUEE_ROW_ONE, MARQUEE_ROW_TWO } from "@/lib/home-data";
import { SectionReveal } from "@/components/section-reveal";

export function MarqueeSection() {
  return (
    <section className="section-block bg-[#0B0E1A]">
      <SectionReveal>
        <div className="section-inner glass overflow-hidden border-y border-white/6 py-5 sm:py-6">
          <div className="animate-[marquee_28s_linear_infinite] whitespace-nowrap px-2 text-base text-[#8892A4] sm:text-xl">
            {MARQUEE_ROW_ONE} {MARQUEE_ROW_ONE}
          </div>
          <div className="mt-2 animate-[marqueeReverse_26s_linear_infinite] whitespace-nowrap px-2 text-base text-[#00E5FF] sm:mt-3 sm:text-xl">
            {MARQUEE_ROW_TWO} {MARQUEE_ROW_TWO}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
