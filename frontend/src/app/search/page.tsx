import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import ScientistCard from '@/components/ScientistCard';
import type { ArticleListItem, ScientistListItem } from '@/lib/types';
import { Search, Sparkles, BookOpen, Users } from 'lucide-react';

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
    title: q ? `Search results for "${q}" | Science Knowledge Hub` : 'Cosmic Search | Science Knowledge Hub',
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

  const totalResults = articles.length + scientists.length;

  return (
    <div className="min-h-screen bg-[#000814] pb-24 text-slate-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#001d3d] via-[#000d1f] to-[#000814] py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            Cosmic Knowledge Search
          </div>

          <h1
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Search the{' '}
            <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              Universe
            </span>
          </h1>

          {/* Search Form */}
          <form action="/search" method="GET" className="mt-8 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search articles, equations, scientists, cosmic topics..."
                className="w-full rounded-2xl border border-gold-500/30 bg-[#001d3d] py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-400 outline-none backdrop-blur-xl transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,195,0,0.3)] transition-all hover:from-gold-400 hover:to-gold-300 active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Search suggestions */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Popular:</span>
            {['James Webb', 'Quantum Physics', 'Einstein', 'Black Holes', 'CRISPR', 'Relativity'].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-slate-300 transition-colors hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-200"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {query ? (
          <div>
            <div className="mb-8 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Found {totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</span>
            </div>

            {totalResults === 0 && (
              <div className="rounded-3xl border border-white/[0.08] bg-[#001d3d]/60 p-16 text-center backdrop-blur-xl">
                <Sparkles className="mx-auto h-12 w-12 text-slate-500" />
                <h3 className="mt-4 text-xl font-bold text-white">No cosmic matches found</h3>
                <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
                  We couldn&apos;t find any articles or scientists matching &ldquo;{query}&rdquo;. Try another term or explore all categories.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    href="/articles"
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-semibold text-white hover:bg-gold-400"
                  >
                    Browse Articles
                  </Link>
                  <Link
                    href="/categories"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/[0.08]"
                  >
                    Browse Categories
                  </Link>
                </div>
              </div>
            )}

            {/* Scientists Results */}
            {scientists.length > 0 && (
              <div className="mb-14">
                <div className="flex items-center gap-2 text-lg font-bold text-white mb-6">
                  <Users className="h-5 w-5 text-gold-400" />
                  <span>Matching Scientists ({scientists.length})</span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {scientists.map((scientist) => (
                    <ScientistCard key={scientist.id} scientist={scientist} />
                  ))}
                </div>
              </div>
            )}

            {/* Articles Results */}
            {articles.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-lg font-bold text-white mb-6">
                  <BookOpen className="h-5 w-5 text-gold-300" />
                  <span>Matching Articles ({articles.length})</span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/[0.08] bg-[#001d3d]/60 p-16 text-center backdrop-blur-xl">
            <Search className="mx-auto h-12 w-12 text-gold-400/60" />
            <h3 className="mt-4 text-xl font-bold text-white">Start Your Exploration</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
              Type keywords above to search through our database of articles, research topics, and pioneering scientists.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
