import Link from 'next/link';
import ArticleCard from './ArticleCard';
import FadeIn from './FadeIn';
import type { ArticleListItem } from '@/lib/types';

interface FeaturedArticlesProps {
  articles: ArticleListItem[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const rest = articles.slice(1, 4);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Featured Articles
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">Handpicked scientific content for curious minds</p>
          </div>
          <Link
            href="/articles"
            className="hidden text-sm font-medium text-[var(--accent-primary)] transition-colors hover:underline sm:block"
          >
            View all articles &rarr;
          </Link>
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <FadeIn delay={0.05}>
            <ArticleCard article={featured} featured />
          </FadeIn>

          <div className="grid gap-6">
            {rest.map((article, i) => (
              <FadeIn key={article.id} delay={0.1 + i * 0.08}>
                <ArticleCard article={article} />
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(4, 7).map((article, i) => (
            <FadeIn key={article.id} delay={i * 0.08}>
              <ArticleCard article={article} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/articles"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] px-6 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-card)]"
          >
            View all articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
