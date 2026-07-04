'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ChevronRight, Home, Info } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { FAQ_DATA } from '@/lib/data';

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const siteUrl = "https://liquifilm.com";
  const pageUrl = `${siteUrl}/faq`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FAQ Database",
        "item": pageUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full font-sans pb-16">
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={faqSchema} />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-100 py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-900 font-semibold">FAQ Database</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-neutral-200 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1 rounded bg-neutral-900 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
              Self-Serve Support
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Technical FAQ Database
            </h1>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-600">
              Find technical answers to critical questions about chemical indexing safety, physical film decomposition stages, sprocket stress calculations, and preservation parameters.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Core Container */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-12">
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-3xs"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-neutral-900 hover:bg-neutral-50/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-start gap-3.5 pr-4 text-sm md:text-base">
                    <HelpCircle className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-neutral-100"
                    >
                      <div className="p-5 text-sm md:text-base text-neutral-600 leading-relaxed bg-neutral-50/30">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic reference notice */}
        <div className="mt-12 p-5 rounded-xl border border-neutral-250 bg-neutral-100/50 flex gap-3.5 items-start">
          <Info className="h-5 w-5 text-neutral-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display text-sm font-bold text-neutral-800">Need Specialized Clarifications?</h4>
            <p className="text-xs text-neutral-500 leading-relaxed mt-1">
              If your specific engineering or chemistry concern is not detailed here, refer to our comprehensive <strong>73-term Technical Glossary</strong> or consult historical bulletins published by the <strong>FIAF Technical Commission</strong>.
            </p>
            <div className="mt-4">
              <Link
                href="/glossary"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:underline"
              >
                Go to the Technical Glossary <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
