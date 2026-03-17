"use client";

import type { SanityFAQ } from "@/types/sanity";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

interface FAQAccordionProps {
  faqs: SanityFAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type="multiple" className="divide-y divide-cream-dark border border-cream-dark rounded-xl overflow-hidden bg-white">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={String(faq.id)}
          className="px-6 border-b-0"
        >
          <AccordionTrigger className="py-5 text-[15px] font-medium text-navy">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-navy/70 leading-relaxed pb-5 pt-0 text-sm">
            <div
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
