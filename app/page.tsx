import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, BookOpen, Search, Users, HelpCircle, ArrowRight, ShieldAlert, Award, ShieldCheck } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { WET_GATE_PAGES, WIDER_TOPICS, GLOSSARY_TERMS, DIRECTORY_ENTRIES } from '@/lib/data';

// Import newly generated high-quality assets
import wetGateHero from '@/src/assets/images/wet_gate_hero_1783060301689.webp';
import filmScratchMacro from '@/src/assets/images/film_scratch_macro_1783060324701.webp';
import archivalVaultRacks from '@/src/assets/images/archival_vault_racks_1783060336578.webp';

export default function HomePage() {
  // Build the JSON-LD schemas
  const siteUrl = "https://liquifilm.com";
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": "Liquifilm",
    "description": "The definitive technical film restoration and preservation reference hub, specializing in wet gate liquid scanning physics and safety guidelines.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/glossary?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "url": siteUrl,
    "name": "Liquifilm Hub Homepage",
    "description": "Structured directory and knowledge repository for film preservation standards, glossary definitions, and wet gate liquid scanner comparisons.",
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Wet Gate Printing Flagship Section",
        "url": `${siteUrl}/wet-gate-printing`
      },
      {
        "@type": "WebPage",
        "name": "Wider Preservation Topics",
        "url": `${siteUrl}/topics/history-of-film-preservation`
      },
      {
        "@type": "WebPage",
        "name": "Technical Glossary Index",
        "url": `${siteUrl}/glossary`
      },
      {
        "@type": "WebPage",
        "name": "Archival Institution Directory",
        "url": `${siteUrl}/directory`
      }
    ]
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
      }
    ]
  };

  // Get some counts to show the scale of the hub cleanly
  const totalWetGate = WET_GATE_PAGES.length;
  const totalTopics = WIDER_TOPICS.length;
  const totalGlossary = GLOSSARY_TERMS.length;
  const totalDirectory = DIRECTORY_ENTRIES.length;

  return (
    <div className="w-full flex flex-col font-sans">
      <SchemaMarkup schema={websiteSchema} />
      <SchemaMarkup schema={collectionPageSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-neutral-200 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-[circle_at_bottom_left] from-neutral-50 via-transparent to-transparent opacity-70" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-mono font-semibold text-neutral-800 border border-neutral-200">
                <Award className="h-3.5 w-3.5 text-neutral-600" /> Archival Reference Hub
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Film Restoration & <span className="text-neutral-500 font-light italic">Preservation</span> Hub
              </h1>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-600">
                Welcome to the definitive, open-access knowledge base for technical film conservation, photochemical repair, and optical liquid wet gate scanning. Grounded in verified chemical standards and optical physics.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/wet-gate-printing"
                  className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Explore Wet Gate Printing <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/topics/history-of-film-preservation"
                  className="inline-flex items-center gap-2 rounded-lg bg-white border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 shadow-xs hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  View Preservation Topics
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[1/1] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-md group">
              <Image 
                src={wetGateHero} 
                alt="Optical Liquid Wet Gate Film Scanner"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                fill
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE CORNERSTONE HIGHLIGHT: WET GATE PRINTING */}
      <section className="py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 md:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">Flagship Topic</span>
            </div>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
              Wet Gate Printing (Liquid Gate)
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-600">
              Wet gate technology represents the pinnacle of physical scratch mitigation. By submerging film in a liquid with a refractive index precisely matching the cellulose triacetate base (approx. 1.490), light refracts evenly, rendering deep handling scratches optically invisible at capture time without losing original grain or details.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-neutral-800 shrink-0" /> Hides Base & Emulsion Scratches
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-neutral-800 shrink-0" /> 100% Data Preservation (No Interpolation)
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-neutral-800 shrink-0" /> Continuous Shrunk Film Lubrication
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-neutral-800 shrink-0" /> Safe for Nitrate & Acetate
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/wet-gate-printing"
                className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-950 hover:underline hover:underline-offset-4 cursor-pointer"
              >
                Go to Wet Gate Section Pillar ({totalWetGate} Articles) <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-neutral-200 shadow-3xs group">
              <Image 
                src={filmScratchMacro} 
                alt="35mm Film Scratch Mitigation"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                fill
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent p-4 flex flex-col justify-end">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-300">Refractive Science in Action</p>
                <p className="text-xs font-semibold text-white mt-0.5">Physical scratch mitigation via chemical index-matching</p>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 flex flex-col justify-center">
              <h3 className="font-display text-sm font-bold text-neutral-800 mb-4 border-b border-neutral-200 pb-2">Primary Wet Gate Concepts</h3>
              <div className="space-y-3">
                {[
                  { title: "Refractive Index Matching", href: "/wet-gate-printing/how-it-works" },
                  { title: "Traditional Medium: Perchloroethylene", href: "/wet-gate-printing/perchloroethylene" },
                  { title: "Green Alternates: Fluorinated Fluids", href: "/wet-gate-printing/alternative-solvents" },
                  { title: "Physical Gates vs. Digital Restorations", href: "/wet-gate-printing/vs-digital-restoration" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between p-2.5 rounded bg-white border border-neutral-200/60 hover:border-neutral-300 transition-colors text-xs font-medium text-neutral-700"
                  >
                    <span>{item.title}</span>
                    <ArrowRight className="h-3 w-3 text-neutral-400 font-bold" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GRID OF KNOWLEDGE PILLARS */}
      <section className="bg-neutral-50 py-16 border-t border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900">
              The Film Archiving Knowledge Structure
            </h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">
              Explore our exhaustive reference sections, organized systematically to cover legal, physical, optical, and mechanical preservation standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* WET GATE CARD */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white mb-4">
                  <Layers className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-900">Wet Gate Printing</h3>
                <p className="mt-2 text-xs text-neutral-400 font-mono">15 TECHNICAL ARTICLES</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  In-depth coverage of liquid gate physics, chemicals, solvents, environmental disposals, scanner equipment, and specific technical calibrations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <Link href="/wet-gate-printing" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:underline">
                  Browse Flagship Section <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* WIDER TOPICS CARD */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white mb-4">
                  <BookOpen className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-900">Wider Preservation</h3>
                <p className="mt-2 text-xs text-neutral-400 font-mono">12 PRESERVATION ARTICLES</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Historical and theoretical context covering digital-vs-physical archives, silent film hurdles, nitrate combustion physics, legal clearances, and standards.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <Link href="/topics/history-of-film-preservation" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:underline">
                  Browse General Topics <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* GLOSSARY CARD */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white mb-4">
                  <Search className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-900">Technical Glossary</h3>
                <p className="mt-2 text-xs text-neutral-400 font-mono">{totalGlossary} CODIFIED TERMS</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Full reference dictionary covering film stocks, scanner types, color dyes, print standards, audio pop cleaning, and institutional acronyms.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <Link href="/glossary" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:underline">
                  Search the Glossary <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* DIRECTORY CARD */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white mb-4">
                  <Users className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-900">Archive Directory</h3>
                <p className="mt-2 text-xs text-neutral-400 font-mono">{totalDirectory} VERIFIED STARTERS</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Verifiable global registry of prominent institutions, national film libraries, and museums supporting historical film preservation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <Link href="/directory" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:underline">
                  View verified archives <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* HIRING CARD */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white mb-4">
                  <ShieldAlert className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-900">Hiring a Laboratory</h3>
                <p className="mt-2 text-xs text-neutral-400 font-mono">3 DETAILED GUIDES</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  A crucial toolkit on how to choose a qualified laboratory, decode service fees, and ask technicians the right mechanical questions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <Link href="/hiring/finding-a-service-provider" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:underline">
                  Read Hiring Guides <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* FAQ CARD */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white mb-4">
                  <HelpCircle className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-900">FAQ Database</h3>
                <p className="mt-2 text-xs text-neutral-400 font-mono">6 CORE PRESERVATIONS QUESTIONS</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Answers to the most prominent queries about wet gate safety, cellulose acetate decay, and archival storage regulations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <Link href="/faq" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:underline">
                  Review the FAQ database <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DISCIPLINE / INTEGRITY STATEMENT */}
      <section className="bg-white py-16 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-neutral-900">The Integrity of Physical Sourcing</h3>
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                Preserving history requires adhering to rigorous physical data principles. In restoration work, we prioritize the protection of the authentic, original physical artifacts. All information published on <strong>liquifilm.com</strong> is documented with extreme technical discipline and verified independently.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 font-mono text-xs text-neutral-500 pt-2">
                <span className="flex items-center gap-1.5">✓ No simulated metadata</span>
                <span className="flex items-center gap-1.5">✓ 100% verified directory lists</span>
                <span className="flex items-center gap-1.5">✓ True optical documentation</span>
              </div>
            </div>
            <div className="relative w-full h-64 lg:h-80 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm group">
              <Image 
                src={archivalVaultRacks} 
                alt="Historical film preservation archive vault with canisters"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                fill
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
