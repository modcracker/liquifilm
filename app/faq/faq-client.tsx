'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '@/lib/data';

export default function FAQClient() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {FAQ_DATA.map((item, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-3xs"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-neutral-900 hover:bg-neutral-50/50 transition-colors cursor-pointer"
            >
              <span className="flex items-start gap-3.5 pr-4 text-sm md:text-base">
                <HelpCircle className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-neutral-100"
                >
                  <div className="p-5 text-sm md:text-base text-neutral-600 leading-relaxed bg-neutral-50/30">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
