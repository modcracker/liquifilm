'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, List, ArrowRight } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Find all h2 elements inside the main article container
    const h2Elements = document.querySelectorAll('article h2');
    const parsedItems: TocItem[] = [];

    h2Elements.forEach((h2) => {
      let id = h2.id;
      // Fallback slugify if no ID is found on the element
      if (!id && h2.textContent) {
        id = h2.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        h2.id = id;
      }
      if (id && h2.textContent) {
        // Strip out any icon or extra text markup if there is any
        const textContent = h2.textContent.trim();
        parsedItems.push({
          id,
          text: textContent,
        });
      }
    });

    const timer = setTimeout(() => {
      setItems(parsedItems);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // Sort by their bounding client rect to find the topmost
          intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    const h2Elements = document.querySelectorAll('article h2');
    h2Elements.forEach((el) => observer.observe(el));

    return () => {
      h2Elements.forEach((el) => observer.unobserve(el));
    };
  }, [items]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 85; // header offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (items.length === 0) return null;

  return (
    <div id="table-of-contents-box" className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5 shadow-3xs transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-display text-xs font-bold uppercase tracking-widest text-neutral-900 focus:outline-hidden"
        aria-expanded={isOpen}
        aria-controls="toc-collapsible-list"
      >
        <span className="flex items-center gap-2">
          <List className="h-4 w-4 text-neutral-500 shrink-0" />
          <span>Table of Contents</span>
          <span className="font-mono text-[10px] text-neutral-400 normal-case font-normal">
            ({items.length} sections)
          </span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-neutral-400 hover:text-neutral-900"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="toc-collapsible-list"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <nav className="border-t border-neutral-200/60 pt-4" aria-label="Table of contents">
              <ul className="space-y-2.5">
                {items.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id} className="text-xs md:text-sm">
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleScroll(e, item.id)}
                        className={`group flex items-start gap-2.5 rounded-lg py-1.5 px-2 transition-all ${
                          isActive
                            ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                        }`}
                      >
                        <ArrowRight className={`h-3.5 w-3.5 shrink-0 mt-0.5 transition-transform ${
                          isActive ? 'text-amber-400 translate-x-0.5' : 'text-neutral-300 group-hover:text-neutral-500'
                        }`} />
                        <span className="truncate leading-relaxed">{item.text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
