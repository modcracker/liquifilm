import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Home, Globe, AlertTriangle, ArrowLeft, Building2 } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { DIRECTORY_ENTRIES } from '@/lib/data';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = DIRECTORY_ENTRIES.find((e) => e.slug === slug);
  if (!entry) return {};

  return {
    title: `${entry.title} - Film Preservation Directory | Liquifilm`,
    description: entry.description || entry.generalMission,
    alternates: {
      canonical: `/directory/${entry.slug}`,
    },
    openGraph: {
      title: `${entry.title} - Film Preservation Directory | Liquifilm`,
      description: entry.description || entry.generalMission,
      url: `/directory/${entry.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return DIRECTORY_ENTRIES.map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function DirectoryEntryPage({ params }: Props) {
  const { slug } = await params;
  const entryIdx = DIRECTORY_ENTRIES.findIndex((e) => e.slug === slug);
  
  if (entryIdx === -1) {
    notFound();
  }

  const entry = DIRECTORY_ENTRIES[entryIdx];

  const siteUrl = "https://liquifilm.com";
  const pageUrl = `${siteUrl}/directory/${entry.slug}`;

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
        "name": "Archive Directory",
        "item": `${siteUrl}/directory`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": entry.title,
        "item": pageUrl
      }
    ]
  };

  const archiveSchema = {
    "@context": "https://schema.org",
    "@type": "ArchiveOrganization",
    "@id": pageUrl,
    "name": entry.title,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": entry.region
    },
    "description": entry.description
  };

  return (
    <div className="w-full font-sans pb-16">
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={archiveSchema} />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-100 py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/directory" className="hover:text-neutral-900">
              Archive Directory
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-900 font-semibold truncate max-w-xs">{entry.title}</span>
          </nav>
        </div>
      </div>

      {/* Entry Page Content Layout */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-12">
        <Link
          href="/directory"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 hover:text-neutral-950 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Archive Directory
        </Link>

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

        {/* Institution Details Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-3xs space-y-6">
          <header className="border-b border-neutral-150 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase text-neutral-800 border border-neutral-200">
                {entry.status}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-400">
                <Globe className="h-3 w-3" /> {entry.region}
              </span>
            </div>
            <h1 className="mt-4 font-display text-2xl md:text-3.5xl font-bold tracking-tight text-neutral-900 leading-tight flex items-center gap-3">
              <Building2 className="h-8 w-8 text-neutral-400 shrink-0" /> {entry.title}
            </h1>
          </header>

          <div className="space-y-4 text-sm md:text-base leading-relaxed text-neutral-700">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-150">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Archival Mandate / General Mission</h4>
              <p className="text-xs md:text-sm text-neutral-800 font-semibold mt-1">
                {entry.generalMission}
              </p>
            </div>
            
            <p className="pt-2">
              {entry.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
