'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Search, BookOpen, Layers, Users, HelpCircle, ArrowRight } from 'lucide-react';
import CommandPalette from '@/components/CommandPalette';

const LISTING_URL = "https://www.godaddy.com/domainsearch/find?domainToCheck=liquifilm.com";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { name: 'Wet Gate Printing', href: '/wet-gate-printing', icon: Layers },
    { name: 'Wider Topics', href: '/topics/history-of-film-preservation', icon: BookOpen },
    { name: 'Technical Glossary', href: '/glossary', icon: Search },
    { name: 'Archive Directory', href: '/directory', icon: Users },
    { name: 'FAQ Database', href: '/faq', icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    if (path === '/wet-gate-printing' && pathname.startsWith('/wet-gate-printing')) return true;
    if (path === '/topics/history-of-film-preservation' && pathname.startsWith('/topics')) return true;
    if (path === '/glossary' && pathname.startsWith('/glossary')) return true;
    if (path === '/directory' && pathname.startsWith('/directory')) return true;
    if (path === '/faq' && pathname === '/faq') return true;
    return pathname === path;
  };

  return (
    <header className="w-full z-50 flex flex-col font-sans">
      {/* 1. STICKY / TOP ANNOUNCEMENT BANNER */}
      <div className="w-full bg-neutral-900 text-white py-2.5 px-4 text-xs md:text-sm flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 border-b border-neutral-800 text-center relative">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <strong className="tracking-tight uppercase text-amber-300 font-mono text-[11px] border border-amber-300/30 px-1 py-0.25 rounded bg-amber-300/5">Premium Domain</strong>
          <span>liquifilm.com is available for acquisition</span>
        </div>
        <p className="text-neutral-300 text-xs hidden lg:inline">A pristine brand authority for digital scanning & optical restoration agencies.</p>
        <a
          href={LISTING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-2.5 py-1 rounded text-xs transition-all shadow-sm group cursor-pointer"
        >
          View GoDaddy Listing <ArrowUpRight className="h-3 w-3 text-neutral-600 group-hover:text-neutral-900 transition-colors" />
        </a>
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* LOGO */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 border border-neutral-800 shadow-xs group-hover:border-neutral-700 transition-colors">
                  {/* Film sprocket representation */}
                  <div className="absolute left-1 top-1.5 bottom-1.5 flex flex-col justify-between">
                    <div className="w-1.5 h-1.5 rounded-xs bg-white/25" />
                    <div className="w-1.5 h-1.5 rounded-xs bg-white/25" />
                    <div className="w-1.5 h-1.5 rounded-xs bg-white/25" />
                  </div>
                  {/* Refractive lens representation */}
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
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-all ${
                      active
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Command Palette Trigger Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="ml-2 inline-flex items-center gap-2 border border-neutral-200/80 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 px-3 py-1.5 rounded-md text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-all cursor-pointer"
                aria-label="Open search command palette"
              >
                <Search className="h-3.5 w-3.5 text-neutral-400 group-hover:text-neutral-600" />
                <span>Search</span>
                <span className="hidden lg:inline-flex items-center gap-0.5 border border-neutral-200 bg-white px-1 py-0.25 text-[9px] font-mono rounded text-neutral-400">
                  <span>⌘</span><span>K</span>
                </span>
              </button>

              <Link
                href="/hiring/finding-a-service-provider"
                className="ml-3 inline-flex items-center gap-1 bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Hiring Guides <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE & MOBILE SEARCH */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 rounded-md focus:outline-none transition-colors cursor-pointer"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 focus:outline-none transition-colors cursor-pointer"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE OVERLAY MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-neutral-100 bg-white"
            >
              <div className="space-y-1 px-4 pb-6 pt-3">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                        active
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.name}
                    </Link>
                  );
                })}
                <div className="border-t border-neutral-100 my-3 pt-3">
                  <Link
                    href="/hiring/finding-a-service-provider"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 py-2.5 text-center text-sm font-semibold text-white hover:bg-neutral-800"
                  >
                    Hiring Guides <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
