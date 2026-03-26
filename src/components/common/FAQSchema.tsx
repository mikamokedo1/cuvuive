"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

/**
 * AEO-optimized FAQ component that renders:
 * 1. FAQPage JSON-LD structured data for AI answer engines
 * 2. Visual accordion FAQ section for users
 */
export function FAQSchema({ items, title, subtitle }: FAQSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <section className="py-24 bg-gradient-to-b from-white to-orange-50/30" id="faq">
        <div className="container mx-auto px-6 max-w-4xl">
          {title && (
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 tracking-tight">
                {title}
              </h2>
              {subtitle && <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
            </div>
          )}
          <div className="space-y-4">
            {items.map((item, index) => (
              <FAQAccordionItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FAQAccordionItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold text-slate-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-slate-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
