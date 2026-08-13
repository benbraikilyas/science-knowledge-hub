import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedArticles from '@/components/FeaturedArticles';
import CategoriesGrid from '@/components/CategoriesGrid';
import StatsCounter from '@/components/StatsCounter';
import ScientistsSpotlight from '@/components/ScientistsSpotlight';
import NewsletterSection from '@/components/NewsletterSection';
import type { ArticleListItem, Category, ScientistListItem } from '@/lib/types';

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

async function getHomepageData() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  const [articles, categories, scientists] = await Promise.all([
    fetchJson<ArticleListItem[]>(`${api}/articles/featured/`),
    fetchJson<Category[]>(`${api}/categories/`),
    fetchJson<ScientistListItem[]>(`${api}/scientists/featured/`),
  ]);

  const { DEMO_ARTICLES, DEMO_CATEGORIES, DEMO_SCIENTISTS } = await import('@/lib/constants');
  return {
    articles: articles ?? DEMO_ARTICLES,
    categories: categories ?? DEMO_CATEGORIES,
    scientists: scientists ?? DEMO_SCIENTISTS,
  };
}

export default async function HomePage() {
  const { articles, categories, scientists } = await getHomepageData();

  return (
    <>
      <HeroSection />
      <Suspense fallback={null}>
        <FeaturedArticles articles={articles} />
      </Suspense>
      <Suspense fallback={null}>
        <CategoriesGrid categories={categories} />
      </Suspense>
      <StatsCounter />
      <Suspense fallback={null}>
        <ScientistsSpotlight scientists={scientists} />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
