import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import type { ArticleListItem } from '@/lib/types';

async function getArticles(searchParams: Record<string, string | undefined>) {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    const params = new URLSearchParams();
    if (searchParams.category) params.set('category', searchParams.category);
    if (searchParams.tag) params.set('tag', searchParams.tag);
    const res = await fetch(`${api}/articles/?${params}`, { next: { revalidate: 60 } });
    return await res.json();
  } catch {
    const { DEMO_ARTICLES } = await import('@/lib/constants');
    let filtered = [...DEMO_ARTICLES];
    if (searchParams.category) {
      filtered = filtered.filter((a: { category: { slug: string } }) => a.category.slug === searchParams.category);
    }
    return filtered;
  }
}

export const metadata = {
  title: 'Articles',
  description: 'Browse thousands of scientific articles on space, physics, biology, AI, technology, and more.',
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const articles: ArticleListItem[] = await getArticles(params);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Articles
        </h1>
        <p className="text-[var(--text-secondary)]">
          Explore our collection of scientific articles and discoveries
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <p className="text-lg text-[var(--text-muted)]">No articles found.</p>
          <Link
            href="/articles"
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] px-6 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-card)]"
          >
            View all articles
          </Link>
        </div>
      )}
    </div>
  );
}
