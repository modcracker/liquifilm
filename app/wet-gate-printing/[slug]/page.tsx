import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Home, Key, BookOpen, ChevronLeft, ArrowRight, CornerDownRight } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { WET_GATE_PAGES } from '@/lib/data';
import PlaceholderImage from '@/components/PlaceholderImage';
import TableOfContents from '@/components/TableOfContents';
import GlossaryParser from '@/components/GlossaryParser';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = WET_GATE_PAGES.find((p) => p.slug === slug);
  if (!page) return {};

  return {
    title: `${page.title} | Liquifilm`,
    description: page.metaDescription || page.summary,
    alternates: {
      canonical: `/wet-gate-printing/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} | Liquifilm`,
      description: page.metaDescription || page.summary,
      url: `/wet-gate-printing/${page.slug}`,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  return WET_GATE_PAGES.map((page) => ({
    slug: page.slug,
  }));
}

export default async function WetGateArticlePage({ params }: Props) {
  const { slug } = await params;
  const pageIdx = WET_GATE_PAGES.findIndex((p) => p.slug === slug);
  
  if (pageIdx === -1) {
    notFound();
  }

  const page = WET_GATE_PAGES[pageIdx];
  const prevPage = pageIdx > 0 ? WET_GATE_PAGES[pageIdx - 1] : null;
  const nextPage = pageIdx < WET_GATE_PAGES.length - 1 ? WET_GATE_PAGES[pageIdx + 1] : null;

  const siteUrl = "https://liquifilm.com";
  const pageUrl = `${siteUrl}/wet-gate-printing/${page.slug}`;

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
        "name": "Wet Gate Printing",
        "item": `${siteUrl}/wet-gate-printing`
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
    "@type": "TechArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": page.title,
    "description": page.summary,
    "image": "https://picsum.photos/seed/liquifilm_article/1200/630",
    "articleSection": page.category || "Wet Gate Printing",
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
            <Link href="/wet-gate-printing" className="hover:text-neutral-900">
              Wet Gate Printing
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-900 font-semibold truncate max-w-xs">{page.title}</span>
          </nav>
        </div>
      </div>

      {/* Core Article Layout */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article Body */}
          <article className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-3xs">
            <header className="border-b border-neutral-150 pb-6 mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-mono font-medium text-neutral-800 border border-neutral-200">
                Category: {page.category}
              </span>
              <h1 className="mt-4 font-display text-2xl md:text-3.5xl font-bold tracking-tight text-neutral-900 leading-tight">
                {page.title}
              </h1>
              <p className="mt-4 text-sm md:text-base text-neutral-500 font-mono italic leading-relaxed">
                {page.summary}
              </p>
            </header>

            {/* Feature Technical Illustration */}
            <div className="mb-8 select-none">
              <PlaceholderImage
                aspectRatio="16:9"
                category={page.category}
                altText={`Technical diagram illustrating key concepts of ${page.title}: ${page.summary}`}
              />
            </div>

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
                    <h2 id={sectionId} className="font-display text-lg md:text-xl font-bold text-neutral-900 flex items-center gap-2 scroll-mt-24">
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
            <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between gap-4">
              {prevPage ? (
                <Link
                  href={`/wet-gate-printing/${prevPage.slug}`}
                  className="flex-1 group flex items-start gap-3 p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-3xs transition-all text-left"
                >
                  <ChevronLeft className="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase font-semibold">Previous Article</span>
                    <span className="block text-xs font-bold text-neutral-900 mt-1 line-clamp-2">{prevPage.title}</span>
                  </div>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}

              {nextPage ? (
                <Link
                  href={`/wet-gate-printing/${nextPage.slug}`}
                  className="flex-1 group flex items-start justify-between gap-3 p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-3xs transition-all text-right"
                >
                  <div className="ml-auto">
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase font-semibold">Next Article</span>
                    <span className="block text-xs font-bold text-neutral-900 mt-1 line-clamp-2">{nextPage.title}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0 mt-0.5" />
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}
            </div>
          </article>

          {/* Sidebar / Key Takeaways */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-3xs relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-radial-[circle_at_top_right] from-neutral-100 via-transparent to-transparent opacity-50" />
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-200 pb-2.5 mb-4 flex items-center gap-2">
                <Key className="h-4 w-4 text-neutral-500" /> Key Takeaways
              </h3>
              <ul className="space-y-4 text-xs md:text-sm text-neutral-600">
                {page.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-2.5 leading-relaxed">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-mono font-bold text-neutral-800 border border-neutral-200">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-900 text-white p-6 shadow-3xs">
              <h3 className="font-display text-sm font-bold tracking-tight mb-2">Preservation Ethics</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                &quot;Technical intervention should never alter or distort the original physical record.&quot; This article is maintained as a scientific baseline under international archival standards.
              </p>
              <Link
                href="/topics/fiaf-and-international-standards"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold hover:underline"
              >
                Read about FIAF Standards <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
