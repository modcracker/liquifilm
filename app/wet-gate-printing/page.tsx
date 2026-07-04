import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, ArrowRight, Home, ChevronRight, CheckCircle, Database } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { WET_GATE_PAGES } from '@/lib/data';
import type { Metadata } from 'next';

import filmScratchMacro from '@/src/assets/images/film_scratch_macro_1783060324701.webp';

export const metadata: Metadata = {
  title: 'Wet Gate Printing & Liquid Gate Systems | Liquifilm',
  description: 'In-depth guide to wet gate printing and liquid gate scanning. Explore refractive index matching, chemical solvents, open-face systems, and physical scratch mitigation.',
  alternates: {
    canonical: '/wet-gate-printing',
  },
  openGraph: {
    title: 'Wet Gate Printing & Liquid Gate Systems | Liquifilm',
    description: 'In-depth guide to wet gate printing and liquid gate scanning. Explore refractive index matching, chemical solvents, open-face systems, and physical scratch mitigation.',
    url: '/wet-gate-printing',
  },
};

export default function WetGateIndexPage() {
  const siteUrl = "https://liquifilm.com";
  const sectionUrl = `${siteUrl}/wet-gate-printing`;

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
        "name": "Wet Gate Printing",
        "item": sectionUrl
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": sectionUrl,
    "name": "Wet Gate Printing: Core Technical Library",
    "description": "Comprehensive guide to liquid gate optical physics, equipment, and chemicals. Find articles on Perchloroethylene, ARRISCAN systems, and scratch match dynamics."
  };

  // Group pages by category for an elegant, highly structured layout
  const categories = Array.from(new Set(WET_GATE_PAGES.map(p => p.category)));

  return (
    <div className="w-full font-sans pb-16">
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={webPageSchema} />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-100 py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-900 font-semibold">Wet Gate Printing</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-neutral-200 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1 rounded bg-neutral-900 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                Flagship Directory
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Wet Gate Printing Technical Library
              </h1>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-600">
                The optical wet gate represents the most robust solution for scanning or printing scratched, shrunk, and physically damaged motion picture film elements. This technical library documents the physics of index-matching fluids, mechanical gate designs, safety regulations, and hybrid workflows.
              </p>
            </div>
            <div className="lg:col-span-5 relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm group">
              <Image 
                src={filmScratchMacro} 
                alt="35mm Film Scratch Mitigation under macro lens"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                fill
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Articles Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content Area: Articles listed by Category */}
          <div className="lg:col-span-3 space-y-12">
            {categories.map((category) => {
              const pages = WET_GATE_PAGES.filter(p => p.category === category);
              return (
                <div key={category} className="space-y-4">
                  <h2 className="font-display text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" /> {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pages.map((page) => (
                      <Link
                        key={page.slug}
                        href={`/wet-gate-printing/${page.slug}`}
                        className="group flex flex-col justify-between p-5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-2xs transition-all"
                      >
                        <div>
                          <h3 className="font-display text-sm font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                            {page.title}
                          </h3>
                          <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                            {page.summary}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 group-hover:text-neutral-800 transition-colors">
                          <span>Article / Technical</span>
                          <span className="inline-flex items-center gap-1 font-semibold">
                            Read Article <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Area: Quick Reference Metrics */}
          <div className="space-y-8">
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-1.5">
                <Database className="h-4 w-4 text-neutral-500" /> Core Standards
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                All documented procedures are designed to meet or exceed recommendations from:
              </p>
              <ul className="space-y-2 text-xs font-mono text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-neutral-900 shrink-0" /> FIAF Technical Committee
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-neutral-900 shrink-0" /> SMPTE Film Gauges
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-neutral-900 shrink-0" /> ISO 18911 (Storage)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-neutral-900 shrink-0" /> OSHA Lab Standards
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-neutral-900 text-white p-6">
              <h3 className="font-display text-sm font-bold tracking-tight mb-2">Technical Questions?</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Not sure what chemical indexing solvent fits your archive scanner? Review our exhaustive, cross-referenced glossary or read our hiring guidelines.
              </p>
              <div className="space-y-2">
                <Link
                  href="/glossary"
                  className="flex w-full items-center justify-center gap-1.5 rounded bg-white hover:bg-neutral-100 py-2 text-center text-xs font-semibold text-neutral-900 transition-colors"
                >
                  Search Glossary
                </Link>
                <Link
                  href="/hiring/cost-factors"
                  className="flex w-full items-center justify-center gap-1.5 rounded border border-neutral-700 hover:border-neutral-500 py-2 text-center text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                >
                  Understand Sourcing Costs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
