'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import ScientistCard from '@/components/ScientistCard';
import type { ArticleListItem, ScientistListItem } from '@/lib/types';
import { BookOpen, Search, Sparkles, Users } from 'lucide-react';

interface SearchData {
  articles: ArticleListItem[];
  scientists: ScientistListItem[];
}

const POPULAR = ['Al-Khwarizmi', 'Algorithms', 'Einstein', 'Black Holes', 'CRISPR', 'Relativity'];

const matches = (fields: (string | undefined)[], query: string) =>
  fields.filter(Boolean).join(' ').toLowerCase().includes(query.toLowerCase());

// Reads ?q= in the browser, so the search page can be a plain static file.
export default function SearchExperience(data: SearchData) {
  const query = useSearchParams().get('q')?.trim() ?? '';
  return <SearchView {...data} query={query} />;
}

export function SearchView({ articles, scientists, query }: SearchData & { query: string }) {
  const articleResults = query
    ? articles.filter((article) => matches([article.title, article.excerpt, article.category.name, ...article.tags], query))
    : [];
  const scientistResults = query
    ? scientists.filter((scientist) => matches([scientist.name, scientist.field, scientist.nationality, scientist.group, scientist.breakthrough], query))
    : [];
  const totalResults = articleResults.length + scientistResults.length;

  return (
    <>
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-10 sm:px-6">
        <form action="/search" method="GET" className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              key={query}
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search articles, equations, scientists, cosmic topics..."
              aria-label="Search the site"
              className="w-full rounded-2xl border border-gold-500/30 bg-[var(--bg-card)] py-3.5 pl-12 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none backdrop-blur-xl transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20"
            />
          </div>
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,195,0,0.3)] transition-all hover:from-gold-400 hover:to-gold-300 active:scale-95"
          >
            Search
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
          <span>Popular:</span>
          {POPULAR.map((term) => (
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

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {query && (
          <div>
            <div className="mb-8 font-mono text-xs text-[var(--text-secondary)]">
              Found {totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </div>

            {totalResults === 0 && (
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-16 text-center backdrop-blur-xl">
                <Sparkles className="mx-auto h-12 w-12 text-slate-500" />
                <h2 className="mt-4 text-xl font-bold text-[var(--text-primary)]">No matches found</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                  Nothing matched &ldquo;{query}&rdquo;. Try another term or browse the categories.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link href="/articles" className="inline-flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-semibold text-white hover:bg-gold-400">
                    Browse Articles
                  </Link>
                  <Link href="/categories" className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-6 text-sm font-semibold text-[var(--text-primary)] hover:bg-white/[0.08]">
                    Browse Categories
                  </Link>
                </div>
              </div>
            )}

            {scientistResults.length > 0 && (
              <section className="mb-14">
                <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
                  <Users className="h-5 w-5 text-gold-400" />
                  Matching Scientists ({scientistResults.length})
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {scientistResults.map((scientist) => (
                    <ScientistCard key={scientist.id} scientist={scientist} />
                  ))}
                </div>
              </section>
            )}

            {articleResults.length > 0 && (
              <section>
                <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
                  <BookOpen className="h-5 w-5 text-gold-400" />
                  Matching Articles and Books ({articleResults.length})
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {articleResults.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </>
  );
}
