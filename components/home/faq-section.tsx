import Link from "next/link";
import { faqItems } from "@/lib/home-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionReveal } from "@/components/section-reveal";

export function FaqSection() {
  return (
    <section className="section-block bg-[#05070F]">
      <div className="section-inner">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <p className="section-label text-center">QUESTIONS</p>
            <h2 className="section-title text-center">Frequently Asked Questions</h2>
            <p className="section-body mx-auto mt-4 max-w-xl text-center">
              Straight answers about timelines, integrations, and how we work with your team.
            </p>
          </SectionReveal>

          <SectionReveal className="mt-12" delay={0.05}>
            <div className="rounded-2xl border border-white/[0.06] bg-[#0B0E1A]/80 px-5 sm:px-8">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`faq-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SectionReveal>

          <SectionReveal className="mt-10 text-center" delay={0.1}>
            <p className="section-body text-sm">
              Still have questions?{" "}
              <Link href="#contact" className="font-medium text-[#00E5FF] transition-colors hover:text-[#7B61FF]">
                Talk to our team →
              </Link>
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
