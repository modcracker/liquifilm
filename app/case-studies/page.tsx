import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, FileText, AlertTriangle, ArrowRight, ClipboardCheck } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import GlossaryParser from '@/components/GlossaryParser';
import type { Metadata } from 'next';

import restorersLightTable from '@/src/assets/images/restorers_light_table_1783060348379.webp';

export const metadata: Metadata = {
  title: 'Motion Picture Case Studies & Archival Reports | Liquifilm',
  description: 'Learn how film restoration and preservation projects are formally documented, tracking sprocket condition, chemical washes, and high-fidelity scanning metrics.',
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'Motion Picture Case Studies & Archival Reports | Liquifilm',
    description: 'Learn how film restoration and preservation projects are formally documented, tracking sprocket condition, chemical washes, and high-fidelity scanning metrics.',
    url: '/case-studies',
    type: 'website',
  },
};

export default function CaseStudiesExplainerPage() {
  const siteUrl = "https://www.liquifilm.com";
  const pageUrl = `${siteUrl}/case-studies`;

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
        "name": "Case Studies Framework",
        "item": pageUrl
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": pageUrl,
    "name": "Case Study Framework: Film Restoration Documentation",
    "description": "Explainer on how motion picture restoration projects are formally documented, tracking physical conditions, chemicals, and scanning metrics."
  };

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
            <span className="text-neutral-900 font-semibold">Case Studies Framework</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-mono font-semibold text-neutral-800 border border-neutral-200">
                <FileText className="h-3.5 w-3.5 text-neutral-600" /> Archival Methodology
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Film Restoration Case Studies Framework
              </h1>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-600">
                An educational blueprint detailing how professional moving image restorations are scientifically documented, peer-reviewed, and published inside the global archival community.
              </p>
            </div>
            <div className="lg:col-span-5 relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm group">
              <Image 
                src={restorersLightTable} 
                alt="Film preservationists inspecting vintage film reels at a light table"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                fill
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Note Box */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-12">
        {/* CRITICAL ACCURACY NOTE BANNER */}
        <div className="mb-10 rounded-xl border border-amber-300 bg-amber-50/75 p-5 flex gap-4 items-start shadow-3xs">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-950">Accuracy Constraint Disclaimer</h4>
            <p className="text-xs md:text-sm text-amber-900 mt-1 leading-relaxed">
              <strong>Details on this page are limited to independently verified facts. [Site owner]: expand with researched specifics before publishing further.</strong>
            </p>
          </div>
        </div>

        {/* Informative Explainer Sections */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-3xs space-y-8">
          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold text-neutral-900 flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-neutral-500" /> Structure of an Archival Case Study
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-neutral-600">
              <GlossaryParser text="A formal restoration case study serves as a permanent record of the technical choices made during a film's rescue. It allows other preservationists to evaluate the chemical stability and historical integrity of the resulting masters. A standard, peer-reviewed case study contains four core pillars:" />
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-neutral-150 bg-neutral-50/50">
              <h3 className="font-display text-sm font-bold text-neutral-900">1. Sourcing and Physical Elements Assessment</h3>
              <p className="text-xs md:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                <GlossaryParser text="The study details all surviving film rolls located globally (original camera negatives, interpositives, or distribution prints). It documents physical decay metrics, such as shrinkage percentage, vinegar syndrome level, emulsion mold, and perforation damage." />
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-150 bg-neutral-50/50">
              <h3 className="font-display text-sm font-bold text-neutral-900">2. Pre-Scan Chemical and Mechanical Preparation</h3>
              <p className="text-xs md:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                <GlossaryParser text="Documents the labor intensive preparation steps, including hand-splicing broken edits, reconstructing torn sprockets, manual chemical cleaning, and ultrasonic cleaning parameters used to stabilize the material prior to scanning." />
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-150 bg-neutral-50/50">
              <h3 className="font-display text-sm font-bold text-neutral-900">3. Optical Scanning & Liquid Wet Gate Configuration</h3>
              <p className="text-xs md:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                <GlossaryParser text="Describes the specific scanning gear (e.g., continuous-motion capstan scanner), scanning spatial resolution (2K/4K/8K), and whether a liquid wet gate was utilized. It tracks the specific chemical index-matching fluid used to optically neutralize physical scratches during capture." />
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-150 bg-neutral-50/50">
              <h3 className="font-display text-sm font-bold text-neutral-900">4. Digital Restoration, Grading, and Mastering Parameters</h3>
              <p className="text-xs md:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                <GlossaryParser text="Documents the software workflows, including flicker correction, image stabilization thresholds, digital regrading color spaces (e.g., ACES), and the file formats exported for archival preservation (e.g., uncompressed DPX) and commercial release." />
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-6 space-y-3">
            <h3 className="font-display text-sm font-bold text-neutral-900">Why Unattributed Frameworks Matter</h3>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">
              <GlossaryParser text="In order to protect technical accuracy, liquifilm.com does not publish invented or unverified claims about specific corporate restoration projects. This framework is designed to provide a pristine, standardized template ready to accept authentic, meticulously researched case reports in future updates as they are verified independently by archival authorities." />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
