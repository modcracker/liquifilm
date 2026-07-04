/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Shield, Maximize2, Settings, Compass, RefreshCw } from 'lucide-react';

interface PlaceholderImageProps {
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2' | '21:9' | string;
  altText: string;
  category: 'film' | 'chemicals' | 'laboratory' | 'optics' | 'historical' | 'machinery' | string;
  className?: string;
  showTechnicalOverlay?: boolean;
}

// Map categories to high-quality deterministic Picsum seeds
const CATEGORY_SEEDS: Record<string, { seed: string; label: string; tag: string }> = {
  film: {
    seed: 'liquifilm_gate_aperture_filmstrip',
    label: 'Cellulose Acetate Medium Scan',
    tag: 'FILM CORE'
  },
  chemicals: {
    seed: 'liquifilm_chemicals_solvents_liquid',
    label: 'Tetrachloroethylene Fluid Indexing',
    tag: 'CHEMISTRY'
  },
  laboratory: {
    seed: 'liquifilm_optics_calibration_laboratory',
    label: 'Optical Testing & Bench Chamber',
    tag: 'LAB BENCH'
  },
  optics: {
    seed: 'liquifilm_refractive_lens_optics',
    label: 'Liquid Refraction Calibration Target',
    tag: 'OPTICAL PLANE'
  },
  historical: {
    seed: 'liquifilm_historical_archival_conservation',
    label: 'Historical Cellulose Preservation Ledger',
    tag: 'ARCHIVE'
  },
  machinery: {
    seed: 'liquifilm_industrial_gear_printing_press',
    label: 'Sprocket Transport & Fluid Pump Assembly',
    tag: 'MECHANICAL'
  }
};

const DEFAULT_SEED = {
  seed: 'liquifilm_preservation_baseline',
  label: 'Preservation Standard Optical Capture',
  tag: 'TECHNICAL'
};

export default function PlaceholderImage({
  aspectRatio = '16:9',
  altText,
  category,
  className = '',
  showTechnicalOverlay = true
}: PlaceholderImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const getMatchedCategory = (cat: string) => {
    const normalized = cat.toLowerCase();
    if (normalized.includes('film') || normalized.includes('gate') || normalized.includes('core')) {
      return CATEGORY_SEEDS.film;
    }
    if (normalized.includes('chemical') || normalized.includes('solvent') || normalized.includes('safety') || normalized.includes('fluid')) {
      return CATEGORY_SEEDS.chemicals;
    }
    if (normalized.includes('optics') || normalized.includes('lens') || normalized.includes('refract') || normalized.includes('plane')) {
      return CATEGORY_SEEDS.optics;
    }
    if (normalized.includes('lab') || normalized.includes('test') || normalized.includes('calibration')) {
      return CATEGORY_SEEDS.laboratory;
    }
    if (normalized.includes('machiner') || normalized.includes('device') || normalized.includes('mechanical') || normalized.includes('sprint') || normalized.includes('pump') || normalized.includes('system') || normalized.includes('variant')) {
      return CATEGORY_SEEDS.machinery;
    }
    if (normalized.includes('history') || normalized.includes('archive') || normalized.includes('conservation') || normalized.includes('preserv')) {
      return CATEGORY_SEEDS.historical;
    }
    return CATEGORY_SEEDS[normalized] || DEFAULT_SEED;
  };

  const matchedCat = getMatchedCategory(category);

  // Determine width and height to request based on aspect ratio
  let w = 800;
  let h = 450;
  let tailwindAspectClass = 'aspect-[16/9]';

  if (aspectRatio === '4:3') {
    w = 800;
    h = 600;
    tailwindAspectClass = 'aspect-[4/3]';
  } else if (aspectRatio === '1:1') {
    w = 600;
    h = 600;
    tailwindAspectClass = 'aspect-square';
  } else if (aspectRatio === '3:2') {
    w = 900;
    h = 600;
    tailwindAspectClass = 'aspect-[3/2]';
  } else if (aspectRatio === '21:9') {
    w = 1200;
    h = 512;
    tailwindAspectClass = 'aspect-[21/9]';
  }

  const imageUrl = `https://picsum.photos/seed/${matchedCat.seed}_${reloadKey}/${w}/${h}.webp`;

  return (
    <div
      id={`placeholder-image-container-${category}`}
      className={`relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 group select-none ${tailwindAspectClass} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Grid Lines (Engine/CAD Style) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />

      {/* Film Sprocket Holes Overlay (Left and Right Rails) */}
      <div className="absolute left-1.5 top-0 bottom-0 w-2 flex flex-col justify-around pointer-events-none z-20 opacity-40 group-hover:opacity-65 transition-opacity">
        {[...Array(8)].map((_, i) => (
          <div key={`sprocket-left-${i}`} className="w-1.5 h-2.5 rounded-2xs bg-neutral-950 border border-neutral-800 shadow-inner" />
        ))}
      </div>
      <div className="absolute right-1.5 top-0 bottom-0 w-2 flex flex-col justify-around pointer-events-none z-20 opacity-40 group-hover:opacity-65 transition-opacity">
        {[...Array(8)].map((_, i) => (
          <div key={`sprocket-right-${i}`} className="w-1.5 h-2.5 rounded-2xs bg-neutral-950 border border-neutral-800 shadow-inner" />
        ))}
      </div>

      {/* Loading Placeholder skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 text-neutral-500">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="mb-2"
          >
            <RefreshCw className="h-5 w-5 text-neutral-400" />
          </motion.div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">Initializing Optical Render...</span>
        </div>
      )}

      {/* Core Image Element */}
      <img
        src={imageUrl}
        alt={altText}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
          imageLoaded ? 'opacity-90 scale-100 group-hover:scale-102 group-hover:opacity-100' : 'opacity-0 scale-95'
        }`}
      />

      {/* Optical Vignette Shadow Frame */}
      <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-neutral-950/20 to-neutral-950/70 pointer-events-none z-10" />

      {/* Camera / Calibration Grid Lines Overlays */}
      {showTechnicalOverlay && (
        <div className="absolute inset-x-8 inset-y-6 pointer-events-none z-25 border border-white/5 opacity-50 group-hover:opacity-80 transition-all">
          {/* Corner ticks */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />
          
          {/* Centered crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-4 h-[1px] bg-white/25 absolute" />
            <div className="h-4 w-[1px] bg-white/25 absolute" />
            <div className="w-1.5 h-1.5 rounded-full border border-white/20 absolute" />
          </div>
        </div>
      )}

      {/* Left Top Tag: Category Indicator */}
      <div className="absolute left-6 top-4 z-30 pointer-events-none flex items-center gap-1.5">
        <span className="font-mono text-[8px] font-bold tracking-widest text-white bg-neutral-950/80 border border-neutral-800 px-1.5 py-0.5 rounded-md backdrop-blur-xs shadow-md">
          {matchedCat.tag}
        </span>
      </div>

      {/* Right Top Tag: Aspect Ratio & Target Status */}
      <div className="absolute right-6 top-4 z-30 pointer-events-none flex items-center gap-1.5">
        <span className="font-mono text-[8px] text-neutral-300 bg-neutral-950/60 border border-white/5 px-1.5 py-0.5 rounded-md backdrop-blur-xs">
          AR: {aspectRatio}
        </span>
      </div>

      {/* Bottom Floating Calibration Overlay Pane */}
      <div className="absolute inset-x-6 bottom-4 z-30 transition-transform duration-300 translate-y-1 group-hover:translate-y-0">
        <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-lg p-2.5 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] font-bold text-neutral-100 uppercase tracking-wide truncate max-w-[180px] sm:max-w-[280px]">
                  {matchedCat.label}
                </span>
                <span className="font-mono text-[8px] text-neutral-400 mt-0.5">
                  Calibration: ACTIVE • REFR. INDEX MATCH
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setReloadKey(prev => prev + 1);
                }}
                className="p-1 rounded-md bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white text-neutral-400 transition-colors pointer-events-auto"
                title="Regenerate seed alignment"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
              <div className="h-3.5 w-[1px] bg-neutral-800" />
              <span className="font-mono text-[8px] text-neutral-400 font-bold bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded-md">
                1.490 RI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dark tint on focus or click */}
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/5 transition-all pointer-events-none z-15" />
    </div>
  );
}
