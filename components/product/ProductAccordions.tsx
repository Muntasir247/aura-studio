"use client";

import { Accordion, AccordionGroup } from "@/components/ui/Accordion";

interface ProductAccordionsProps {
  description: string;
  fabricAndCare: string[];
  shippingInfo: string;
}

export function ProductAccordions({
  description,
  fabricAndCare,
  shippingInfo,
}: ProductAccordionsProps) {
  return (
    <AccordionGroup className="divide-y divide-outline-variant/30">
      <Accordion title="DESCRIPTION" defaultOpen>
        <p>{description}</p>
      </Accordion>
      <Accordion title="FABRIC & CARE">
        <ul className="list-disc pl-4 space-y-1">
          {fabricAndCare.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Accordion>
      <Accordion title="SHIPPING & RETURNS">
        <p>{shippingInfo}</p>
      </Accordion>
    </AccordionGroup>
  );
}
