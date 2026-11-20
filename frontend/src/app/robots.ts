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
    // No "Host:" line: it is not part of the robots.txt standard (RFC 9309), Google ignores it,
    // and Bing's robots.txt tester reports it as an error.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
