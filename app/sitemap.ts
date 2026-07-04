import { MetadataRoute } from 'next';
import { WET_GATE_PAGES, WIDER_TOPICS, GLOSSARY_TERMS, DIRECTORY_ENTRIES } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://liquifilm.com';

  // Base routes
  const routes = [
    '',
    '/wet-gate-printing',
    '/glossary',
    '/directory',
    '/faq',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Wet Gate Printing Articles
  const wetGateRoutes = WET_GATE_PAGES.map((page) => ({
    url: `${siteUrl}/wet-gate-printing/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Wider Topics
  const topicRoutes = WIDER_TOPICS.map((page) => ({
    url: `${siteUrl}/topics/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Glossary Terms
  const glossaryRoutes = GLOSSARY_TERMS.map((term) => ({
    url: `${siteUrl}/glossary/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic Directory Entries
  const directoryRoutes = DIRECTORY_ENTRIES.map((entry) => ({
    url: `${siteUrl}/directory/${entry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...routes,
    ...wetGateRoutes,
    ...topicRoutes,
    ...glossaryRoutes,
    ...directoryRoutes,
  ];
}
