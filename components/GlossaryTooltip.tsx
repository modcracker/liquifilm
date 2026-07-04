'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { GlossaryTerm } from '@/lib/data';

interface GlossaryTooltipProps {
  term: GlossaryTerm;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Calculate positioning
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      
      setCoords({
        top: rect.top + scrollTop - 8, // slightly above the trigger word
        left: rect.left + scrollLeft + (rect.width / 2), // centered horizontally
      });
    }
    
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Small delay so the user can move their mouse into the tooltip card if needed
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help border-b border-dashed border-amber-500 bg-amber-50/30 px-0.5 text-neutral-900 hover:text-amber-700 hover:bg-amber-100/50 transition-colors inline-flex items-center gap-0.5 rounded-xs"
      >
        {children}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'absolute',
              top: '-12px', // positioned relative to trigger box
              left: '50%',
              transform: 'translate(-50%, -100%)',
              zIndex: 50,
            }}
            className="block pointer-events-auto"
          >
            {/* The Tooltip Card */}
            <span className="block w-72 rounded-xl border border-neutral-200 bg-white p-4 shadow-xl text-left select-none leading-normal">
              <span className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-2">
                <span className="flex items-center gap-1.5 font-display text-xs font-bold text-neutral-900">
                  <BookOpen className="h-3.5 w-3.5 text-amber-500" />
                  <span>{term.title}</span>
                </span>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[9px] font-semibold text-neutral-500 uppercase tracking-wider">
                  {term.categoryLabel}
                </span>
              </span>

              <span className="block mt-2 font-sans text-xs text-neutral-600 leading-relaxed">
                {term.shortDefinition}
              </span>

              <Link
                href={`/glossary/${term.slug}`}
                className="mt-3 flex items-center justify-between rounded-lg bg-neutral-50 px-2.5 py-1.5 font-mono text-[10px] font-bold text-amber-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                <span>READ DETAILED EXPLAINER</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-amber-500" />
              </Link>
              
              {/* Tooltip Arrow */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-white z-20" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-[9px] border-transparent border-t-neutral-200 z-10" />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
