import { MetadataRoute } from 'next';
import { STATIC_JOBS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  // Configurable base URL for deployment
  const baseUrl = 'https://ibeesjobs.in';

  // Core static pages
  const routes = [
    '',
    '/about',
    '/contact',
    '/jobs',
    '/inquire/it',
    '/inquire/office',
    '/inquire/abroad'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic job listing detail pages (56 items)
  const jobRoutes = STATIC_JOBS.map((job) => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: new Date(job.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...jobRoutes];
}
