import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import ScientistCard from '@/components/ScientistCard';
import { fetchArticles, fetchScientists } from '@/lib/api';
import type { ArticleListItem, ScientistListItem } from '@/lib/types';
import { Search, Sparkles, BookOpen, Users } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function getSearchResults(query: string) {
  try {
    const [rawArticles, rawScientists] = await Promise.all([
      fetchArticles({ search: query }),
      fetchScientists({ search: query }),
    ]);

    const articles = rawArticles as ArticleListItem[];
    const scientists = rawScientists as ScientistListItem[];

    return { articles, scientists };
  } catch {
    const { DEMO_ARTICLES, DEMO_SCIENTISTS } = await import('@/lib/constants');
    const q = query.toLowerCase();
    const demoArticles = DEMO_ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q))
    );
    const demoScientists = DEMO_SCIENTISTS.filter(
      (s) => s.name.toLowerCase().includes(q) || s.field.toLowerCase().includes(q)
    );
    return {
      articles: demoArticles,
      scientists: demoScientists,
    };
  }
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
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 text-[var(--text-secondary)]">
      {/* Header Banner */}
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            Cosmic Knowledge Search
          </div>

          <h1
            className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
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
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search articles, equations, scientists, cosmic topics..."
                className="w-full rounded-2xl border border-gold-500/30 bg-[var(--bg-card)] py-3.5 pl-12 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none backdrop-blur-xl transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20"
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
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)] font-mono">
            <span>Popular:</span>
            {['James Webb', 'Quantum Physics', 'Einstein', 'Black Holes', 'CRISPR', 'Relativity'].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-lg border border-[var(--border-color)] bg-white/[0.04] px-2.5 py-1 text-[var(--text-secondary)] transition-colors hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-200"
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
            <div className="mb-8 flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
              <span>Found {totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</span>
            </div>

            {totalResults === 0 && (
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-16 text-center backdrop-blur-xl">
                <Sparkles className="mx-auto h-12 w-12 text-slate-500" />
                <h3 className="mt-4 text-xl font-bold text-[var(--text-primary)]">No cosmic matches found</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-md mx-auto">
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
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-6 text-sm font-semibold text-[var(--text-primary)] hover:bg-white/[0.08]"
                  >
                    Browse Categories
                  </Link>
                </div>
              </div>
            )}

            {/* Scientists Results */}
            {scientists.length > 0 && (
              <div className="mb-14">
                <div className="flex items-center gap-2 text-lg font-bold text-[var(--text-primary)] mb-6">
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
                <div className="flex items-center gap-2 text-lg font-bold text-[var(--text-primary)] mb-6">
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
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-16 text-center backdrop-blur-xl">
            <Search className="mx-auto h-12 w-12 text-gold-400/60" />
            <h3 className="mt-4 text-xl font-bold text-[var(--text-primary)]">Start Your Exploration</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-md mx-auto">
              Type keywords above to search through our database of articles, research topics, and pioneering scientists.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
