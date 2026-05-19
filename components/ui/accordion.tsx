"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-white/[0.06] last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 text-left font-sans text-base font-medium leading-snug text-[#F0F4FF] transition-colors duration-200 hover:text-[#00E5FF] sm:text-[1.0625rem] sm:py-6 [&[data-state=open]]:text-[#00E5FF]",
          className,
        )}
        {...props}
      >
        <span className="pr-2">{children}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-colors duration-200 group-hover:border-[#00E5FF]/25 group-data-[state=open]:border-[#00E5FF]/35 group-data-[state=open]:bg-[#00E5FF]/[0.08]">
          <Plus className="h-4 w-4 text-[#8892A4] transition-transform duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:text-[#00E5FF]" strokeWidth={2} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-6 pr-12 font-sans text-[0.9375rem] leading-[1.7] text-[#8892A4] sm:pb-7", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
