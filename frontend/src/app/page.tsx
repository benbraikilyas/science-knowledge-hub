import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedArticles from '@/components/FeaturedArticles';
import CategoriesGrid from '@/components/CategoriesGrid';
import StatsCounter from '@/components/StatsCounter';
import ScientistsSpotlight from '@/components/ScientistsSpotlight';
import NewsletterSection from '@/components/NewsletterSection';
import { fetchFeaturedArticles, fetchCategories, fetchFeaturedScientists } from '@/lib/api';
import type { ArticleListItem, Category, ScientistListItem } from '@/lib/types';

async function getHomepageData() {
  try {
    const [rawArticles, rawCategories, rawScientists] = await Promise.all([
      fetchFeaturedArticles(),
      fetchCategories(),
      fetchFeaturedScientists(),
    ]);

    const articles = rawArticles as ArticleListItem[];
    const categories = rawCategories as Category[];
    const scientists = rawScientists as ScientistListItem[];

    if (articles.length && categories.length && scientists.length) {
      return { articles, categories, scientists };
    }
  } catch {}

  const { DEMO_ARTICLES, DEMO_CATEGORIES, DEMO_SCIENTISTS } = await import('@/lib/constants');
  return {
    articles: DEMO_ARTICLES as ArticleListItem[],
    categories: DEMO_CATEGORIES as Category[],
    scientists: DEMO_SCIENTISTS as ScientistListItem[],
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
