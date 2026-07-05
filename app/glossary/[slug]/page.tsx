import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Home, ArrowLeft, Tag, HelpCircle, CornerDownRight } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { GLOSSARY_TERMS } from '@/lib/data';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = GLOSSARY_TERMS.find((t) => t.slug === slug);
  if (!term) return {};

  return {
    title: `${term.title} - Film Preservation Glossary | Liquifilm`,
    description: term.shortDefinition,
    alternates: {
      canonical: `/glossary/${term.slug}`,
    },
    openGraph: {
      title: `${term.title} - Film Preservation Glossary | Liquifilm`,
      description: term.shortDefinition,
      url: `/glossary/${term.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return GLOSSARY_TERMS.map((term) => ({
    slug: term.slug,
  }));
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const termIdx = GLOSSARY_TERMS.findIndex((t) => t.slug === slug);
  
  if (termIdx === -1) {
    notFound();
  }

  const term = GLOSSARY_TERMS[termIdx];
  const relatedTerms = GLOSSARY_TERMS.filter((t) => t.category === term.category && t.slug !== term.slug).slice(0, 5);

  const siteUrl = "https://www.liquifilm.com";
  const pageUrl = `${siteUrl}/glossary/${term.slug}`;

  // Schemas
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
        "name": "Technical Glossary",
        "item": `${siteUrl}/glossary`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": term.title,
        "item": pageUrl
      }
    ]
  };

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": pageUrl,
    "name": term.title,
    "description": term.shortDefinition,
    "inDefinedTermSet": `${siteUrl}/glossary`
  };

  return (
    <div className="w-full font-sans pb-16">
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={definedTermSchema} />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-100 py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/glossary" className="hover:text-neutral-900">
              Technical Glossary
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-900 font-semibold truncate max-w-xs">{term.title}</span>
          </nav>
        </div>
      </div>

      {/* Glossary Term Content Layout */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Content Card */}
          <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-3xs">
            <Link
              href="/glossary"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 hover:text-neutral-950 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Return to Glossary Index
            </Link>

            <header className="border-b border-neutral-150 pb-5 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-800 border border-neutral-200">
                <Tag className="h-3.5 w-3.5" /> {term.categoryLabel}
              </span>
              <h1 className="mt-4 font-display text-2xl md:text-3.5xl font-bold tracking-tight text-neutral-900 leading-tight">
                {term.title}
              </h1>
            </header>

            {/* Structured Definition Callout */}
            <div className="rounded-xl border border-neutral-350 bg-neutral-50/50 p-6 mb-8">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5 mb-2">
                <HelpCircle className="h-4 w-4" /> Core Term Definition
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-neutral-900 font-semibold">
                {term.shortDefinition}
              </p>
            </div>

            {/* Deep Technical Explainer */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-1.5">
                Technical Analysis & Context
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-neutral-700">
                {term.detailedExplainer}
              </p>
            </div>
          </div>

          {/* Related Terms Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-3xs">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-200 pb-2.5 mb-4">
                More in {term.categoryLabel}
              </h3>
              {relatedTerms.length > 0 ? (
                <div className="space-y-3">
                  {relatedTerms.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/glossary/${rel.slug}`}
                      className="block p-3 rounded-lg border border-neutral-150 bg-neutral-50/20 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                    >
                      <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                        <CornerDownRight className="h-3.5 w-3.5 text-neutral-400 shrink-0" /> {rel.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                        {rel.shortDefinition}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 font-mono">No other terms codified in this category.</p>
              )}
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-900 text-white p-6 shadow-3xs">
              <h4 className="font-display text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">Verifiable Science</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Glossary definitions are curated and verified against authoritative archives and motion picture engineering specifications.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
