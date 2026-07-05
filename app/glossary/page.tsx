import React from 'react';
import GlossaryIndexPage from './glossary-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Film Preservation Glossary | Liquifilm',
  description: 'A comprehensive reference glossary for film preservation, photochemical restoration, optical scanning, and liquid wet gate printing terminology.',
  alternates: {
    canonical: '/glossary',
  },
  openGraph: {
    title: 'Technical Film Preservation Glossary | Liquifilm',
    description: 'A comprehensive reference glossary for film preservation, photochemical restoration, optical scanning, and liquid wet gate printing terminology.',
    url: '/glossary',
    type: 'website',
  },
};

export default function GlossaryPage() {
  return <GlossaryIndexPage />;
}
