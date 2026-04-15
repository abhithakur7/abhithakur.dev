import type { MetadataRoute } from 'next';
import { getAllWork } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://abhishekthakur.dev';
  const work = await getAllWork();
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    ...work.map((w) => ({
      url: `${base}/work/${w.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
