import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Built once as a plain file, so it also works on static hosting.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/login', '/register', '/search'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
