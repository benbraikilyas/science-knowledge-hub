import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Built once as a plain file, so it also works on static hosting.
export const dynamic = 'force-static';

const DISALLOWED_PATHS = ['/api/', '/login', '/register', '/search', '/unsubscribe'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
