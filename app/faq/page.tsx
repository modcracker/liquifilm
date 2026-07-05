import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Info } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { FAQ_DATA } from '@/lib/data';
import FAQClient from './faq-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical FAQ Database | Liquifilm',
  description: 'Find answers to technical questions about chemical indexing safety, physical film decomposition stages, sprocket stress, and preservation parameters.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Technical FAQ Database | Liquifilm',
    description: 'Find answers to technical questions about chemical indexing safety, physical film decomposition stages, sprocket stress, and preservation parameters.',
    url: '/faq',
    type: 'website',
  },
};

export default function FAQPage() {
  const siteUrl = "https://www.liquifilm.com";
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
        <FAQClient />

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
