'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, 
  ChevronRight, 
  Search, 
  BookOpen, 
  Tag, 
  ArrowRight, 
  X, 
  Sparkles, 
  Loader2, 
  ExternalLink, 
  Trash2, 
  HelpCircle,
  FileText
} from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { GLOSSARY_TERMS } from '@/lib/data';

const CATEGORIES = [
  { key: 'formats', label: 'Film Stock & Formats' },
  { key: 'color', label: 'Color & Early Processes' },
  { key: 'preservation', label: 'Preservation & Storage' },
  { key: 'restoration', label: 'Restoration Processes' },
  { key: 'scanning', label: 'Scanning & Digitization' },
  { key: 'printing', label: 'Printing & Lab Terminology' },
  { key: 'sound', label: 'Sound Preservation' },
  { key: 'institutions', label: 'Institutions, Standards & Rights' },
];

interface GroundedSource {
  title: string;
  uri: string;
}

interface GroundedTerm {
  title: string;
  categoryLabel: string;
  shortDefinition: string;
  detailedExplainer: string;
  sources: GroundedSource[];
  timestamp: number;
}

const PRESET_TERM_SUGGESTIONS = [
  "Laserdisc digital preservation video",
  "Nitrate cell disassembly decay",
  "Ozalid proof duplicate film stock",
  "Agfa Color Neu restoration"
];

export default function GlossaryIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Search grounding states
  const [groundingTermInput, setGroundingTermInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [realtimeTerms, setRealtimeTerms] = useState<GroundedTerm[]>([]);
  const [loadingStatusText, setLoadingStatusText] = useState('');

  const siteUrl = "https://www.liquifilm.com";
  const pageUrl = `${siteUrl}/glossary`;

  const loadingMessages = [
    "Searching live film preservation indexes on Google...",
    "Analyzing historical physical cell metrics...",
    "Formulating biochemically sound restoration parameters...",
    "Extracting source verification links...",
  ];

  useEffect(() => {
    const saved = localStorage.getItem('liquifilm_realtime_glossary_terms');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          setRealtimeTerms(parsed);
        }, 0);
      } catch (e) {
        console.error("Error reading saved terms", e);
      }
    }
  }, []);

  const saveTerms = (terms: GroundedTerm[]) => {
    setRealtimeTerms(terms);
    localStorage.setItem('liquifilm_realtime_glossary_terms', JSON.stringify(terms));
  };

  const handleTermGroundingSearch = async (e: React.FormEvent | null, customTerm?: string) => {
    if (e) e.preventDefault();
    const termToSearch = customTerm || groundingTermInput || searchQuery;
    if (!termToSearch.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    let msgIdx = 0;
    setLoadingStatusText(loadingMessages[0]);
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      setLoadingStatusText(loadingMessages[msgIdx]);
    }, 2000);

    try {
      const res = await fetch('/api/grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: termToSearch, type: 'glossary' }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch dynamic glossary term definition');
      }

      if (json.data) {
        const newTerm: GroundedTerm = {
          title: json.data.title || termToSearch,
          categoryLabel: json.data.categoryLabel || 'Technical Concept',
          shortDefinition: json.data.shortDefinition || 'Dynamically retrieved concept.',
          detailedExplainer: json.data.detailedExplainer || 'Details compiled from real-time web references.',
          sources: json.sources || [],
          timestamp: Date.now(),
        };

        const filtered = realtimeTerms.filter(
          (t) => t.title.toLowerCase() !== newTerm.title.toLowerCase()
        );
        saveTerms([newTerm, ...filtered]);
        setGroundingTermInput('');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while executing Search Grounding');
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
    }
  };

  const removeTerm = (title: string) => {
    const updated = realtimeTerms.filter((t) => t.title !== title);
    saveTerms(updated);
  };

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
        "name": "Glossary",
        "item": pageUrl
      }
    ]
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "url": pageUrl,
    "name": "Technical Glossary: Film Restoration Standards",
    "description": "Alphabetical dictionary and search index for key film conservation terms, chemical formulas, scan metrics, and laboratory definitions."
  };

  // Filter local glossary terms based on user search and category selector
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchesSearch =
        term.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.detailedExplainer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? term.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full font-sans pb-16">
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={collectionPageSchema} />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-100 py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-900 font-semibold">Technical Glossary</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-mono font-semibold text-neutral-800 border border-neutral-200">
              <BookOpen className="h-3.5 w-3.5 text-neutral-600" /> Reference Dictionary
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Technical Film Preservation Glossary
            </h1>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-600">
              An exhaustive, cross-referenced repository containing 73 verified terms, chemical equations, mechanical standards, and scanning metrics in film restoration physics.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH AND CONTROL SECTION */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
        
        {/* Dynamic Search Term Input Bar */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-neutral-200 pb-6">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search 73 definitions (e.g., vinegar syndrome, nitrate, DPX)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none shadow-3xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            )}
          </div>

          <div className="font-mono text-xs text-neutral-500">
            Showing <strong className="text-neutral-900 font-semibold">{filteredTerms.length}</strong> of 73 Terms
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === null
                ? 'bg-neutral-950 text-white font-semibold'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-neutral-950 text-white font-semibold shadow-3xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* DYNAMIC TERM LOOKUP WORKBENCH */}
        <div className="mt-10 rounded-2xl border-2 border-neutral-200 bg-neutral-50 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="font-display text-base md:text-lg font-bold text-neutral-900">
              Query Live Web for Term Defs (Google Search Grounded)
            </h2>
          </div>
          <p className="text-xs md:text-sm text-neutral-600 max-w-3xl mb-6">
            If you cannot find a chemical, mechanical, or format concept locally, look it up in real-time. We will use search grounding to verify the definition against live industry publications and reference resources.
          </p>

          <form onSubmit={(e) => handleTermGroundingSearch(e)} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <HelpCircle className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Lookup any preservation/scanning term (e.g., Laserdisc preservation, Ozalid duplicates)..."
                value={groundingTermInput}
                onChange={(e) => setGroundingTermInput(e.target.value)}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950 shadow-3xs disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !groundingTermInput.trim()}
              className="rounded-xl bg-neutral-950 px-6 py-3 text-xs font-bold text-white hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Grounding...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Retrieve Definition</span>
                </>
              )}
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mr-1">Quick Presets:</span>
            {PRESET_TERM_SUGGESTIONS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={(e) => handleTermGroundingSearch(e, preset)}
                disabled={isSubmitting}
                className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-[11px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all cursor-pointer disabled:opacity-50"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Search status notification */}
          {isSubmitting && (
            <div className="mt-6 p-4 rounded-xl border border-neutral-200 bg-white shadow-3xs animate-pulse flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-amber-500 animate-spin shrink-0" />
              <span className="text-xs font-mono text-neutral-600 font-semibold">{loadingStatusText}</span>
            </div>
          )}

          {/* Error state */}
          {errorMessage && (
            <div className="mt-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs md:text-sm font-medium">
              Error: {errorMessage}
            </div>
          )}
        </div>

        {/* REAL-TIME RETRIEVED GROUNDED GLOSSARY TERMS (IF ANY) */}
        {realtimeTerms.length > 0 && (
          <div className="mt-12 space-y-6 bg-amber-50/15 border-2 border-amber-200/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="font-display text-lg font-bold text-neutral-900">Grounded Term Discoveries ({realtimeTerms.length})</h2>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[9px] font-bold text-amber-800 uppercase tracking-wider">
                Real-time Web Search
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {realtimeTerms.map((term) => (
                <div
                  key={term.title}
                  className="flex flex-col justify-between p-5 rounded-xl border border-amber-300 bg-white shadow-3xs relative hover:border-amber-400 transition-all"
                >
                  <button
                    onClick={() => removeTerm(term.title)}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 p-1.5 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove term"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-800 uppercase">
                      <Tag className="h-3 w-3" /> {term.categoryLabel}
                    </div>
                    <h3 className="font-display text-base font-bold text-neutral-900 pr-6">
                      {term.title}
                    </h3>
                    <p className="text-xs text-neutral-700 leading-relaxed font-semibold">
                      {term.shortDefinition}
                    </p>
                    <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                      {term.detailedExplainer}
                    </p>
                  </div>

                  {/* Sources citation list */}
                  {term.sources.length > 0 && (
                    <div className="mt-5 pt-3 border-t border-dashed border-neutral-100">
                      <span className="block text-[9px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Verified References:</span>
                      <div className="flex flex-wrap gap-1">
                        {term.sources.slice(0, 3).map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.uri}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-neutral-50 border border-neutral-200 px-2 py-0.5 text-[10px] text-neutral-600 hover:text-neutral-900 hover:border-neutral-350 transition-colors"
                          >
                            <span className="max-w-[120px] truncate">{src.title}</span>
                            <ExternalLink className="h-2.5 w-2.5 text-neutral-400 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VERIFIED LOCAL TERMS LISTING */}
        <div className="mt-12 space-y-6">
          <div className="border-b border-neutral-200 pb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-neutral-500" />
            <h2 className="font-display text-lg font-bold text-neutral-900">Verified Technical Terms ({filteredTerms.length})</h2>
          </div>

          {filteredTerms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTerms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="group flex flex-col justify-between p-5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-2xs transition-all"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-neutral-400 uppercase">
                      <Tag className="h-3 w-3" /> {term.categoryLabel}
                    </div>
                    <h3 className="mt-2.5 font-display text-base font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                      {term.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-3 font-normal">
                      {term.shortDefinition}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400 group-hover:text-neutral-800 transition-colors">
                    <span>Codified Definition</span>
                    <span className="inline-flex items-center gap-1 font-semibold">
                      Full Detail <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-xl border border-dashed border-neutral-300 bg-white">
              <p className="text-sm text-neutral-500 font-mono">No definitions matches your parameters. Try retrieving dynamic facts using the search grounding tool above.</p>
              
              {searchQuery && (
                <div className="mt-6">
                  <button
                    onClick={() => handleTermGroundingSearch(null, searchQuery)}
                    className="inline-flex items-center gap-2 bg-neutral-950 text-white rounded-lg px-4 py-2 text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Run Grounded Web Search for &quot;{searchQuery}&quot;</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
