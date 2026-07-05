import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Home, Key, ShieldAlert, ChevronLeft, ArrowRight, CornerDownRight, ScrollText } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { HIRING_PAGES } from '@/lib/data';
import TableOfContents from '@/components/TableOfContents';
import GlossaryParser from '@/components/GlossaryParser';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = HIRING_PAGES.find((p) => p.slug === slug);
  if (!page) return {};

  return {
    title: `${page.metaTitle || page.title} | Liquifilm`,
    description: page.metaDescription || page.summary,
    alternates: {
      canonical: `/hiring/${page.slug}`,
    },
    openGraph: {
      title: `${page.metaTitle || page.title} | Liquifilm`,
      description: page.metaDescription || page.summary,
      url: `/hiring/${page.slug}`,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  return HIRING_PAGES.map((page) => ({
    slug: page.slug,
  }));
}

export default async function HiringGuidePage({ params }: Props) {
  const { slug } = await params;
  const pageIdx = HIRING_PAGES.findIndex((p) => p.slug === slug);
  
  if (pageIdx === -1) {
    notFound();
  }

  const page = HIRING_PAGES[pageIdx];
  const prevPage = pageIdx > 0 ? HIRING_PAGES[pageIdx - 1] : null;
  const nextPage = pageIdx < HIRING_PAGES.length - 1 ? HIRING_PAGES[pageIdx + 1] : null;

  const siteUrl = "https://www.liquifilm.com";
  const pageUrl = `${siteUrl}/hiring/${page.slug}`;

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
        "name": "Hiring Guides",
        "item": `${siteUrl}/hiring/finding-a-service-provider`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.title,
        "item": pageUrl
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": page.title,
    "description": page.summary,
    "image": "https://picsum.photos/seed/liquifilm_hiring/1200/630",
    "articleSection": page.category || "Hiring Guidance",
    "publisher": {
      "@type": "Organization",
      "name": "Liquifilm",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/icon.png`
      }
    },
    "author": {
      "@type": "Organization",
      "name": "Liquifilm Archival Editorial Board"
    }
  };

  return (
    <div className="w-full font-sans pb-16">
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={articleSchema} />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-100 py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-500">Hiring Guides</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-900 font-semibold truncate max-w-xs">{page.title}</span>
          </nav>
        </div>
      </div>

      {/* Core Layout with Left Navigation Sidebar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Sidebar Navigation list */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-3xs">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-200 pb-2 mb-4 flex items-center gap-2">
                <ScrollText className="h-4 w-4 text-neutral-500" /> Sourcing Guides
              </h3>
              <div className="space-y-1">
                {HIRING_PAGES.map((hiringPage) => {
                  const active = hiringPage.slug === slug;
                  return (
                    <Link
                      key={hiringPage.slug}
                      href={`/hiring/${hiringPage.slug}`}
                      className={`block px-3 py-2 text-xs rounded-md transition-all border ${
                        active
                          ? 'bg-neutral-950 text-white font-semibold border-neutral-950 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 border-transparent'
                      }`}
                    >
                      {hiringPage.title.replace("How to ", "").replace("Understanding the ", "")}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div className="rounded-xl bg-neutral-900 text-white p-5 text-xs space-y-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-amber-500 text-neutral-905 font-bold font-mono">!</span>
              <h4 className="font-bold text-white">Fragility Warning</h4>
              <p className="text-neutral-400 leading-relaxed">
                Archival motion picture film can easily shred on standard high-tension projector gears. Never run unique assets on consumer equipment.
              </p>
            </div>
          </aside>

          {/* Main Article Body */}
          <article className="lg:col-span-6 bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-3xs">
            <header className="border-b border-neutral-150 pb-5 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-800 border border-neutral-200">
                Archival Checklist
              </span>
              <h1 className="mt-3 font-display text-xl md:text-2xl.5 font-bold tracking-tight text-neutral-900 leading-tight">
                {page.title}
              </h1>
              <p className="mt-3 text-xs md:text-sm text-neutral-500 font-mono italic leading-relaxed">
                {page.summary}
              </p>
            </header>

            {/* Introduction */}
            <p className="text-sm md:text-base leading-relaxed text-neutral-800 font-normal mb-8">
              <GlossaryParser text={page.introduction} />
            </p>

            {/* Table of Contents */}
            <TableOfContents />

            {/* Sections */}
            <div className="mt-8 space-y-8">
              {page.sections.map((sec, idx) => {
                const sectionId = sec.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');
                return (
                  <div key={idx} className="space-y-3">
                    <h2 id={sectionId} className="font-display text-base md:text-lg font-bold text-neutral-900 flex items-center gap-2 scroll-mt-24">
                      <CornerDownRight className="h-4 w-4 text-neutral-400 shrink-0" /> {sec.title}
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-neutral-700">
                      <GlossaryParser text={sec.body} />
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Article Navigation Pager */}
            <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row justify-between gap-4">
              {prevPage ? (
                <Link
                  href={`/hiring/${prevPage.slug}`}
                  className="flex-1 group flex items-start gap-3 p-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-3xs transition-all text-left"
                >
                  <ChevronLeft className="h-4 w-4 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] font-mono text-neutral-400 uppercase font-semibold">Previous Guide</span>
                    <span className="block text-xs font-bold text-neutral-900 mt-0.5 line-clamp-1">{prevPage.title}</span>
                  </div>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}

              {nextPage ? (
                <Link
                  href={`/hiring/${nextPage.slug}`}
                  className="flex-1 group flex items-start justify-between gap-3 p-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-3xs transition-all text-right"
                >
                  <div className="ml-auto">
                    <span className="block text-[9px] font-mono text-neutral-400 uppercase font-semibold">Next Guide</span>
                    <span className="block text-xs font-bold text-neutral-900 mt-0.5 line-clamp-1">{nextPage.title}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0 mt-0.5" />
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}
            </div>
          </article>

          {/* Right Sidebar: Key Points Takeaway */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-3xs relative overflow-hidden">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-200 pb-2.5 mb-3 flex items-center gap-1.5">
                <Key className="h-4 w-4 text-neutral-500" /> Evaluation Checklist
              </h3>
              <ul className="space-y-3 text-xs text-neutral-600">
                {page.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-2 leading-relaxed">
                    <span className="inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-neutral-150 text-[9px] font-mono font-bold text-neutral-800 border border-neutral-250">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 flex gap-2 items-start">
              <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display text-xs font-bold text-amber-950">Expert Vetting</h4>
                <p className="text-[10px] text-amber-800 leading-relaxed mt-1">
                  Always inspect customer reviews, professional certifications, and facility air control configurations.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
