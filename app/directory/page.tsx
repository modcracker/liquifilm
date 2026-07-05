import React from 'react';
import DirectoryIndexPage from './directory-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Film Preservation Directory & Archival Registry | Liquifilm',
  description: 'Explore the verified global registry of prominent moving image libraries, historical film vaults, and founding FIAF members specializing in film preservation.',
  alternates: {
    canonical: '/directory',
  },
  openGraph: {
    title: 'Global Film Preservation Directory & Archival Registry | Liquifilm',
    description: 'Explore the verified global registry of prominent moving image libraries, historical film vaults, and founding FIAF members specializing in film preservation.',
    url: '/directory',
    type: 'website',
  },
};

export default function DirectoryPage() {
  return <DirectoryIndexPage />;
}
