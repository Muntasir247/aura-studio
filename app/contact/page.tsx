"use client";

import { useState } from "react";
import { Accordion, AccordionGroup } from "@/components/ui/Accordion";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const INQUIRY_CATEGORIES = [
  { value: "general", label: "General Inquiry" },
  { value: "order", label: "Order Support" },
  { value: "styling", label: "Styling Advice" },
  { value: "press", label: "Press & Media" },
  { value: "wholesale", label: "Wholesale" },
];

const CONCIERGE_DETAILS = [
  {
    icon: "phone",
    label: "Phone",
    value: "+1 (800) 555-VAULT",
    note: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: "mail",
    label: "Email",
    value: "concierge@thevault.com",
    note: "Response within 24 hours",
  },
  {
    icon: "chat",
    label: "Live Chat",
    value: "Available on website",
    note: "Mon–Fri, 10am–5pm EST",
  },
];

const FAQS = [
  {
    title: "How do I determine my size?",
    content:
      "Each product page includes a detailed size guide with measurements in both inches and centimeters. We recommend measuring a well-fitting garment you already own and comparing those measurements to our chart. For personalized assistance, book a virtual styling consultation with our concierge.",
  },
  {
    title: "What is your return policy?",
    content:
      "We accept returns within 14 days of delivery for items in original condition with all tags attached. Items must be unworn, unwashed, and free of any marks or fragrances. Sale items are final sale. Visit our Shipping & Returns page for full details.",
  },
  {
    title: "Do you offer international shipping?",
    content:
      "Yes, we ship to over 60 countries worldwide. Complimentary express shipping is available on orders over $300. International orders may be subject to duties and taxes, which are the responsibility of the recipient.",
  },
  {
    title: "Can I modify or cancel my order?",
    content:
      "Orders can be modified or cancelled within 2 hours of placement. After this window, our fulfillment team begins processing. Contact our concierge team immediately if you need to make changes.",
  },
  {
    title: "Do you offer gift wrapping?",
    content:
      "Every THE VAULT order arrives in our signature packaging: a matte obsidian box with embossed logo, archival tissue paper, and a reusable dust bag for accessories. Complimentary gift messaging is available at checkout.",
  },
  {
    title: "How do I care for my THE VAULT pieces?",
    content:
      "Each garment includes specific care instructions on its label. As a general rule: dry clean tailored pieces, hand wash silk and cashmere in cold water, and store knitwear folded (never hung) to preserve shape. We recommend cedar blocks for wool storage.",
  },
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState("general");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-[72px] min-h-screen bg-surface">
      {/* Hero */}
      <section className="py-section-gap bg-surface-container-lowest border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-4">
            Get in Touch
          </p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
            Contact Us
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-4 max-w-xl mx-auto">
            Our concierge team is here to assist with styling, orders, and any
            questions you may have.
          </p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-7">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-8">
              Send a Message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-6 text-center bg-surface-container-lowest border border-outline-variant/30 rounded-lg">
                <span className="material-symbols-outlined text-[56px] text-primary">
                  check_circle
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Message Sent
                </h3>
                <p className="font-body-md text-on-surface-variant max-w-md">
                  Thank you for reaching out. Our concierge team will respond within
                  24 hours.
                </p>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Inquiry category */}
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-3">
                    INQUIRY TYPE
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setInquiryType(cat.value)}
                        className={`px-4 py-2 rounded-full font-label-caps text-label-caps border transition-colors ${
                          inquiryType === cat.value
                            ? "bg-primary text-on-primary border-primary"
                            : "border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input variant="enclosed" label="First Name" placeholder="Alexandra" required />
                  <Input variant="enclosed" label="Last Name" placeholder="Sterling" required />
                </div>
                <Input
                  variant="enclosed"
                  label="Email"
                  type="email"
                  placeholder="alex@studio.com"
                  required
                />
                <Input
                  variant="enclosed"
                  label="Order Number (optional)"
                  placeholder="AST-XXXXX-XXXX"
                />
                <Textarea
                  variant="enclosed"
                  label="Message"
                  placeholder="How can we help you?"
                  rows={5}
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="py-4"
                  icon="send"
                  iconPosition="right"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Right: Concierge + FAQ */}
          <div className="lg:col-span-5">
            {/* Concierge */}
            <div className="mb-12">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Concierge
              </h2>
              <div className="flex flex-col gap-6">
                {CONCIERGE_DETAILS.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-primary">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-label-caps text-label-caps text-on-surface-variant">
                        {item.label}
                      </p>
                      <p className="font-body-md text-primary font-medium">
                        {item.value}
                      </p>
                      <p className="text-sm text-on-surface-variant/70">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
                Frequently Asked Questions
              </h2>
              <AccordionGroup>
                {FAQS.map((faq) => (
                  <Accordion key={faq.title} title={faq.title}>
                    <p>{faq.content}</p>
                  </Accordion>
                ))}
              </AccordionGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
