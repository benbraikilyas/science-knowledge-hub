import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const expectedFiles = [
  'src/lib/news-ai-2025-2026.ts',
  'src/lib/news-robotics-2025-2026.ts',
  'src/lib/news-science-2025-2026.ts',
];

const expectedArticleCount = 10;
const latestAllowedDate = new Date('2026-09-22T23:59:59Z');
const seenIds = new Set();
const seenSlugs = new Set();
const errors = [];
let totalArticles = 0;

const capture = (block, pattern, label, file) => {
  const match = block.match(pattern);
  if (!match) errors.push(`${file}: missing ${label}`);
  return match?.[1] || '';
};

for (const relativeFile of expectedFiles) {
  const file = resolve(process.cwd(), relativeFile);
  const source = readFileSync(file, 'utf8');
  const blocks = source.split('makeNewsArticle({').slice(1);

  if (blocks.length !== expectedArticleCount) {
    errors.push(`${relativeFile}: expected ${expectedArticleCount} articles, found ${blocks.length}`);
  }

  if (!source.trimEnd().endsWith('];')) {
    errors.push(`${relativeFile}: article array is not closed with ];`);
  }

  for (const block of blocks) {
    totalArticles += 1;
    const id = capture(block, /\bid:\s*'([^']+)'/, 'id', relativeFile);
    const slug = capture(block, /\bslug:\s*'([^']+)'/, 'slug', relativeFile);
    const publishedAt = capture(block, /\bpublishedAt:\s*'([^']+)'/, 'publishedAt', relativeFile);
    const content = capture(block, /\bcontent:\s*`([\s\S]*?)`\s*,\s*\n\s*\}\)/, 'content', relativeFile);
    const sourceBlock = capture(block, /\bsourceUrls:\s*\[([\s\S]*?)\]\s*,\s*\n\s*content:/, 'sourceUrls', relativeFile);
    const tagBlock = capture(block, /\btags:\s*\[([\s\S]*?)\]\s*,\s*\n\s*readTime:/, 'tags', relativeFile);
    const sourceUrls = [...sourceBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]);
    const tags = [...tagBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]);
    const primarySection = content.split('## Primary sources')[1] || '';
    const inlineSources = [...primarySection.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(
      (match) => match[1]
    );
    const words = content.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu) || [];

    if (seenIds.has(id)) errors.push(`${relativeFile}: duplicate id ${id}`);
    if (seenSlugs.has(slug)) errors.push(`${relativeFile}: duplicate slug ${slug}`);
    seenIds.add(id);
    seenSlugs.add(slug);

    const date = new Date(publishedAt);
    if (Number.isNaN(date.getTime()) || !/^202[56]-/.test(publishedAt) || date > latestAllowedDate) {
      errors.push(`${id}: invalid or out-of-range publishedAt ${publishedAt}`);
    }

    if (sourceUrls.length < 2 || sourceUrls.length > 4) {
      errors.push(`${id}: expected 2–4 sourceUrls, found ${sourceUrls.length}`);
    }
    if (sourceUrls.some((url) => !url.startsWith('https://'))) {
      errors.push(`${id}: every source URL must use HTTPS`);
    }
    if (JSON.stringify(sourceUrls) !== JSON.stringify(inlineSources)) {
      errors.push(`${id}: sourceUrls and Primary sources links differ`);
    }
    if (tags.length < 5 || tags.length > 8) {
      errors.push(`${id}: expected 5–8 tags, found ${tags.length}`);
    }
    if (words.length < 500 || words.length > 950) {
      errors.push(`${id}: expected 500–950 content words, found ${words.length}`);
    }
    if (!content.includes('## Primary sources')) {
      errors.push(`${id}: missing Primary sources section`);
    }
  }
}

if (totalArticles !== expectedFiles.length * expectedArticleCount) {
  errors.push(`expected 30 total news articles, found ${totalArticles}`);
}

for (const relativeFile of ['src/lib/editorial-articles.ts', 'src/lib/books.ts']) {
  const source = readFileSync(resolve(process.cwd(), relativeFile), 'utf8');
  for (const match of source.matchAll(/\bslug:\s*'([^']+)'/g)) {
    if (seenSlugs.has(match[1])) {
      errors.push(`${relativeFile}: slug collides with a news article: ${match[1]}`);
    }
  }
  for (const match of source.matchAll(/\bid:\s*'([^']+)'/g)) {
    if (seenIds.has(match[1])) {
      errors.push(`${relativeFile}: id collides with a news article: ${match[1]}`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${totalArticles} sourced 2025–2026 news articles.`);
