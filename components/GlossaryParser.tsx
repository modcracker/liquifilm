'use client';

import React from 'react';
import { GLOSSARY_TERMS, GlossaryTerm } from '@/lib/data';
import GlossaryTooltip from './GlossaryTooltip';

interface GlossaryParserProps {
  text: string;
}

// Map common singular, plural, or alternate terms to their respective glossary slugs.
// This allows more natural matching in the body copy.
const CUSTOM_ALIASES: Record<string, string[]> = {
  "nitrate-film": ["nitrate film", "nitrate base", "nitrate stocks", "nitrate stock", "nitrate"],
  "acetate-safety-film": ["safety film", "acetate safety film", "acetate film", "cellulose acetate", "acetate stock", "acetate base", "acetate"],
  "polyester-base-film": ["polyester base film", "polyester base", "polyester film", "polyester stocks", "polyester stock", "polyester"],
  "35mm": ["35mm film", "35mm gauge", "35mm"],
  "16mm": ["16mm film", "16mm gauge", "16mm"],
  "8mm": ["8mm film", "8mm gauge", "8mm", "regular 8"],
  "super-8": ["super 8mm film", "super 8mm", "super 8 film", "super 8"],
  "9-5mm-format": ["9.5mm format", "9.5mm film", "9.5mm"],
  "70mm": ["70mm film", "70mm gauge", "70mm"],
  "imax-film-format": ["imax format", "imax film", "imax"],
  "vinegar-syndrome": ["vinegar syndrome", "vinegar disease", "deacetylation"],
  "wet-gate-printing": ["wet gate printing", "wet gate scanning", "wet gate scanner", "wet gate systems", "wet gate system", "wet gate"],
  "dry-gate-printing": ["dry gate printing", "dry gate scanning", "dry gate scanner", "dry gate"],
  "ultrasonic-film-cleaning": ["ultrasonic film cleaning", "ultrasonic cleaning", "ultrasonic cleaner"],
  "chemical-film-restoration": ["chemical film restoration", "chemical restoration"],
  "frame-by-frame-digital-restoration": ["frame-by-frame digital restoration", "frame-by-frame restoration", "digital restoration"],
  "dust-busting": ["dust busting", "dust-busting"],
  "flicker-correction": ["flicker correction"],
  "image-stabilization": ["image stabilization", "stabilization threshold"],
  "telecine": ["telecine machine", "telecine transfers", "telecine transfer", "telecine"],
  "datacine": ["datacine"],
  "pin-registered-film-scanner": ["pin-registered film scanner", "pin-registered scanner", "pin-registration", "pin-registered"],
  "continuous-motion-film-scanner": ["continuous-motion film scanner", "continuous-motion scanner", "continuous-motion capstan scanner", "continuous-motion"],
  "dpx-file-format": ["dpx file format", "dpx files", "dpx file", "dpx format", "dpx"],
  "digital-intermediate-di": ["digital intermediate", "di"],
  "aces-color-space": ["aces color space", "aces standard", "aces"],
  "optical-soundtrack": ["optical soundtracks", "optical soundtrack", "optical sound track", "optical sound"],
  "magnetic-soundtrack": ["magnetic soundtracks", "magnetic soundtrack", "magnetic sound track", "magnetic sound"],
  "film-archive": ["film archives", "film archive", "archival archives", "archival archive"],
  "cinematheque": ["cinémathèque", "cinematheque"],
};

export default function GlossaryParser({ text }: GlossaryParserProps) {
  // Generate a full list of mapping items with their search terms
  const searchMap = React.useMemo(() => {
    const items: { term: GlossaryTerm; phrase: string }[] = [];

    GLOSSARY_TERMS.forEach((term) => {
      // 1. Add exact title
      const titleLower = term.title.toLowerCase();
      items.push({ term, phrase: titleLower });

      // 2. Add any stripped titles if it has standard format endings
      // e.g. "Nitrate Film" -> "nitrate"
      const cleanTitle = titleLower
        .replace(/\b(?:film|gauge|format|base film|base)\b/g, '')
        .trim();
      if (cleanTitle && cleanTitle !== titleLower && cleanTitle.length > 3) {
        items.push({ term, phrase: cleanTitle });
      }

      // 3. Add explicit custom aliases
      const custom = CUSTOM_ALIASES[term.slug];
      if (custom) {
        custom.forEach((alias) => {
          items.push({ term, phrase: alias.toLowerCase() });
        });
      }
    });

    // Sort by length of phrase descending to ensure we match the longest terms first
    return items
      .filter((v, i, a) => a.findIndex((t) => t.phrase === v.phrase) === i) // unique phrases
      .sort((a, b) => b.phrase.length - a.phrase.length);
  }, []);

  // Compile regex that matches any of the custom phrases or titles.
  const regex = React.useMemo(() => {
    if (searchMap.length === 0) return null;
    
    // Escape special regex chars in phrases
    const escapedPhrases = searchMap.map((item) =>
      item.phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    );

    // Join with regex Alternation
    // We surround it with word boundary patterns.
    // For phrases containing non-word characters (like dots or slashes, e.g. "9.5mm"), 
    // we use lookbehind/lookahead boundaries instead of strict \b.
    return new RegExp(`\\b(${escapedPhrases.join('|')})\\b`, 'gi');
  }, [searchMap]);

  if (!regex || !text) {
    return <>{text}</>;
  }

  // Split the text by regex matches.
  // When a capturing group is used in split, matches are included in the returned array.
  // So odd indices in the resulting array will be matched phrases.
  const parts = text.split(regex);
  if (parts.length <= 1) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 !== 0) {
          // This is a matched phrase. Find the corresponding term.
          const lowerPart = part.toLowerCase();
          const match = searchMap.find((item) => item.phrase === lowerPart);

          if (match) {
            return (
              <GlossaryTooltip key={index} term={match.term}>
                {part}
              </GlossaryTooltip>
            );
          }
        }
        return part;
      })}
    </>
  );
}
