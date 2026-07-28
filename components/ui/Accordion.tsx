"use client";

import { useState } from "react";

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

/** Single-open accordion. First item starts expanded so content is visible without interaction. */
export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--border-default)] rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `contact-faq-button-${index}`;
        const panelId = `contact-faq-panel-${index}`;

        return (
          <div key={item.question}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex min-h-11 w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-sakura-ink focus-visible:outline-offset-2 md:text-base"
            >
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className={`shrink-0 text-lg text-sakura-ink transition-transform motion-reduce:transition-none ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-6 pb-4 text-sm text-[var(--text-secondary)] md:text-base"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
