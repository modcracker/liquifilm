import React from 'react';
import VerificationPage from './verification-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archival Verification & Secure Contact Portal | Liquifilm',
  description: 'Verify credentials and contact our independent preservation panel or technical engineering desk securely. Safeguarded against automated harvesting and spam.',
  alternates: {
    canonical: '/verification',
  },
  openGraph: {
    title: 'Archival Verification & Secure Contact Portal | Liquifilm',
    description: 'Verify credentials and contact our independent preservation panel or technical engineering desk securely. Safeguarded against automated harvesting and spam.',
    url: '/verification',
    type: 'website',
  },
};

export default function VerificationPageWrapper() {
  return <VerificationPage />;
}
