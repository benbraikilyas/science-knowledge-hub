import { DEMO_CATEGORIES } from '@/lib/constants';
import { EDITORIAL_ARTICLES } from '@/lib/editorial-articles';
import { LATEST_NEWS_ARTICLES } from '@/lib/news-articles';
import { SCIENCE_BOOKS } from '@/lib/books';
import { DEMO_SCIENTISTS } from '@/lib/scientists';
import { SCIENTIST_COLLECTIONS } from '@/lib/scientist-collections';
import { getScientistDeepDive } from '@/lib/scientist-deep-dives';
import { GUIDES } from '@/lib/guides';
import { LEARNING_PATHS } from '@/lib/learning-paths';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site';

// Built once as a static file so it works on both Vercel and static Cloudflare hosting.
export const dynamic = 'force-static';

export async function GET() {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'Science Knowledge Hub is an independent educational platform providing source-cited science articles, 2025–2026 research updates, deep-dive scientist biographies, interactive physics calculators, guided learning paths, and legal public-domain science books.',
    '',
    '## Core Sections & Policies',
    `- [Home](${SITE_URL}/): Overview of featured explainers, categories, scientists, tools, and learning paths.`,
    `- [All Science Articles](${absoluteUrl('/articles')}): Full directory of evergreen explainers and 2025–2026 research reports.`,
    `- [Reading Guides](${absoluteUrl('/guides')}): Answer-first curated reading guides across science, AI, and free books.`,
    `- [Scientists Directory](${absoluteUrl('/scientists')}): 56 deep-dive profiles of pioneers across physical sciences, life sciences, computing, and the Islamic Golden Age.`,
    `- [Science Myths Debunked](${absoluteUrl('/science-myths')}): Over 100 popular myths about famous scientists, each paired with what the historical evidence shows.`,
    ...SCIENTIST_COLLECTIONS.map(
      (collection) => `- [${collection.title}](${absoluteUrl(`/scientists/${collection.slug}`)}): ${collection.description}`
    ),
    `- [Free Science Books Library](${absoluteUrl('/categories/books')}): ${SCIENCE_BOOKS.length} legal public-domain science classics with modern reading guides.`,
    `- [Science Learning Paths](${absoluteUrl('/learn')}): ${LEARNING_PATHS.length} structured curricula from quick starts to deep dives.`,
    `- [Interactive Science Tools Lab](${absoluteUrl('/tools')}): Educational calculators for light travel time, photon energy, relativistic time dilation, and escape velocity.`,
    `- [Editorial Policy](${absoluteUrl('/editorial-policy')}): Source hierarchy, verification standards, and corrections policy.`,
    `- [Sources & Credits](${absoluteUrl('/sources')}): Methodology, archive references, and image licensing.`,
    `- [RSS Feed](${absoluteUrl('/feed.xml')}): Machine-readable RSS 2.0 feed of published articles.`,
    '',
    '## Answer-First Reading Guides',
    ...GUIDES.map(
      (guide) => `- [${guide.title}](${absoluteUrl(`/guides/${guide.slug}`)}): ${guide.description}`
    ),
    '',
    '## Evergreen Science Explainers',
    ...EDITORIAL_ARTICLES.map(
      (article) => `- [${article.title}](${absoluteUrl(`/articles/${article.slug}`)}): ${article.excerpt}`
    ),
    '',
    '## Sourced 2025–2026 Science, AI & Robotics Research Updates',
    ...LATEST_NEWS_ARTICLES.map(
      (article) => `- [${article.title}](${absoluteUrl(`/articles/${article.slug}`)}): ${article.excerpt}`
    ),
    '',
    '## Scientist Profiles & Biographies',
    ...DEMO_SCIENTISTS.map((scientist) => {
      const deepDive = getScientistDeepDive(scientist.slug);
      const summary = deepDive?.summary || scientist.breakthrough || `${scientist.field} (${scientist.era})`;
      return `- [${scientist.name}](${absoluteUrl(`/scientists/${scientist.slug}`)}): ${summary}`;
    }),
    '',
    '## Free Public-Domain Science Books (With Reading Guides)',
    ...SCIENCE_BOOKS.map(
      (book) => `- [${book.title} by ${book.author.displayName}](${absoluteUrl(`/articles/${book.slug}`)}): ${book.excerpt}`
    ),
    '',
    '## Scientific Categories',
    ...DEMO_CATEGORIES.map(
      (category) => `- [${category.name}](${absoluteUrl(`/categories/${category.slug}`)}): ${category.description}`
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
