import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import type { ArticleListItem, Category } from '@/lib/types';

interface CategoryDetailProps {
  params: Promise<{ slug: string }>;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

async function getCategoryData(slug: string) {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  const [category, articles] = await Promise.all([
    fetchJson<Category>(`${api}/categories/${slug}/`),
    fetchJson<ArticleListItem[]>(`${api}/articles/?category=${slug}`),
  ]);

  if (category !== null && articles !== null) {
    return { category, articles };
  }

  const { DEMO_CATEGORIES, DEMO_ARTICLES } = await import('@/lib/constants');
  const demoCategory = DEMO_CATEGORIES.find((c: Category) => c.slug === slug) || null;
  const demoArticles = DEMO_ARTICLES.filter((a: ArticleListItem) => a.category.slug === slug);
  return { category: category ?? demoCategory, articles: articles ?? demoArticles };
}

export async function generateMetadata({ params }: CategoryDetailProps) {
  const { slug } = await params;
  const { category } = await getCategoryData(slug);
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category.name} - Articles`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailProps) {
  const { slug } = await params;
  const { category, articles } = await getCategoryData(slug);

  if (!category) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Category Not Found</h1>
        <p className="mt-2 text-[var(--text-secondary)]">This category doesn&apos;t exist.</p>
        <Link href="/categories" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-6 text-sm font-medium text-white">
          Browse Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
          style={{ backgroundColor: `${category.color}20` }}
        >
          <span>{category.icon}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            {category.name}
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">{category.description}</p>
        </div>
      </div>

      {articles.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: ArticleListItem) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <p className="text-lg text-[var(--text-muted)]">No articles in this category yet.</p>
        </div>
      )}
    </div>
  );
}
