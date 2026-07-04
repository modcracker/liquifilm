import React from 'react';
import Link from 'next/link';
import { Globe, Award, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { WET_GATE_PAGES, WIDER_TOPICS, GLOSSARY_TERMS, DIRECTORY_ENTRIES, HIRING_PAGES } from '@/lib/data';

export default function Footer() {
  return (
    <footer id="main-footer" className="mt-20 border-t border-neutral-200 bg-neutral-100 py-16 text-neutral-600 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* TOP BRANDING & INDEX OVERVIEW */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 border-b border-neutral-200 pb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 border border-neutral-800 shadow-xs group-hover:border-neutral-700 transition-colors">
                <div className="absolute left-1 top-1.5 bottom-1.5 flex flex-col justify-between">
                  <div className="w-1.5 h-1.5 rounded-xs bg-white/25" />
                  <div className="w-1.5 h-1.5 rounded-xs bg-white/25" />
                  <div className="w-1.5 h-1.5 rounded-xs bg-white/25" />
                </div>
                <div className="relative h-4 w-4 rounded-full border border-neutral-700 bg-linear-to-b from-neutral-800 to-neutral-900 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-radial-[circle_at_top_left] from-sky-400/25 via-transparent to-transparent" />
                  <span className="font-mono text-[9px] font-bold text-neutral-100 tracking-tighter select-none">L</span>
                </div>
                <div className="absolute right-1 top-1.5 bottom-1.5 flex flex-col justify-between">
                  <div className="w-1.5 h-1.5 rounded-xs bg-white/25" />
                  <div className="w-1.5 h-1.5 rounded-xs bg-white/25" />
                  <div className="w-1.5 h-1.5 rounded-xs bg-white/25" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <div className="font-display text-xl font-black tracking-tight flex items-baseline select-none">
                  <span className="bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent">
                    liqui
                  </span>
                  <span className="bg-gradient-to-r from-neutral-600 to-neutral-400 bg-clip-text text-transparent font-medium tracking-wide italic ml-[1px]">
                    film
                  </span>
                  <span className="text-neutral-400 font-normal text-xs ml-0.5 font-mono">.com</span>
                </div>
                <span className="font-mono text-[7px] tracking-[0.35em] text-neutral-400 uppercase font-bold mt-1.5">
                  optical preservation
                </span>
              </div>
            </Link>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-500">
              The premier open-access knowledge base for technical motion picture film preservation, physical cell repair, and optical liquid wet gate scanning. Advancing cinema history through verifiable scientific documentation.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-neutral-500" /> Reference Resource
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-neutral-500" /> Independent Archival Standard
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
              General Reference & Portal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/faq" className="hover:text-neutral-950 transition-colors flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-neutral-400" />
                  <span>Technical FAQ Database</span>
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-neutral-950 transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4 text-neutral-400" />
                  <span>Case Study Framework</span>
                </Link>
              </li>
              <li>
                <a 
                  href="https://bridge.ws" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-neutral-950 transition-colors flex items-center gap-2"
                >
                  <Globe className="h-4 w-4 text-neutral-400" />
                  <span>Acquisition Portal</span>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-amber-700 bg-amber-50 border border-amber-200/60 px-1 py-0.25 rounded ml-1">
                    bridge.ws
                  </span>
                </a>
              </li>
              <li>
                <Link
                  href="/verification"
                  className="text-neutral-600 hover:text-neutral-950 font-semibold underline underline-offset-4 flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Contact Administration</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* COMPREHENSIVE SITEMAP DYNAMIC DIRECTORY */}
        <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 border-b border-neutral-200 pb-12">
          
          {/* Column 1: Wet Gate Guides */}
          <div>
            <div className="flex items-baseline justify-between mb-4 border-b border-neutral-200/60 pb-2">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900">
                Wet Gate Printing
              </h4>
              <span className="text-[10px] font-mono text-neutral-400">({WET_GATE_PAGES.length} Guides)</span>
            </div>
            <ul className="space-y-2 text-xs">
              {WET_GATE_PAGES.map((page) => (
                <li key={page.slug} className="group">
                  <Link 
                    href={`/wet-gate-printing/${page.slug}`} 
                    className="text-neutral-500 group-hover:text-neutral-900 transition-colors flex items-start gap-1"
                  >
                    <ChevronRight className="h-3 w-3 shrink-0 text-neutral-300 group-hover:text-neutral-500 transition-colors mt-0.5" />
                    <span className="leading-tight">{page.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Preservation Topics */}
          <div>
            <div className="flex items-baseline justify-between mb-4 border-b border-neutral-200/60 pb-2">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900">
                Wider Preservation
              </h4>
              <span className="text-[10px] font-mono text-neutral-400">({WIDER_TOPICS.length} Topics)</span>
            </div>
            <ul className="space-y-2 text-xs">
              {WIDER_TOPICS.map((page) => (
                <li key={page.slug} className="group">
                  <Link 
                    href={`/topics/${page.slug}`} 
                    className="text-neutral-500 group-hover:text-neutral-900 transition-colors flex items-start gap-1"
                  >
                    <ChevronRight className="h-3 w-3 shrink-0 text-neutral-300 group-hover:text-neutral-500 transition-colors mt-0.5" />
                    <span className="leading-tight">{page.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Archives Directory & Lab Hiring */}
          <div>
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-4 border-b border-neutral-200/60 pb-2">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Archive Directory
                </h4>
                <span className="text-[10px] font-mono text-neutral-400">({DIRECTORY_ENTRIES.length} Archives)</span>
              </div>
              <ul className="space-y-2 text-xs">
                {DIRECTORY_ENTRIES.map((entry) => (
                  <li key={entry.slug} className="group">
                    <Link 
                      href={`/directory/${entry.slug}`} 
                      className="text-neutral-500 group-hover:text-neutral-900 transition-colors flex items-start gap-1"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 text-neutral-300 group-hover:text-neutral-500 transition-colors mt-0.5" />
                      <span className="leading-tight">{entry.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-4 border-b border-neutral-200/60 pb-2">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Hiring & Guidelines
                </h4>
                <span className="text-[10px] font-mono text-neutral-400">({HIRING_PAGES.length} Guides)</span>
              </div>
              <ul className="space-y-2 text-xs">
                {HIRING_PAGES.map((page) => (
                  <li key={page.slug} className="group">
                    <Link 
                      href={`/hiring/${page.slug}`} 
                      className="text-neutral-500 group-hover:text-neutral-900 transition-colors flex items-start gap-1"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 text-neutral-300 group-hover:text-neutral-500 transition-colors mt-0.5" />
                      <span className="leading-tight">{page.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* FULL GLOSSARY TERMS SITEMAP INDEX */}
        <div className="mt-12 border-b border-neutral-200 pb-12">
          <div className="flex items-baseline justify-between mb-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900">
              Technical Glossary A-Z Index
            </h4>
            <span className="text-[10px] font-mono text-neutral-400">({GLOSSARY_TERMS.length} Terms)</span>
          </div>
          <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-[11px] text-neutral-500 font-mono leading-relaxed">
            {GLOSSARY_TERMS.map((term, idx) => (
              <React.Fragment key={term.slug}>
                <Link 
                  href={`/glossary/${term.slug}`} 
                  className="hover:text-neutral-950 transition-colors underline decoration-neutral-200 hover:decoration-neutral-800 underline-offset-2"
                >
                  {term.title}
                </Link>
                {idx < GLOSSARY_TERMS.length - 1 && <span className="text-neutral-300 select-none">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} liquifilm.com. All rights reserved. Managed as an independent historical digital repository.</p>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-4 items-center">
            <Link href="/glossary" className="hover:underline">Terms Glossary</Link>
            <Link href="/directory" className="hover:underline">Verified Archives</Link>
            <Link href="/faq" className="hover:underline">Technical FAQ</Link>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <a href="https://bridge.ws" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-600 underline font-medium text-neutral-500 flex items-center gap-1">
              bridge.ws
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
