import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import type { ArticleListItem } from '@/lib/types';
import { Sparkles, BookOpen, Layers } from 'lucide-react';

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
  title: 'Articles | Science Knowledge Hub',
  description: 'Browse thousands of scientific articles on space, physics, biology, AI, technology, and more.',
};

const CATEGORIES = [
  { name: 'All Topics', slug: '' },
  { name: 'Space', slug: 'space' },
  { name: 'Quantum Physics', slug: 'quantum-physics' },
  { name: 'Biology', slug: 'biology' },
  { name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
  { name: 'Theories', slug: 'scientific-theories' },
];

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const currentCategory = params.category || '';
  const articles: ArticleListItem[] = await getArticles(params);

  return (
    <div className="min-h-screen bg-[#000814] pb-24">
      {/* Header Banner */}
      <div className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#001d3d] via-[#000d1f] to-[#000814] py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5 text-gold-400" />
            Knowledge Repository
          </div>

          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Scientific{' '}
            <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              Articles & Papers
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Explore curated analyses, historical breakthroughs, and bleeding-edge scientific discoveries.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat.slug;
              const href = cat.slug ? `/articles?category=${cat.slug}` : '/articles';
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold backdrop-blur-md transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-white shadow-[0_0_20px_rgba(255,195,0,0.35)] border border-gold-400'
                      : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:border-gold-500/40 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-gold-400" />
            <span>Showing {articles.length} articles</span>
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/[0.08] bg-[#001d3d]/60 p-16 text-center backdrop-blur-xl">
            <Sparkles className="mx-auto h-10 w-10 text-slate-500" />
            <p className="mt-4 text-lg font-semibold text-white">No articles found in this category.</p>
            <p className="mt-1 text-sm text-slate-400">Try selecting another topic or browse all articles.</p>
            <Link
              href="/articles"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gold-400"
            >
              View all articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
