import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import BooksLibrary from '@/components/BooksLibrary';
import { fetchCategory, fetchArticles } from '@/lib/api';
import type { ArticleListItem, Category } from '@/lib/types';
import { toArticleListItem } from '@/lib/article-list';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface CategoryDetailProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryData(slug: string) {
  const { DEMO_CATEGORIES, DEMO_ARTICLES } = await import('@/lib/constants');
  const localCategory = DEMO_CATEGORIES.find((category: Category) => category.slug === slug) || null;
  const localArticles = DEMO_ARTICLES
    .filter((article: ArticleListItem) => article.category.slug === slug)
    .map(toArticleListItem);

  try {
    const [rawCategory, rawArticles] = await Promise.all([
      fetchCategory(slug),
      fetchArticles({ category: slug }),
    ]);

    const remoteCategory = rawCategory as Category | null;
    const remoteArticles = Array.isArray(rawArticles) ? rawArticles as ArticleListItem[] : [];

    if (remoteCategory !== null || localCategory !== null) {
      const category = localCategory && remoteCategory
        ? { ...localCategory, ...remoteCategory }
        : remoteCategory || localCategory;
      const remoteBySlug = new Map(remoteArticles.map((article) => [article.slug, article]));
      const mergedLocal = localArticles.map((article) => {
        const remote = remoteBySlug.get(article.slug);
        if (!remote) return article;
        remoteBySlug.delete(article.slug);
        return { ...article, ...remote };
      });

      return {
        category,
        articles: [...mergedLocal, ...remoteBySlug.values()].map(toArticleListItem),
      };
    }
  } catch {}

  return { category: localCategory, articles: localArticles };
}

export async function generateMetadata({ params }: CategoryDetailProps) {
  const { slug } = await params;
  const { category, articles } = await getCategoryData(slug);
  if (!category) return { title: 'Category Not Found' };
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${slug}` },
    robots: { index: articles.length > 0, follow: true },
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailProps) {
  const { slug } = await params;
  const { category, articles } = await getCategoryData(slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/80 p-12 backdrop-blur-xl">
          <Sparkles className="mx-auto h-12 w-12 text-slate-500" />
          <h1 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">Category Not Found</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">The requested scientific category does not exist.</p>
          <Link
            href="/categories"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-400"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-20">
        <div
          className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full opacity-20 blur-[130px]"
          style={{ backgroundColor: category.color }}
        />

        <div className="relative z-10 mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 sm:px-6 lg:px-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Categories</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            <div
              className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-3xl border border-[var(--border-color)] text-4xl sm:text-5xl shadow-2xl"
              style={{
                backgroundColor: `${category.color}20`,
                boxShadow: `0 0 35px ${category.color}35`,
              }}
            >
              {category.icon}
            </div>

            <div>
              <h1
                className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {category.name}
              </h1>
              <p className="mt-3 text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles / Books Grid */}
      <div className="mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 pt-12 sm:px-6 lg:px-10">
        {category.slug === 'books' ? (
          <BooksLibrary books={articles} />
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between border-b border-[var(--border-color)]/60 pb-4 font-mono text-sm text-[var(--text-secondary)] sm:text-base">
              <span>{articles.length} articles available</span>
            </div>

            {articles.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {articles.map((article: ArticleListItem) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-16 text-center backdrop-blur-xl sm:p-24">
                <p className="text-xl text-[var(--text-secondary)] sm:text-2xl">No articles in this category yet. Check back soon!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
