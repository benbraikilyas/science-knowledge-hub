import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedArticles from '@/components/FeaturedArticles';
import CategoriesGrid from '@/components/CategoriesGrid';
import StatsCounter from '@/components/StatsCounter';
import ScientistsSpotlight from '@/components/ScientistsSpotlight';
import NewsletterSection from '@/components/NewsletterSection';
import LearningPathsSection from '@/components/LearningPathsSection';
import { fetchFeaturedArticles, fetchCategories, fetchFeaturedScientists } from '@/lib/api';
import { DEMO_SCIENTISTS, mergeScientistProfiles } from '@/lib/scientists';
import type { ArticleListItem, Category, ScientistListItem } from '@/lib/types';

async function getHomepageData() {
  try {
    const [rawArticles, rawCategories, rawScientists] = await Promise.all([
      fetchFeaturedArticles(),
      fetchCategories(),
      fetchFeaturedScientists(),
    ]);

    const articles = (rawArticles as ArticleListItem[]).filter((a) => a.category.slug !== 'books');
    const categories = rawCategories as Category[];
    const scientists = mergeScientistProfiles(rawScientists as ScientistListItem[])
      .filter((scientist) => scientist.isFeatured)
      .slice(0, 8);

    if (articles.length && categories.length && scientists.length) {
      return { articles, categories, scientists };
    }
  } catch {}

  const { DEMO_ARTICLES, DEMO_CATEGORIES } = await import('@/lib/constants');
  return {
    articles: (DEMO_ARTICLES as ArticleListItem[]).filter((a) => a.category.slug !== 'books'),
    categories: DEMO_CATEGORIES as Category[],
    scientists: DEMO_SCIENTISTS.filter((scientist) => scientist.isFeatured).slice(0, 8),
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
      <LearningPathsSection />
      <StatsCounter />
      <Suspense fallback={null}>
        <ScientistsSpotlight scientists={scientists} />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
