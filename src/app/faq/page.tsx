'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

import { faqSections } from '@/modules/support/faq-data';

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      {/* Page heading */}
      <header className="mb-10 space-y-2">
        <p className="text-xl font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Help & Support
        </p>
        <h1 className="text-xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="max-w-xl text-xl text-muted-foreground">
          Answers to common questions about Brown Bear Pedals – from power
          requirements and warranty details to shipping and returns. Click a
          question to expand the answer.
        </p>
      </header>

      {/* Sections */}
      <div className="space-y-10">
        {faqSections.map((section) => (
          <section
            key={section.id}
            className="border-t border-border pt-8 first:border-t-0 first:pt-0"
          >
            <div className="mb-4 space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">
                {section.title}
              </h2>
              {section.description && (
                <p className="text-lg text-muted-foreground">
                  {section.description}
                </p>
              )}
            </div>

            <Accordion
              type="single"
              collapsible
              className="w-full divide-y divide-border rounded-md border border-border/60 bg-card"
            >
              {section.items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={`${section.id}-${item.id}`}
                  className="border-0"
                >
                  <AccordionTrigger className="px-4 py-3 text-left text-xl font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-lg text-muted-foreground whitespace-pre-line">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>
    </main>
  );
}
