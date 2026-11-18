import { DEMO_ARTICLES } from '@/lib/constants';
import { GUIDES } from '@/lib/guides';
import { SCIENTIST_COLLECTIONS } from '@/lib/scientist-collections';
import { getScientistDeepDive } from '@/lib/scientist-deep-dives';
import { DEMO_SCIENTISTS } from '@/lib/scientists';
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from '@/lib/site';

// A plain-text map of the site for AI assistants and answer engines (llmstxt.org format).
// Built once as a plain file, so it also works on static hosting.
export const dynamic = 'force-static';

type ListedArticle = { slug: string; title: string; excerpt?: string; content?: string; category?: { slug?: string } };

const line = (title: string, path: string, note?: string) =>
  `- [${title}](${absoluteUrl(path)})${note ? `: ${note.replace(/\s+/g, ' ').trim()}` : ''}`;

export async function GET() {
  const articles = (DEMO_ARTICLES as ListedArticle[]).filter((article) => article.content?.trim());
  const books = articles.filter((article) => article.category?.slug === 'books');
  const explainers = articles.filter((article) => article.category?.slug !== 'books');

  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'Original, sourced explainers on space, physics, biology, AI and robotics; in-depth biographies of 56 scientists, including 18 pioneers of the Islamic Golden Age; and reading guides to free public-domain science classics. Written and checked by the ScienceHub editorial team; sources are cited on every article.',
    '',
    '## Scientist guides',
    ...SCIENTIST_COLLECTIONS.map((collection) => line(collection.title, `/scientists/${collection.slug}`, collection.description)),
    line('All scientist biographies', '/scientists'),
    '',
    '## Scientist biographies',
    ...DEMO_SCIENTISTS.map((scientist) =>
      line(scientist.name, `/scientists/${scientist.slug}`, getScientistDeepDive(scientist.slug)?.summary ?? scientist.breakthrough)),
    '',
    '## Reading guides',
    ...GUIDES.map((guide) => line(guide.title, `/guides/${guide.slug}`, guide.description)),
    '',
    '## Science explainers and news',
    ...explainers.map((article) => line(article.title, `/articles/${article.slug}`, article.excerpt)),
    '',
    '## Free science books (public domain)',
    ...books.map((article) => line(article.title, `/articles/${article.slug}`, article.excerpt)),
    '',
    '## About',
    line('About the site', '/about'),
    line('Editorial policy', '/editorial-policy'),
    line('Sources and image credits', '/sources'),
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
