import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Liquifilm — Film Restoration & Preservation Hub',
  description: 'The definitive open-access reference knowledge base for technical motion picture conservation, physical repair, and optical liquid wet gate scanning.',
  metadataBase: new URL('https://liquifilm.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Liquifilm — Film Restoration & Preservation Hub',
    description: 'The definitive open-access reference knowledge base for technical motion picture conservation, physical repair, and optical liquid wet gate scanning.',
    url: 'https://liquifilm.com',
    siteName: 'Liquifilm',
    images: [
      {
        url: 'https://picsum.photos/seed/liquifilm/1200/630',
        width: 1200,
        height: 630,
        alt: 'Liquifilm - Film Restoration & Preservation Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liquifilm — Film Restoration & Preservation Hub',
    description: 'The definitive open-access reference for optical liquid wet gate scanning and film conservation.',
    images: ['https://picsum.photos/seed/liquifilm/1200/630'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://liquifilm.com/#organization",
    "name": "Liquifilm",
    "url": "https://liquifilm.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://liquifilm.com/icon.png"
    },
    "description": "The definitive open-access reference knowledge base for technical motion picture conservation, physical repair, and optical liquid wet gate scanning.",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-800-555-FILM",
        "contactType": "Archival Preservation Support",
        "email": "preservation@liquifilm.com",
        "areaServed": "US",
        "availableLanguage": ["en"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+1-800-555-SCANS",
        "contactType": "Technical Engineering Desk",
        "email": "engineering@liquifilm.com",
        "areaServed": "Global",
        "availableLanguage": ["en"]
      }
    ],
    "sameAs": [
      "https://twitter.com/liquifilm",
      "https://github.com/liquifilm"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#FAF9F6]">
        <SchemaMarkup schema={orgSchema} />
        <Header />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
