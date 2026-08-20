import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { fetchCategory, fetchArticles } from '@/lib/api';
import type { ArticleListItem, Category } from '@/lib/types';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface CategoryDetailProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryData(slug: string) {
  try {
    const [rawCategory, rawArticles] = await Promise.all([
      fetchCategory(slug),
      fetchArticles({ category: slug }),
    ]);

    const category = rawCategory as Category | null;
    const articles = rawArticles as ArticleListItem[];

    if (category !== null) {
      return { category, articles };
    }
  } catch {}

  const { DEMO_CATEGORIES, DEMO_ARTICLES } = await import('@/lib/constants');
  const demoCategory = DEMO_CATEGORIES.find((c: Category) => c.slug === slug) || null;
  const demoArticles = DEMO_ARTICLES.filter((a: ArticleListItem) => a.category.slug === slug);
  return { category: demoCategory, articles: demoArticles };
}

export async function generateMetadata({ params }: CategoryDetailProps) {
  const { slug } = await params;
  const { category } = await getCategoryData(slug);
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category.name} | Science Knowledge Hub`,
    description: category.description,
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

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 transition-colors hover:text-gold-300 mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Categories</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border-color)] text-3xl shadow-lg"
              style={{
                backgroundColor: `${category.color}20`,
                boxShadow: `0 0 30px ${category.color}35`,
              }}
            >
              {category.icon}
            </div>

            <div>
              <h1
                className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {category.name}
              </h1>
              <p className="mt-2 text-base text-[var(--text-secondary)] max-w-2xl">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
          <span>{articles.length} articles available</span>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article: ArticleListItem) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-16 text-center backdrop-blur-xl">
            <p className="text-lg text-[var(--text-secondary)]">No articles in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
