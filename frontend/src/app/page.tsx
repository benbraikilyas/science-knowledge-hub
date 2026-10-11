import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedArticles from '@/components/FeaturedArticles';
import CategoriesGrid from '@/components/CategoriesGrid';
import StatsCounter from '@/components/StatsCounter';
import ScientistsSpotlight from '@/components/ScientistsSpotlight';
import NewsletterSection from '@/components/NewsletterSection';
import LearningPathsSection from '@/components/LearningPathsSection';
import ScienceToolsSection from '@/components/ScienceToolsSection';
import { fetchFeaturedArticles, fetchCategories, fetchFeaturedScientists } from '@/lib/api';
import { DEMO_SCIENTISTS, mergeScientistProfiles } from '@/lib/scientists';
import { toArticleListItem } from '@/lib/article-list';
import type { ArticleListItem, Category, ScientistListItem } from '@/lib/types';

export const metadata = { alternates: { canonical: '/' } };

async function getHomepageData() {
  const { DEMO_ARTICLES, DEMO_CATEGORIES, PLATFORM_STATS } = await import('@/lib/constants');
  const localArticles = (DEMO_ARTICLES as ArticleListItem[])
    .filter((article) => article.category.slug !== 'books')
    .map(toArticleListItem);

  try {
    const [rawArticles, rawCategories, rawScientists] = await Promise.all([
      fetchFeaturedArticles(),
      fetchCategories(),
      fetchFeaturedScientists(),
    ]);

    const remoteArticles = (rawArticles as ArticleListItem[])
      .filter((article) => article.category.slug !== 'books');
    const remoteArticlesBySlug = new Map(remoteArticles.map((article) => [article.slug, article]));
    const articles = localArticles.map((article) => {
      const remote = remoteArticlesBySlug.get(article.slug);
      if (!remote) return article;
      remoteArticlesBySlug.delete(article.slug);
      return { ...article, ...remote };
    });
    articles.push(...remoteArticlesBySlug.values());

    const remoteCategoriesBySlug = new Map(
      (rawCategories as Category[]).map((category) => [category.slug, category])
    );
    const categories = (DEMO_CATEGORIES as Category[]).map((category) => {
      const remote = remoteCategoriesBySlug.get(category.slug);
      if (!remote) return category;
      remoteCategoriesBySlug.delete(category.slug);
      return {
        ...category,
        ...remote,
        articleCount: Math.max(category.articleCount, remote.articleCount || 0),
      };
    });
    categories.push(...remoteCategoriesBySlug.values());

    const scientists = mergeScientistProfiles(rawScientists as ScientistListItem[])
      .filter((scientist) => scientist.isFeatured)
      .slice(0, 8);

    if (articles.length && categories.length && scientists.length) {
      return {
        articles: articles.slice(0, 7).map(toArticleListItem),
        categories,
        scientists,
        stats: PLATFORM_STATS,
      };
    }
  } catch {}

  return {
    articles: localArticles.slice(0, 7),
    categories: DEMO_CATEGORIES as Category[],
    scientists: DEMO_SCIENTISTS.filter((scientist) => scientist.isFeatured).slice(0, 8),
    stats: PLATFORM_STATS,
  };
}

export default async function HomePage() {
  const { articles, categories, scientists, stats } = await getHomepageData();

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
      <ScienceToolsSection />
      <StatsCounter stats={stats} />
      <Suspense fallback={null}>
        <ScientistsSpotlight scientists={scientists} />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
