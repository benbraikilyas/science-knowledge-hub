import Link from 'next/link';
import { formatDate, formatCompactNumber } from '@/lib/utils';
import { fetchArticle, fetchRelatedArticles } from '@/lib/api';
import type { ArticleListItem } from '@/lib/types';
import ArticleReadingProgress from '@/components/ArticleReadingProgress';
import ArticleCard from '@/components/ArticleCard';
import { Clock, Eye, Share2, Bookmark, ArrowLeft, Sparkles } from 'lucide-react';

interface ArticleDetailProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  try {
    return await fetchArticle(slug);
  } catch {
    const { DEMO_ARTICLES } = await import('@/lib/constants');
    return DEMO_ARTICLES.find((a: { slug: string }) => a.slug === slug) || null;
  }
}

async function getRelatedArticles(slug: string): Promise<ArticleListItem[]> {
  try {
    const raw = await fetchRelatedArticles(slug);
    return raw as ArticleListItem[];
  } catch {
    const { DEMO_ARTICLES } = await import('@/lib/constants');
    return DEMO_ARTICLES.filter((a: { slug: string }) => a.slug !== slug).slice(0, 3);
  }
}

export async function generateMetadata({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = await getArticle(slug) as Record<string, unknown> | null;
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${(article.metaTitle as string) || article.title} | Science Knowledge Hub`,
    description: (article.metaDescription as string) || (article.excerpt as string),
    openGraph: {
      title: article.title as string,
      description: article.excerpt as string,
      type: 'article',
      publishedTime: article.publishedAt as string,
      tags: article.tags as string[],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = await getArticle(slug) as Record<string, unknown> | null;
  const related: ArticleListItem[] = await getRelatedArticles(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/80 p-12 backdrop-blur-xl">
          <Sparkles className="mx-auto h-12 w-12 text-slate-500" />
          <h1 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">Article Not Found</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">The article you&apos;re looking for does not exist in our cosmic archive.</p>
          <Link
            href="/articles"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-400"
          >
            Browse Articles
          </Link>
        </div>
      </div>
    );
  }

  const category = article.category as { slug: string; color: string; icon: string; name: string };
  const author = article.author as { displayName: string };
  const articleTags = article.tags as string[] | undefined;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 text-[var(--text-secondary)]">
      <ArticleReadingProgress />

      {/* Header Banner */}
      <div className="relative border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-14 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/15 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 transition-colors hover:text-gold-300 mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to all articles</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/categories/${category.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${category.color}20`,
                color: category.color,
                border: `1px solid ${category.color}40`,
              }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </Link>
            <span className="text-xs text-[var(--text-secondary)] font-mono">Published {formatDate(article.publishedAt as string)}</span>
          </div>

          <h1
            className="mt-5 text-3xl font-extrabold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {article.title as string}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)] font-light">
            {article.excerpt as string}
          </p>

          {/* Author & Stats Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-color)] pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-gold-500 to-navy-600 text-sm font-bold text-[var(--text-primary)] shadow-[0_0_15px_rgba(255,195,0,0.25)]">
                {author.displayName?.charAt(0) || 'A'}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{author.displayName}</p>
                <p className="text-xs text-[var(--text-secondary)]">Scientific Contributor</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold-400" />
                <span>{article.readTime as number} min read</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-gold-300" />
                <span>{formatCompactNumber(article.viewsCount as number)} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
          <div className="article-content text-[var(--text-secondary)]">
            {article.content ? (
              (article.content as string).split('\n').map((paragraph: string, i: number) =>
                paragraph.trim() ? (
                  <p key={i} className="mb-5 leading-relaxed text-[var(--text-secondary)]">
                    {paragraph}
                  </p>
                ) : null
              )
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-4 mb-4">Introduction to the Phenomenon</h2>
                <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                  From cosmic horizons to subatomic scales, the principles guiding this discovery
                  have reshaped our understanding of the universe. Decades of theoretical mathematics
                  and precision experimental tests laid the foundation for modern breakthroughs.
                </p>

                <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-4">Core Principles and Equations</h2>
                <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                  Every fundamental force in nature obeys conservation laws and symmetry transformations.
                  When experimental data from particle accelerators and deep space telescopes matched
                  the theoretical predictions, it heralded a new era of scientific discovery.
                </p>

                <blockquote className="my-8 rounded-2xl border-l-4 border-gold-500 bg-gold-500/10 p-6 text-gold-200 italic">
                  &ldquo;The most incomprehensible thing about the universe is that it is comprehensible.&rdquo;
                  <span className="block mt-2 text-xs font-mono not-italic text-gold-400">— Albert Einstein</span>
                </blockquote>

                <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-4">Future Frontiers & Technology</h2>
                <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                  As our observational instruments increase in sensitivity by orders of magnitude,
                  we stand on the cusp of solving some of the deepest mysteries in physics, biology, and computation.
                </p>
              </>
            )}
          </div>

          {/* Tags */}
          {articleTags && articleTags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--border-color)] pt-6">
              {articleTags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(tag.toLowerCase())}`}
                  className="rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-3 py-1 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-[var(--border-color)] pt-12">
            <h2
              className="text-2xl font-bold tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Related Articles
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
