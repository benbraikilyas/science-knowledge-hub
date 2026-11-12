import type { MetadataRoute } from 'next';
import { DEMO_ARTICLES, DEMO_CATEGORIES } from '@/lib/constants';
import { GUIDES } from '@/lib/guides';
import { DEMO_SCIENTISTS } from '@/lib/scientists';
import { SITE_URL, absoluteUrl } from '@/lib/site';

// Built once as a plain file, so it also works on static hosting.
export const dynamic = 'force-static';

const STATIC_ROUTES = [
  '',
  '/about',
  '/articles',
  '/categories',
  '/scientists',
  '/guides',
  '/learn',
  '/tools',
  '/editorial-policy',
  '/sources',
  '/contact',
  '/privacy',
  '/cookies',
  '/terms',
  '/affiliate-disclosure',
  '/sitemap',
  '/authors/sciencehub-editorial-team',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  const categories: MetadataRoute.Sitemap = DEMO_CATEGORIES.map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const scientists: MetadataRoute.Sitemap = DEMO_SCIENTISTS.map((scientist) => ({
    url: `${SITE_URL}/scientists/${scientist.slug}`,
    images: scientist.portraitImage ? [absoluteUrl(scientist.portraitImage)] : [],
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const publishableArticles = (
    DEMO_ARTICLES as Array<(typeof DEMO_ARTICLES)[number] & { content?: string }>
  ).filter((article) => article.content?.trim());

  const articles: MetadataRoute.Sitemap = publishableArticles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    images: article.featuredImage ? [absoluteUrl(article.featuredImage)] : [],
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...categories, ...guides, ...scientists, ...articles];
}
