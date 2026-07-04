'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, 
  ChevronRight, 
  Users, 
  AlertTriangle, 
  ArrowRight, 
  Globe, 
  Search, 
  Sparkles, 
  Trash2, 
  Loader2, 
  ExternalLink, 
  Building2,
  FileCheck
} from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { DIRECTORY_ENTRIES } from '@/lib/data';

interface GroundedSource {
  title: string;
  uri: string;
}

interface GroundedInstitution {
  title: string;
  region: string;
  status: string;
  generalMission: string;
  description: string;
  sources: GroundedSource[];
  timestamp: number;
}

const PRESET_SUGGESTIONS = [
  "Eye Filmmuseum Amsterdam",
  "Cineteca Nazionale Rome",
  "National Film Archive of India",
  "Gosfilmofond Russian State Archive"
];

export default function DirectoryIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [groundingInput, setGroundingInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [realtimeEntries, setRealtimeEntries] = useState<GroundedInstitution[]>([]);
  const [loadingStatusText, setLoadingStatusText] = useState('');

  const siteUrl = "https://liquifilm.com";
  const pageUrl = `${siteUrl}/directory`;

  // Status message rotation during search grounding API call
  const loadingMessages = [
    "Querying global film archival registries...",
    "Verifying physical preservation standards with live indices...",
    "Extracting index-matching liquid wet gate scanning metadata...",
    "Compiling verified web reference citations...",
  ];

  useEffect(() => {
    // Load previously saved real-time grounded discoveries from local storage
    const saved = localStorage.getItem('liquifilm_realtime_institutions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          setRealtimeEntries(parsed);
        }, 0);
      } catch (e) {
        console.error("Error reading saved institutions", e);
      }
    }
  }, []);

  const saveEntries = (entries: GroundedInstitution[]) => {
    setRealtimeEntries(entries);
    localStorage.setItem('liquifilm_realtime_institutions', JSON.stringify(entries));
  };

  const handleGroundingSearch = async (e: React.FormEvent | null, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToSearch = customQuery || groundingInput;
    if (!queryToSearch.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');
    
    // Rotate loading messages
    let msgIndex = 0;
    setLoadingStatusText(loadingMessages[0]);
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setLoadingStatusText(loadingMessages[msgIndex]);
    }, 2000);

    try {
      const res = await fetch('/api/grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToSearch, type: 'directory' }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch dynamic grounding data');
      }

      if (json.data) {
        const newEntry: GroundedInstitution = {
          title: json.data.title || queryToSearch,
          region: json.data.region || 'Global Archive',
          status: json.data.status || 'Dynamic Search',
          generalMission: json.data.generalMission || 'Real-time retrieved archive information.',
          description: json.data.description || 'Details compiled from verified live web sources.',
          sources: json.sources || [],
          timestamp: Date.now(),
        };

        // Check if already exists in local list, if so replace it, else prepend
        const filtered = realtimeEntries.filter(
          (entry) => entry.title.toLowerCase() !== newEntry.title.toLowerCase()
        );
        saveEntries([newEntry, ...filtered]);
        setGroundingInput('');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while contacting Search Grounding API');
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
    }
  };

  const removeEntry = (title: string) => {
    const updated = realtimeEntries.filter((entry) => entry.title !== title);
    saveEntries(updated);
  };

  // Filter verified directory entries
  const filteredVerified = DIRECTORY_ENTRIES.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.generalMission.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
        "item": pageUrl
      }
    ]
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "url": pageUrl,
    "name": "Archive Registry: Film Preservation Institutions",
    "description": "Verified registry listing prominent global moving image libraries and historical film vaults, including founding FIAF members."
  };

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
            <span className="text-neutral-900 font-semibold">Institution Directory</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-mono font-semibold text-neutral-800 border border-neutral-200">
              <Users className="h-3.5 w-3.5 text-neutral-600" /> Archival Directory
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Film Preservation Archive Registry
            </h1>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-600">
              A curated registry of national film libraries, museum departments, and academic archives dedicated to saving global cinematographic heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
        
        {/* CRITICAL ACCURACY NOTE BANNER */}
        <div className="mb-10 rounded-xl border border-amber-300 bg-amber-50/75 p-5 flex gap-4 items-start shadow-3xs">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-950">Accuracy Constraint Disclaimer</h4>
            <p className="text-xs md:text-sm text-amber-900 mt-1 leading-relaxed">
              <strong>Details on this page are limited to independently verified facts. Use the dynamic real-time search tool below to fetch up-to-date facts about other global archives directly via Google Search Grounding.</strong>
            </p>
          </div>
        </div>

        {/* SEARCH GROUNDING LOOKUP WORKBENCH */}
        <div className="mb-12 rounded-2xl border-2 border-neutral-200 bg-neutral-50 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="font-display text-base md:text-lg font-bold text-neutral-900">
              Real-time Archive Fact Retrieval (Google Search Grounded)
            </h2>
          </div>
          <p className="text-xs md:text-sm text-neutral-600 max-w-3xl mb-6">
            Search for any unlisted film institution or archive (e.g. <em>Gosfilmofond</em>, <em>Eye Filmmuseum</em>). This workbench uses Gemini with Google Search to synthesize technical details, region, and primary missions with transparent web citations.
          </p>

          <form onSubmit={(e) => handleGroundingSearch(e)} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Enter archive or museum name..."
                value={groundingInput}
                onChange={(e) => setGroundingInput(e.target.value)}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950 shadow-3xs disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !groundingInput.trim()}
              className="rounded-xl bg-neutral-950 px-6 py-3 text-xs font-bold text-white hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Retrieving...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Fetch Grounded Facts</span>
                </>
              )}
            </button>
          </form>

          {/* Quick presets suggestions */}
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mr-1">Quick Presets:</span>
            {PRESET_SUGGESTIONS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={(e) => handleGroundingSearch(e, preset)}
                disabled={isSubmitting}
                className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-[11px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all cursor-pointer disabled:opacity-50"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Loading details */}
          {isSubmitting && (
            <div className="mt-6 p-4 rounded-xl border border-neutral-200 bg-white shadow-3xs animate-pulse flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-amber-500 animate-spin shrink-0" />
              <span className="text-xs font-mono text-neutral-600 font-semibold">{loadingStatusText}</span>
            </div>
          )}

          {/* Error messages */}
          {errorMessage && (
            <div className="mt-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs md:text-sm font-medium">
              Error: {errorMessage}
            </div>
          )}
        </div>

        {/* REAL-TIME GROUNDED ARCHIVE ENTRIES (IF ANY) */}
        {realtimeEntries.length > 0 && (
          <div className="mb-14 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
              <Sparkles className="h-4.5 w-4.5 text-amber-500" />
              <h2 className="font-display text-lg font-bold text-neutral-900">
                Grounded Discoveries ({realtimeEntries.length})
              </h2>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[9px] font-bold text-amber-800 uppercase tracking-wider">
                Real-time Web Search
              </span>
            </div>

            <div className="space-y-6">
              {realtimeEntries.map((entry) => (
                <div
                  key={entry.title}
                  className="rounded-2xl border-2 border-amber-200/60 bg-amber-50/10 p-6 md:p-8 space-y-4 hover:border-amber-400/50 transition-all relative"
                >
                  <button
                    onClick={() => removeEntry(entry.title)}
                    className="absolute top-6 right-6 text-neutral-400 hover:text-red-500 p-1.5 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                    title="Remove from workbench"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="max-w-3xl space-y-3">
                    <div className="flex flex-wrap items-center gap-2 pr-8">
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase text-amber-900">
                        {entry.status}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                        <Globe className="h-3 w-3 text-neutral-400" /> {entry.region}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-neutral-900 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-neutral-400" />
                        {entry.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-600 font-mono italic">
                        Archival Mandate: {entry.generalMission}
                      </p>
                    </div>

                    <p className="text-sm text-neutral-700 leading-relaxed pt-1">
                      {entry.description}
                    </p>

                    {/* Sources citation list */}
                    {entry.sources.length > 0 && (
                      <div className="pt-3 border-t border-dashed border-neutral-200">
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">Verified Grounding Web References:</span>
                        <div className="flex flex-wrap gap-2">
                          {entry.sources.map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.uri}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-full bg-white border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:border-neutral-350 transition-colors"
                            >
                              <span className="max-w-xs truncate">{src.title}</span>
                              <ExternalLink className="h-3 w-3 text-neutral-400 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VERIFIED ARCHIVE DIRECTORY SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <h2 className="font-display text-lg font-bold text-neutral-900 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-neutral-500" /> Verified Registry Entries ({filteredVerified.length})
            </h2>
            
            {/* Standard Reactive Filters */}
            <div className="relative w-48 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search local directory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white py-1.5 pl-8 pr-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredVerified.map((entry) => (
              <div
                key={entry.slug}
                className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start justify-between hover:border-neutral-300 hover:shadow-3xs transition-all"
              >
                <div className="max-w-3xl space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase text-neutral-800 border border-neutral-200">
                      {entry.status}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-400">
                      <Globe className="h-3 w-3" /> {entry.region}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-neutral-900">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 font-mono italic">
                      Mission: {entry.generalMission}
                    </p>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {entry.description}
                  </p>
                </div>

                <div className="pt-4 md:pt-0 shrink-0 border-t border-neutral-100 md:border-none flex items-center md:self-center">
                  <Link
                    href={`/directory/${entry.slug}`}
                    className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 shadow-3xs hover:bg-neutral-50 hover:text-neutral-950 transition-colors"
                  >
                    View Details <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                  </Link>
                </div>
              </div>
            ))}

            {filteredVerified.length === 0 && (
              <div className="text-center py-12 rounded-xl border border-dashed border-neutral-300 bg-white">
                <p className="text-sm text-neutral-500 font-mono">No local verified directory matches found.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
