import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import type { ArticleListItem, ScientistListItem } from '@/lib/types';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

async function getSearchResults(query: string) {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  const [articles, scientists] = await Promise.all([
    fetchJson<ArticleListItem[]>(`${api}/articles/?search=${encodeURIComponent(query)}`),
    fetchJson<ScientistListItem[]>(`${api}/scientists/?search=${encodeURIComponent(query)}`),
  ]);

  if (articles !== null && scientists !== null) {
    return { articles, scientists };
  }

  const { DEMO_ARTICLES, DEMO_SCIENTISTS } = await import('@/lib/constants');
  const q = query.toLowerCase();
  const demoArticles = DEMO_ARTICLES.filter(
    (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q))
  );
  const demoScientists = DEMO_SCIENTISTS.filter(
    (s) => s.name.toLowerCase().includes(q) || s.field.toLowerCase().includes(q)
  );
  return {
    articles: articles ?? demoArticles,
    scientists: scientists ?? demoScientists,
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}"` : 'Search',
    description: q ? `Search results for "${q}" on Science Knowledge Hub` : 'Search scientific articles, scientists, and topics',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';

  let articles: ArticleListItem[] = [];
  let scientists: ScientistListItem[] = [];

  if (query) {
    const results = await getSearchResults(query);
    articles = results.articles;
    scientists = results.scientists;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Search
        </h1>
        {query && (
          <p className="text-[var(--text-secondary)]">
            {articles.length + scientists.length} result{articles.length + scientists.length !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>
        )}
      </div>

      <form action="/search" method="GET" className="mt-8 flex max-w-xl gap-3">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search articles, scientists, topics..."
          className="flex-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)]"
          autoFocus
        />
        <button
          type="submit"
          className="rounded-xl bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Search
        </button>
      </form>

      {query && articles.length === 0 && scientists.length === 0 && (
        <div className="mt-20 text-center">
          <p className="text-lg text-[var(--text-muted)]">No results found for &quot;{query}&quot;.</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Try a different search term or browse categories.</p>
        </div>
      )}

      {scientists.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Scientists</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {scientists.map((scientist) => (
              <Link
                key={scientist.id}
                href={`/scientists/${scientist.slug}`}
                className="flex items-center gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 transition-all hover:shadow-[var(--shadow-glow)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--gradient-nebula)] text-lg font-bold text-white">
                  {scientist.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-[var(--text-primary)] truncate">{scientist.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{scientist.field} · {scientist.nationality}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {articles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Articles</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
