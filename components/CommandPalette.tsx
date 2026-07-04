'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, BookOpen, Layers, Users, CornerDownRight, X, Command } from 'lucide-react';
import { WET_GATE_PAGES, WIDER_TOPICS, GLOSSARY_TERMS, DIRECTORY_ENTRIES } from '@/lib/data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: 'wet-gate' | 'topic' | 'glossary' | 'directory';
  href: string;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Flatten all searchable items
  const allItems: SearchItem[] = [
    ...WET_GATE_PAGES.map((page) => ({
      id: `wg-${page.slug}`,
      title: page.title,
      subtitle: page.summary,
      category: page.category || 'Wet Gate Core',
      type: 'wet-gate' as const,
      href: `/wet-gate-printing/${page.slug}`,
    })),
    ...WIDER_TOPICS.map((page) => ({
      id: `topic-${page.slug}`,
      title: page.title,
      subtitle: page.summary,
      category: page.category || 'Preservation Topics',
      type: 'topic' as const,
      href: `/topics/${page.slug}`,
    })),
    ...GLOSSARY_TERMS.map((term) => ({
      id: `glossary-${term.slug}`,
      title: term.title,
      subtitle: term.shortDefinition,
      category: term.categoryLabel || 'Glossary',
      type: 'glossary' as const,
      href: `/glossary/${term.slug}`,
    })),
    ...DIRECTORY_ENTRIES.map((entry) => ({
      id: `dir-${entry.slug}`,
      title: entry.title,
      subtitle: entry.description || entry.generalMission,
      category: entry.region || 'Archive Directory',
      type: 'directory' as const,
      href: `/directory/${entry.slug}`,
    })),
  ];

  // Filter items based on search query
  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 6) // default suggestions
    : allItems.filter((item) => {
        const searchStr = `${item.title} ${item.subtitle} ${item.category}`.toLowerCase();
        return searchStr.includes(query.toLowerCase());
      });


  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          const selected = filteredItems[selectedIndex];
          router.push(selected.href);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, router, onClose]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const getItemIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'wet-gate':
        return <Layers className="h-4 w-4 text-emerald-500 shrink-0" />;
      case 'topic':
        return <BookOpen className="h-4 w-4 text-sky-500 shrink-0" />;
      case 'glossary':
        return <Search className="h-4 w-4 text-amber-500 shrink-0" />;
      case 'directory':
        return <Users className="h-4 w-4 text-indigo-500 shrink-0" />;
    }
  };

  const getTypeLabel = (type: SearchItem['type']) => {
    switch (type) {
      case 'wet-gate':
        return 'Wet Gate Article';
      case 'topic':
        return 'Preservation Topic';
      case 'glossary':
        return 'Glossary Term';
      case 'directory':
        return 'Directory Entry';
    }
  };

  const getTypeBadgeStyles = (type: SearchItem['type']) => {
    switch (type) {
      case 'wet-gate':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'topic':
        return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'glossary':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'directory':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs"
            id="command-palette-backdrop"
          />

          {/* Dialog Container */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-full max-w-2xl bg-white rounded-xl border border-neutral-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[65vh]"
              id="command-palette-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Search site contents"
            >
              {/* Header Input Area */}
              <div className="relative flex items-center border-b border-neutral-100 px-4 py-3.5 bg-neutral-50/50">
                <Search className="h-5 w-5 text-neutral-400 mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type to search articles, glossary, directories..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none"
                  aria-autocomplete="list"
                  aria-controls="search-results-list"
                />
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="hidden sm:inline-flex items-center gap-0.5 border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-mono font-medium rounded text-neutral-400 shadow-2xs">
                    <Command className="h-2.5 w-2.5" />
                    <span>K</span>
                  </span>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Suggestions / Results */}
              <div
                ref={listRef}
                id="search-results-list"
                className="flex-1 overflow-y-auto p-2 divide-y divide-neutral-50"
              >
                {query.trim() === '' && (
                  <div className="px-3 py-2 text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-500" /> Suggested Topics & Guides
                  </div>
                )}

                {filteredItems.length > 0 ? (
                  <div className="py-1">
                    {filteredItems.map((item, idx) => {
                      const isSelected = idx === selectedIndex;
                      return (
                        <div
                          key={item.id}
                          data-active={isSelected ? "true" : "false"}
                          onClick={() => {
                            router.push(item.href);
                            onClose();
                          }}
                          className={`group flex items-start gap-3.5 px-3 py-3.5 rounded-lg cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-neutral-900 text-white'
                              : 'hover:bg-neutral-50 text-neutral-900'
                          }`}
                        >
                          <div className={`p-1.5 rounded-md shrink-0 border ${
                            isSelected 
                              ? 'bg-neutral-800 border-neutral-700' 
                              : 'bg-white border-neutral-100'
                          }`}>
                            {getItemIcon(item.type)}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                              <h3 className="font-sans font-semibold text-sm leading-tight truncate">
                                {item.title}
                              </h3>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium border shrink-0 transition-colors ${
                                isSelected
                                  ? 'bg-neutral-800 text-neutral-200 border-neutral-700'
                                  : getTypeBadgeStyles(item.type)
                              }`}>
                                {getTypeLabel(item.type)}
                              </span>
                            </div>
                            <p className={`text-xs mt-1 line-clamp-1 leading-normal ${
                              isSelected ? 'text-neutral-300' : 'text-neutral-500'
                            }`}>
                              {item.subtitle}
                            </p>
                            <div className="flex items-center gap-1 mt-1.5">
                              <CornerDownRight className={`h-3 w-3 shrink-0 ${
                                isSelected ? 'text-neutral-400' : 'text-neutral-300'
                              }`} />
                              <span className={`text-[10px] font-mono ${
                                isSelected ? 'text-neutral-400' : 'text-neutral-400'
                              }`}>
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 px-4 text-center">
                    <p className="text-neutral-500 text-sm">
                      No results found for &ldquo;<span className="font-semibold text-neutral-800">{query}</span>&rdquo;
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Try searching for broader keywords like &ldquo;wet gate&rdquo;, &ldquo;indexing&rdquo;, or &ldquo;nitrate&rdquo;.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Guide Info */}
              <div className="px-4 py-2.5 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 bg-white border border-neutral-200 rounded text-neutral-500 font-bold">↑↓</kbd> Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 bg-white border border-neutral-200 rounded text-neutral-500 font-bold">Enter</kbd> Select
                  </span>
                </div>
                <div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 bg-white border border-neutral-200 rounded text-neutral-500 font-bold">Esc</kbd> Close
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
